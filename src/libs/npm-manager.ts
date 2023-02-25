import { spawn } from 'child_process'

export interface NpmManager {
  install(packages?: string[]): void
}

export class NpmManagerImpl {
  constructor(private readonly path: string) {}

  async install(packages?: string[]) {
    const path = process.env.PWD + '/' + this.path

    await new Promise((resolve, reject) => {
      const command = spawn('npm', ['install', ...(packages || [])], {
        stdio: 'inherit',
        cwd: path
      })

      command.on('close', (code) => {
        if (code !== 0) {
          console.error(`npm install failed`)
          reject()
        } else {
          resolve(null)
        }
      })
    })
  }
}
