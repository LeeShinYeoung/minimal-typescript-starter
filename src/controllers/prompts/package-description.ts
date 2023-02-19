import { PromptObject } from 'prompts'

export const PackageDescriptionPrompt: PromptObject = {
  type: 'text',
  name: 'packageDescription',
  message: 'Enter a description for your package (optional):'
}
