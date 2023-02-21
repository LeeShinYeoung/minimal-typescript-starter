export interface TsconfigProperties {
  compilerOptions: {
    target:
      | 'es5'
      | 'es6'
      | 'es2015'
      | 'es2016'
      | 'es2017'
      | 'es2018'
      | 'es2019'
      | 'es2020'
      | 'es2021'
      | 'esnext'
    module:
      | 'commonjs'
      | 'amd'
      | 'system'
      | 'umd'
      | 'es6'
      | 'es2015'
      | 'es2020'
      | 'esnext'
    strict: boolean
    outDir: string
    sourceMap: boolean
  }
  include: string[]
}

export class Tsconfig {
  public readonly filename = 'tsconfig.json'

  constructor(private readonly properties: TsconfigProperties) {}

  toString() {
    return JSON.stringify(this.properties, null, 2)
  }
}
