#!/usr/bin/env node
import { FileManangerImpl } from './libs/file-manager'
import { GenerateDefaultCommandImpl } from './commands/generate-default.command'
import { PromptController } from './controllers/prompt.controller'
import { NpmManagerImpl } from './libs/npm-manager'

const fileManager = new FileManangerImpl(process.argv[2] || '.')
const npmManager = new NpmManagerImpl(process.argv[2] || '.')
const generateDefaultCommand = new GenerateDefaultCommandImpl(
  fileManager,
  npmManager
)
const promptController = new PromptController(generateDefaultCommand)

promptController
  .receive()
  .then((response) => {
    return promptController.control(response)
  })
  .catch((error) => {
    console.error(error.message)
  })
