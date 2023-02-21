import { Gitignore, GitignoreProperties } from './gitignore'

export class GitignoreFactory {
  static create() {
    const properties: GitignoreProperties = {
      paths: [`node_modules`, `dist`, `.DS_Store`]
    }

    return new Gitignore(properties)
  }
}
