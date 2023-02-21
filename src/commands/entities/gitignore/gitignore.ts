export interface GitignoreProperties {
  paths: string[]
}

export class Gitignore {
  public readonly filename = '.gitignore'

  constructor(private readonly properties?: GitignoreProperties) {}

  toString() {
    return (this.properties && this.properties.paths.join('\n')) || ''
  }
}
