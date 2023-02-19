import { Package, PackageProperties } from './package'

export interface packageFactoryProperties {
  packageName: string
  packageDescription?: string
  packageAddition?: string[]
}

export class packageFactory {
  static create({
    packageName,
    packageDescription,
    packageAddition
  }: packageFactoryProperties) {
    const properties: PackageProperties = {}

    properties.name = packageName
    properties.version = '1.0.0'
    properties.description = packageDescription || ''
    properties.scripts = this.getScripts(packageAddition)
    properties.dependencies = this.getDependencies(packageAddition)

    return new Package(properties)
  }

  private static getScripts(packageAddition?: string[]) {
    const scripts: PackageProperties['scripts'] = {
      start: PackageScripts.start,
      build: PackageScripts.build
    }

    if (packageAddition?.includes('prettier')) {
      scripts.prettier = PackageScripts.prettier
    }

    if (packageAddition?.includes('eslint')) {
      scripts.eslint = PackageScripts.eslint
    }

    return scripts
  }

  private static getDependencies(packageAddition?: string[]) {
    const dependencies: PackageProperties['dependencies'] = {}

    dependencies['nodemon'] = PackageDependencies['nodemon']
    dependencies['ts-node'] = PackageDependencies['ts-node']
    dependencies['typescript'] = PackageDependencies['typescript']

    if (packageAddition?.includes('prettier')) {
      dependencies['prettier'] = PackageDependencies['prettier']
    }

    if (packageAddition?.includes('eslint')) {
      dependencies['@typescript-eslint/eslint-plugin'] =
        PackageDependencies['@typescript-eslint/eslint-plugin']
      dependencies['@typescript-eslint/parser'] =
        PackageDependencies['@typescript-eslint/parser']
      dependencies['eslint'] = PackageDependencies['eslint']
      dependencies['eslint-config-prettier'] =
        PackageDependencies['eslint-config-prettier']
      dependencies['eslint-plugin-prettier'] =
        PackageDependencies['eslint-plugin-prettier']
    }

    return dependencies
  }
}

export const PackageScripts = {
  start: 'nodemon --watch \'src/**/*.ts\' --exec "ts-node" src/index.ts',
  build: 'tsc',
  eslint: 'npx eslint src/**/*.ts',
  prettier: "prettier --config .prettierrc 'src/**/*.ts' --write"
}

export const PackageDependencies = {
  nodemon: '^2.0.20',
  'ts-node': '^10.9.1',
  typescript: '^4.8.4',
  '@typescript-eslint/eslint-plugin': '^5.40.0',
  '@typescript-eslint/parser': '^5.40.0',
  eslint: '^8.25.0',
  'eslint-config-prettier': '^8.5.0',
  'eslint-plugin-prettier': '^4.2.1',
  prettier: '^2.7.1'
}
