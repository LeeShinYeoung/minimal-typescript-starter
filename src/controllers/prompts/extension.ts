import { PromptObject } from 'prompts'

export const ExtensionPrompt: PromptObject = {
  type: 'select',
  name: 'extension',
  message: 'Enter a file extension for your package:',
  choices: [
    { title: 'Red', value: '#ff0000' },
    { title: 'Green', value: '#00ff00' },
    { title: 'Blue', value: '#0000ff' }
  ]
}
