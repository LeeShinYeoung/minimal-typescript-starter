import * as fs from 'fs'
import { promisify } from 'util'

export interface FileMananger {
  checkDirectory(): void
  saveFile(filename: string, content: string): void
}

export class FileManangerImpl implements FileMananger {
  constructor(private readonly basePath: string) {}

  checkDirectory() {
    const basePath = process.env.PWD + '/' + this.basePath

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath)
    }

    if (fs.readdirSync(basePath).length) {
      throw new Error('Directory is not empty')
    }
  }

  async saveFile(path: string, content: string) {
    const basePath = process.env.PWD + '/' + this.basePath
    const directoryPath = path.replace(/^(.*\/)?[^/]*$/, '$1')

    if (!fs.existsSync(`${basePath}/${directoryPath}`)) {
      fs.mkdirSync(`${basePath}/${directoryPath}`, { recursive: true })
    }

    await promisify(fs.writeFile)(`${basePath}/${path}`, content)
  }
}
