import { Package, PackageProperties } from './package'

export interface packageFactoryParameters {
  packageName: string
  packageDescription?: string
  packageAddition?: string[]
}

export class packageFactory {
  static create({
    packageName,
    packageDescription,
    packageAddition
  }: packageFactoryParameters) {
    const properties: PackageProperties = {}

    properties.name = packageName
    properties.version = '1.0.0'
    properties.description = packageDescription || ''
    properties.scripts = this.getScripts(packageAddition)
    properties.devDependencies = this.getDevDependencies(packageAddition)

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

  private static getDevDependencies(packageAddition?: string[]) {
    const dependencies: PackageProperties['dependencies'] = {}

    dependencies['nodemon'] = PackageDevDependencies['nodemon']
    dependencies['ts-node'] = PackageDevDependencies['ts-node']
    dependencies['typescript'] = PackageDevDependencies['typescript']

    if (packageAddition?.includes('prettier')) {
      dependencies['prettier'] = PackageDevDependencies['prettier']
    }

    if (packageAddition?.includes('eslint')) {
      dependencies['@typescript-eslint/eslint-plugin'] =
        PackageDevDependencies['@typescript-eslint/eslint-plugin']
      dependencies['@typescript-eslint/parser'] =
        PackageDevDependencies['@typescript-eslint/parser']
      dependencies['eslint'] = PackageDevDependencies['eslint']
      dependencies['eslint-config-prettier'] =
        PackageDevDependencies['eslint-config-prettier']
      dependencies['eslint-plugin-prettier'] =
        PackageDevDependencies['eslint-plugin-prettier']
    }

    return dependencies
  }
}

export const PackageScripts = {
  start: 'nodemon --watch \'src/**/*.ts\' --exec "ts-node" src/index.ts',
  build: 'tsc',
  eslint: 'eslint src/**/*.ts',
  prettier: "prettier --config .prettierrc 'src/**/*.ts' --write"
}

export const PackageDevDependencies = {
  nodemon: '',
  'ts-node': '',
  typescript: '',
  '@typescript-eslint/eslint-plugin': '',
  '@typescript-eslint/parser': '',
  eslint: '',
  'eslint-config-prettier': '',
  'eslint-plugin-prettier': '',
  prettier: ''
}
