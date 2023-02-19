export interface EslintProperties {
  root?: boolean
  parser?: string
  plugins?: string[]
  extends?: string[]
}

export class Eslint {
  public readonly filename = '.eslintrc'

  constructor(private readonly properties: EslintProperties) {}

  toString() {
    return JSON.stringify(this.properties, null, 2)
  }
}
