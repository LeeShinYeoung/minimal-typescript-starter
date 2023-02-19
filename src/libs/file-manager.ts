import * as fs from 'fs'
import { promisify } from 'util'

export interface FileMananger {
  saveFile(filename: string, content: string): void
}

export class FileManangerImpl implements FileMananger {
  async saveFile(filename: string, content: string) {
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp')
    }

    await promisify(fs.writeFile)(`temp/${filename}`, content)
  }
}
