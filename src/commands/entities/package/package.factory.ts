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

    return new Package(properties)
  }

  private static getScripts(packageAddition?: string[]) {
    const scripts: { [key: string]: string } = {
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
}

export const PackageScripts = {
  start: 'nodemon --watch \'src/**/*.ts\' --exec "ts-node" src/index.ts',
  build: 'tsc',
  eslint: 'npx eslint src/**/*.ts',
  prettier: "prettier --config .prettierrc 'src/**/*.ts' --write"
}

export const PackageDependencies = {}
