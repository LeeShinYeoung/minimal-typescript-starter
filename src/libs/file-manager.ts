import * as fs from 'fs'
import { promisify } from 'util'

export interface FileMananger {
  checkDirectory(): void
  saveFile(filename: string, content: string): void
}

export class FileManangerImpl implements FileMananger {
  constructor(private readonly basePath: string) {}

  checkDirectory() {
    const path = process.env.PWD + '/' + this.basePath

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    if (fs.readdirSync(path).length) {
      throw new Error('Directory is not empty')
    }
  }

  async saveFile(path: string, content: string) {
    const directoryPath = path.replace(/^(.*\/)?[^/]*$/, '$1')

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(`${this.basePath}/${directoryPath}`, { recursive: true })
    }

    await promisify(fs.writeFile)(`${this.basePath}/${path}`, content)
  }
}
