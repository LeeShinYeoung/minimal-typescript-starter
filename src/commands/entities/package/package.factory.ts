import { Package, PackageProperties } from './package'

export interface packageFactoryProperties {
  packageName: string
  packageDescription?: string
  extension?: string
}

export class packageFactory {
  static create({
    packageName,
    packageDescription,
    extension
  }: packageFactoryProperties) {
    const properties: PackageProperties = {}

    properties.name = packageName
    properties.version = '1.0.0'
    properties.description = packageDescription || ''
    properties.scripts = this.getScripts(extension)

    return new Package(properties)
  }

  private static getScripts(extension?: string) {
    const scripts: { [key: string]: string } = {
      start: PackageScripts.start,
      build: PackageScripts.build
    }

    if (extension === 'prettier-eslint') {
      scripts.lint = PackageScripts.lint
      scripts.prettier = PackageScripts.prettier
    }

    return scripts
  }
}

export const PackageScripts = {
  start: 'nodemon --watch \'src/**/*.ts\' --exec "ts-node" src/index.ts',
  build: 'tsc',
  lint: 'npx eslint src/**/*.ts',
  prettier: "prettier --config .prettierrc 'src/**/*.ts' --write"
}

export const PackageDependencies = {}
