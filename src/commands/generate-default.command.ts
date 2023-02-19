import { Answers } from 'prompts'
import { FileMananger } from '../libs/file-manager'
import { packageFactory } from './entities/package/package.factory'
import { PrettierFactory } from './entities/prettier/prettier.factory'

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

    if (packageAddition.includes('prettier')) {
      const prettierEntity = PrettierFactory.create()
      this.fileManager.saveFile(
        prettierEntity.filename,
        prettierEntity.toString()
      )
    }
  }
}
