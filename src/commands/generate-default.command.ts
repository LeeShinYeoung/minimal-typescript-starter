import { Answers } from 'prompts'
import { FileMananger } from '../libs/file-manager'
import { packageFactory } from './entities/package/package.factory'

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
    this.fileManager.saveFile('package.json', packageEntity.toString())
  }
}
