import { Answers } from 'prompts'
import { FileMananger } from '../libs/file-manager'
import { NpmManager } from '../libs/npm-manager'
import { EslintFactory } from './entities/eslint/eslint.factory'
import { GitignoreFactory } from './entities/gitignore/gitignore.factory'
import { IndexFactory } from './entities/index/index.factory'
import { packageFactory } from './entities/package/package.factory'
import { PrettierFactory } from './entities/prettier/prettier.factory'
import { ReadmeFactory } from './entities/readme/readme.factory'
import { TsconfigFactory } from './entities/tsconfig/tsconfig.factory'

export interface GenerateDefaultCommand {
  execute(response: Answers<string>): void
}

export class GenerateDefaultCommandImpl implements GenerateDefaultCommand {
  constructor(
    private readonly fileManager: FileMananger,
    private readonly npmManager: NpmManager
  ) {}

  async execute(response: Answers<string>) {
    const { packageName, packageDescription, packageAddition } = response

    this.fileManager.checkDirectory()

    const packageEntity = packageFactory.create({
      packageName,
      packageDescription,
      packageAddition
    })
    await this.fileManager.saveFile(
      packageEntity.filename,
      packageEntity.toString()
    )

    const indexEntity = IndexFactory.create()
    await this.fileManager.saveFile(
      indexEntity.path + '/' + indexEntity.filename,
      indexEntity.toString()
    )

    const tsconfigEntity = TsconfigFactory.create()
    this.fileManager.saveFile(
      tsconfigEntity.filename,
      tsconfigEntity.toString()
    )

    const readmeEntity = ReadmeFactory.create({
      packageName,
      packageDescription
    })
    await this.fileManager.saveFile(
      readmeEntity.filename,
      readmeEntity.toString()
    )

    const gitignore = GitignoreFactory.create()
    await this.fileManager.saveFile(gitignore.filename, gitignore.toString())

    if (packageAddition?.includes('prettier')) {
      const prettierEntity = PrettierFactory.create()
      await this.fileManager.saveFile(
        prettierEntity.filename,
        prettierEntity.toString()
      )
    }

    if (packageAddition?.includes('eslint')) {
      const eslintEntity = EslintFactory.create({ packageAddition })
      await this.fileManager.saveFile(
        eslintEntity.filename,
        eslintEntity.toString()
      )
    }

    await this.npmManager.install([...packageEntity.devDependencyList])
  }
}
