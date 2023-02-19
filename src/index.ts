import { FileManangerImpl } from './libs/file-manager'
import { GenerateDefaultCommandImpl } from './commands/generate-default.command'
import { PromptController } from './controllers/prompt.controller'

const fileManager = new FileManangerImpl()
const generateCommand = new GenerateDefaultCommandImpl(fileManager)
const promptController = new PromptController(generateCommand)

promptController
  .receive()
  .then((response) => {
    return promptController.control(response)
  })
  .catch((error) => {
    console.error(error)
  })
