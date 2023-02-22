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
  public readonly filename = 'package.json'

  constructor(private readonly properties: PackageProperties) {}

  get dependencyList(): string[] {
    return Object.keys(this.properties.dependencies || {})
  }

  get devDependencyList(): string[] {
    return Object.keys(this.properties.devDependencies || {})
  }

  toString(): string {
    return JSON.stringify(this.properties, null, 2)
  }
}
