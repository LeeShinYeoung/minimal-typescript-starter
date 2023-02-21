import { Tsconfig, TsconfigProperties } from './tsconfig'

export class TsconfigFactory {
  static create() {
    const properties: TsconfigProperties = {
      compilerOptions: {
        target: 'es5',
        module: 'commonjs',
        strict: true,
        outDir: 'dist',
        sourceMap: true
      },
      include: ['src/**/*']
    }

    return new Tsconfig(properties)
  }
}
