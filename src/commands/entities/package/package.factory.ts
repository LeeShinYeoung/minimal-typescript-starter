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

    properties.scripts = {
      start: 'nodemon --watch \'src/**/*.ts\' --exec "ts-node" src/index.ts',
      build: 'tsc'
    }

    return new Package(properties)
  }

  // private static getExtension(extension: string) {
}
