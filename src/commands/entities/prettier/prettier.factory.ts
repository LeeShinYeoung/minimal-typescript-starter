import { Prettier, PrettierProperties } from './prettier'

export class PrettierFactory {
  static create() {
    const properties: PrettierProperties = {
      semi: false,
      trailingComma: 'none',
      singleQuote: true,
      printWidth: 80
    }

    return new Prettier(properties)
  }
}
