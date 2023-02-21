import { Readme } from './readme'

export interface ReadmeFactoryParameters {
  packageName: string
  packageDescription?: string
}

export class ReadmeFactory {
  static create({ packageName, packageDescription }: ReadmeFactoryParameters) {
    const readme = new Readme()

    readme.addTitle(packageName)
    readme.addDescription(packageDescription)

    readme.addSectionTitle('Getting Started')
    readme.addDescription('**Running the app**')
    readme.addCodeBlock({
      language: 'bash',
      content: `npm run start`
    })
    readme.addDescription('**Build the app**')
    readme.addCodeBlock({
      language: 'bash',
      content: `npm run build`
    })

    return readme
  }
}
