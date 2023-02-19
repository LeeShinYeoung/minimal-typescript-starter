export interface PrettierProperties {
  semi?: boolean
  trailingComma?: 'none' | 'es5' | 'all'
  singleQuote: boolean
  printWidth: number
}

export class Prettier {
  public readonly filename = '.prettierrc'

  constructor(private readonly properties: PrettierProperties) {}

  toString() {
    return JSON.stringify(this.properties, null, 2)
  }
}
