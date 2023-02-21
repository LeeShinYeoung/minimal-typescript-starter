export interface ReadmeProperties {
  title: string
  contents: Array<string | ReadmeSectionTitle | ReadmeCodeBlock>
}

export class Readme {
  public readonly filename = 'README.md'
  private readonly properties: ReadmeProperties = {
    title: '',
    contents: []
  }

  addTitle(title: string) {
    this.properties.title = `# ${title}`
  }

  addSectionTitle(sectionTitle: ReadmeSectionTitle) {
    this.properties?.contents?.push(`### ${sectionTitle}`)
  }

  addDescription(description?: string) {
    description && this.properties?.contents?.push(description)
  }

  addCodeBlock(codeBlock: ReadmeCodeBlock) {
    this.properties?.contents?.push(
      `\`\`\`${codeBlock.language}\n${codeBlock.content}\n\`\`\``
    )
  }

  toString() {
    return [this.properties.title, ...this.properties.contents].join('\n\n')
  }
}

export type ReadmeSectionTitle = string

export type ReadmeCodeBlock = {
  language: string
  content: string
}
