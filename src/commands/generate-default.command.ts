import { Answers } from 'prompts'
import { FileMananger } from '../libs/file-manager'
import { EslintFactory } from './entities/eslint/eslint.factory'
import { packageFactory } from './entities/package/package.factory'
import { PrettierFactory } from './entities/prettier/prettier.factory'
import { TsconfigFactory } from './entities/tsconfig/tsconfig.factory'

export interface GenerateDefaultCommand {
  execute(response: Answers<string>): void
}

export class GenerateDefaultCommandImpl implements GenerateDefaultCommand {
  constructor(private readonly fileManager: FileMananger) {}

  async execute(response: Answers<string>) {
    const { packageName, packageDescription, packageAddition } = response

    const packageEntity = packageFactory.create({
      packageName,
      packageDescription,
      packageAddition
    })
    this.fileManager.saveFile(packageEntity.filename, packageEntity.toString())

    const tsconfigEntity = TsconfigFactory.create()
    this.fileManager.saveFile(
      tsconfigEntity.filename,
      tsconfigEntity.toString()
    )

    if (packageAddition?.includes('prettier')) {
      const prettierEntity = PrettierFactory.create()
      this.fileManager.saveFile(
        prettierEntity.filename,
        prettierEntity.toString()
      )
    }

    if (packageAddition?.includes('eslint')) {
      const eslintEntity = EslintFactory.create({ packageAddition })
      this.fileManager.saveFile(eslintEntity.filename, eslintEntity.toString())
    }
  }
}
