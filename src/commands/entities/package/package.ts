export interface PackageProperties {
  name?: string
  version?: string
  description?: string
  scripts?: { [key: string]: string }
  author?: string
  license?: string
  devDependencies?: { [key: string]: string }
  dependencies?: { [key: string]: string }
}

export class Package {
  constructor(private readonly properties: PackageProperties) {}

  toString() {
    return JSON.stringify(this.properties, null, 2)
  }
}
