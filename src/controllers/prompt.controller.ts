import { Answers, prompt } from 'prompts'
import { GenerateDefaultCommand } from '../commands/generate-default.command'
import { PackageAddition } from './prompts/package-addition'
import { PackageDescriptionPrompt } from './prompts/package-description'
import { PackageNamePrompt } from './prompts/package-name'

export class PromptController {
  constructor(
    private readonly generateDefaultCommand: GenerateDefaultCommand
  ) {}

  async receive() {
    return prompt(
      [PackageNamePrompt, PackageDescriptionPrompt, PackageAddition],
      {
        onCancel: () => {
          process.exit()
        }
      }
    )
  }

  async control(response: Answers<string>) {
    return this.generateDefaultCommand.execute(response)
  }
}
