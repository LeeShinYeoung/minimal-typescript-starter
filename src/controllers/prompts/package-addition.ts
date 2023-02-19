import { PromptObject } from 'prompts'

export const PackageAddition: PromptObject = {
  type: 'multiselect',
  name: 'packageAddition',
  message:
    'If you have additional packages to configure, please select them below.',
  choices: [
    { title: 'prettier', value: 'prettier' },
    { title: 'eslint', value: 'eslint' }
  ]
}
