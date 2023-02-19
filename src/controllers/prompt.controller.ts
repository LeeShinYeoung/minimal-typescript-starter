import { Answers, prompt } from 'prompts'
import { GenerateDefaultCommand } from '../commands/generate-default.command'
import { PackageAddition } from './prompts/package-addition'
import { PackageDescriptionPrompt } from './prompts/package-description'
import { PackageNamePrompt } from './prompts/package-name'

export class PromptController {
  constructor(private readonly generateCommand: GenerateDefaultCommand) {}

  async receive() {
    return prompt([
      PackageNamePrompt,
      PackageDescriptionPrompt,
      PackageAddition
    ])
  }

  async control(response: Answers<string>) {
    return this.generateCommand.execute(response)
  }
}
