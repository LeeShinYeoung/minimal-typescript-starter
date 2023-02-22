import * as fs from 'fs'
import { promisify } from 'util'

export interface FileMananger {
  checkDirectory(): void
  saveFile(filename: string, content: string): void
}

export class FileManangerImpl implements FileMananger {
  constructor(private readonly path: string) {}

  checkDirectory() {
    const path = process.env.PWD + '/' + this.path

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    if (fs.readdirSync(path).length) {
      throw new Error('Directory is not empty')
    }
  }

  async saveFile(filename: string, content: string) {
    await promisify(fs.writeFile)(`${this.path}/${filename}`, content)
  }
}
