import { Eslint, EslintProperties } from './eslint'

export interface EslintFactoryParameters {
  packageAddition?: string[]
}

export class EslintFactory {
  static create({ packageAddition }: EslintFactoryParameters) {
    const properties: EslintProperties = {}

    properties.root = true
    properties.parser = '@typescript-eslint/parser'
    properties.plugins = this.getPlugins(packageAddition)
    properties.extends = this.getExtends(packageAddition)

    return new Eslint(properties)
  }

  private static getPlugins(
    packageAddition: EslintFactoryParameters['packageAddition']
  ) {
    const plugins: EslintProperties['plugins'] = ['@typescript-eslint']

    if (packageAddition?.includes('prettier')) plugins.push('prettier')

    return plugins
  }

  private static getExtends(
    packageAddition: EslintFactoryParameters['packageAddition']
  ) {
    const extend: EslintProperties['extends'] = [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ]

    if (packageAddition?.includes('prettier')) extend.push('prettier')

    return extend
  }
}
