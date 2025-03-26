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
    buf.push('import', upstreamComponentName, ', { type', upstreamComponentPropsName, '} from', JSON.stringify(moduleName), '\n')

    buf.push('\n')
    buf.push('\n')

    buf.push('export interface', componentPropsName, 'extends', upstreamComponentPropsName, '{\n', 'children?: Child\n', '}')

    buf.push('\n')
    buf.push('\n')

    buf.push('export default function', componentName, '(', 'props:', componentPropsName, ')')

    buf.push('{\n')
    buf.push('return', `<${upstreamComponentName} {...props} />`)
    buf.push('}')
    buf.push('\n')
    buf.push('\n')

    await writeFile(componentOutPath, buf.join(' '))
  }
}

export async function genInterfaces(conf: UpstreamOpts) {
  const buf: string[] = []

  for await (const { component, opts } of readComponents(conf)) {
    const componentName = getComponentName(component, conf)
    const componentPropsName = getComponentPropsName(component, conf)
    const moduleName = getComponentUpstreamSource(component, conf)

    buf.push('declare module', `"${moduleName}"`, '{')
    buf.push('\import { HtmlEscapedString } from "hono/utils/html"\n\n')

    buf.push('export interface', componentPropsName)
    buf.push(...genRecordType(opts, componentName))

    buf.push('\n')
    buf.push('\n')

    buf.push('export default function', componentName, '(', 'props:', componentPropsName, ')', ':', 'HtmlEscapedString', ';')

    buf.push('}')
    buf.push('\n')
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

    yield { component: c, opts }
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
