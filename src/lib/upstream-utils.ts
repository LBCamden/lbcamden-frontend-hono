import { readdir, readFile, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import { camelCase, keyBy } from 'lodash-es'
import { existsSync } from 'fs'

interface UpstreamOpts {
  dir: string
  outPath: string
  componentNamespace?: string
  importSourcePrefix: string
  only?: string[]
  exclude?: string[]
}

interface MacroOpt {
  name: string
  type?: string
  required?: string
  description?: string
  params?: MacroOpt[]
}

const EXCLUDED_TYPES = ["nunjucks-block"]

export async function scaffoldStories(conf: UpstreamOpts) {
  for await (const { fixtures, component } of readComponents(conf)) {
    const buf: string[] = []

    const componentName = getComponentName(component, { ...conf, componentNamespace: '' })

    const storiesOutPath = join(conf.outPath, componentName + '.stories.tsx')
    if (existsSync(storiesOutPath)) continue

    const componentImport = `./${componentName}`

    buf.push(
      `import { Meta, StoryObj } from "@storybook/html";\n`,
      `import { ${componentName} } from ${JSON.stringify(componentImport)};\n`,
      `import { renderHtmlStory } from "../lib/story-utils";\n\n`,

      `type Story = StoryObj<typeof ${componentName}>;\n\n`,

      `export default {\n`,
      `  component: renderHtmlStory(${componentName}),\n`,
      `} satisfies Meta<typeof ${componentName}>;\n\n`
    )

    for (const { name, options } of fixtures) {
      const storyName = getComponentName(name, { componentNamespace: '' })
      const args = toProps(options)

      buf.push(`export const ${storyName}: Story = ${toJsxObject(JSON.stringify({ args }))};\n\n`)
    }

    await writeFile(storiesOutPath, buf.join(' '))
  }

  function toProps(object: any): any {
    const res: any = {}

    if (Array.isArray(object)) {
      return object.map(toProps)
    }

    if (typeof object !== 'object' || !object) {
      return object
    }

    for (const [k, v] of Object.entries(object)) {
      if (v && typeof v === 'object' && Object.keys(v).length === 1) {
        const [[innerK, innerV]] = Object.entries(v)

        if (innerK === 'text' || innerK === 'html') {
          res[k] = innerV
          continue
        }
      }

      if (k === 'text' || k === 'html') {
        res.children = v
        continue
      }

      if (k.endsWith('Text')) {
        res[k.replace(/Text$/, '')] = v
        continue
      }

      if (k.endsWith('Html')) {
        res[k.replace(/Html$/, '')] = v
        continue
      }

      res[k] = toProps(v)
    }

    return res
  }

  function toJsxObject(str: string) {
    let i = 0
    const current = () => str[i]
    const next = () => str[i + 1]
    const prev = () => str[i - 1]

    let state: 'html' | 'init' = 'init'
    const res: string[] = []

    while (i < str.length) {
      switch (state) {
        case "init": {
          if (current() === `"` && next() === '<') {
            state = 'html'
            break
          }

          res.push(current())
          break
        }
        case "html": {
          if (current() == `"` && prev() != "\\") {
            state = "init"
            break
          }

          if (current() == "\\" && next() == `"`) {
            res.push('"')
            i += 1
            break
          }

          if (current() == "\\" && next() == `n`) {
            res.push('\n')
            i += 1
            break
          }

          res.push(current())
          break
        }
      }

      ++i
    }

    return res.join('')
  }
}

export async function scaffoldComponents(conf: UpstreamOpts) {
  for await (const { component } of readComponents(conf)) {
    const buf: string[] = []

    const componentName = getComponentName(component, { ...conf, componentNamespace: '' })
    const upstreamComponentName = getComponentName(component, conf)
    const componentPropsName = getComponentPropsName(component, { ...conf, componentNamespace: '' })
    const upstreamComponentPropsName = getComponentPropsName(component, conf)
    const moduleName = getComponentUpstreamSource(component, conf)

    const componentOutPath = join(conf.outPath, componentName + '.tsx')
    if (existsSync(componentOutPath)) continue

    buf.push('import { Child } from "hono/jsx";\n')
    buf.push('import { ', upstreamComponentName, ', type', upstreamComponentPropsName, '} from "../upstream"\n')

    buf.push('\n')
    buf.push('\n')

    buf.push('export interface', componentPropsName, 'extends', upstreamComponentPropsName, '{\n', 'children?: Child\n', '}')

    buf.push('\n')
    buf.push('\n')

    buf.push('export function', componentName, '(', 'props:', componentPropsName, ')')

    buf.push('{\n')
    buf.push('return', `<${upstreamComponentName} {...props} />`)
    buf.push('}')
    buf.push('\n')
    buf.push('\n')

    await writeFile(componentOutPath, buf.join(' '))
  }

  await scaffoldStories(conf)
}

export async function genInterfaces(conf: UpstreamOpts) {
  const buf: string[] = []

  buf.push('import { FC } from "hono/jsx"\n')
  buf.push('\n')

  for await (const { component, opts } of readComponents(conf)) {
    const componentName = getComponentName(component, conf)
    const componentTemplateName = getComponentName(component, conf) + 'Template'
    const componentPropsName = getComponentPropsName(component, conf)
    const moduleName = getComponentUpstreamSource(component, conf)

    buf.push('import', componentTemplateName, 'from', `"${moduleName}"\n`)
    buf.push('\n')

    buf.push('export interface', componentPropsName)
    buf.push(...genRecordType(opts, componentName))

    buf.push('\n')
    buf.push('\n')

    buf.push('export const', componentName, '=', componentTemplateName, 'as', 'FC<', componentPropsName, '>\n')
    buf.push('\n')
  }

  await writeFile(conf.outPath, buf.join(' '))
}

export async function* readComponents({ dir, only, exclude }: Pick<UpstreamOpts, 'dir' | "only" | 'exclude'>) {
  const contents = await readdir(dir)
  const res: Array<{ component: string, opts: MacroOpt }> = []

  for (const c of contents) {
    const componentPath = join(dir, c)
    const stats = await stat(componentPath)
    if (!stats.isDirectory()) continue
    if (only && !only.includes(c)) continue
    if (exclude && exclude.includes(c)) continue

    const opts = await readFile(join(componentPath, 'macro-options.json'), 'utf-8')
      .then(JSON.parse)

    const { fixtures } = await readFile(join(componentPath, 'fixtures.json'), 'utf-8')
      .then(JSON.parse)

    yield { component: c, opts, fixtures }
  }

  return res
}

export function getComponentName(component: string, { componentNamespace }: Pick<UpstreamOpts, 'componentNamespace'>) {
  let componentName = camelCase(component)
  return componentNamespace + componentName[0].toUpperCase() + componentName.substring(1)
}

export function getComponentPropsName(component: string, opts: Pick<UpstreamOpts, 'componentNamespace'>) {
  return getComponentName(component, opts) + 'Props'
}

export function getComponentUpstreamSource(component: string, { importSourcePrefix }: Pick<UpstreamOpts, 'importSourcePrefix'>) {
  return `${importSourcePrefix}/${component}/template.njk`
}

function genRecordType(opts: MacroOpt[], inComponent: string): string[] {
  opts = Object.values(keyBy(opts, 'name'))
    .filter(x => x.type && !EXCLUDED_TYPES.includes(x.type))

  const params = opts.flatMap(param => [...genOpt(param, inComponent), '\n'])
  return ['{', ...params, '}']
}

function genOpt(opt: MacroOpt, inComponent: string): string[] {
  const out: string[] = []
  if (opt.description) {
    out.push('\n', `/** ${opt.description} **/\n`)
  }

  out.push(opt.name)
  if (!opt.required) {
    out.push('?')
  }

  out.push(':')
  out.push(...genOptType(opt, inComponent))
  return out
}

function genOptType(opt: MacroOpt, inComponent: string): string[] {
  switch (opt.type) {
    case undefined: return ['undefined']
    case "string": return ["string"]
    case "int":
    case "integer":
      return ["number"]
    case "boolean": return ["boolean"]
    case "object": {
      if (opt.params) {
        return genRecordType(opt.params, inComponent)
      } else {
        return ['Record<string, unknown>']
      }
    }
    case "list":
    case "array": {
      if (opt.params) {
        return ['Array<', ...genRecordType(opt.params, inComponent), '>']
      } else {
        return ['unknown[]']
      }
    }
    default: throw Error(`Unknown macro type: ${opt.type} in component ${inComponent}`)
  }
}
