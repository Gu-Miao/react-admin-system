import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import chalk from 'chalk'

const srcDir = join(dirname(fileURLToPath(import.meta.url)), '../src')
const viewsDir = join(srcDir, 'views')
const componentsDir = join(srcDir, 'components')

generate(getPath())

function getPath() {
  const config = { base: viewsDir }
  process.argv.forEach(arg => {
    if (arg.includes('path=')) {
      config.path = arg.split('path=')[1]
      return
    }
    if (arg.includes('-c')) {
      config.base = componentsDir
    }
  })
  if (!config.path) {
    console.error(chalk.red('No path found, please use `npm run gen path=xx/xx`'))
    process.exit(1)
  }
  return join(config.base, config.path)
}

async function generate(path) {
  const name = getComponentName(path)
  const _path = getCapitalizePath(path)

  if (existsSync(_path)) {
    console.error(chalk.red(`Path ${path} have already existed`))
    process.exit(1)
  }

  mkdirSync(_path, { recursive: true })

  const promsies = [
    writeFile(join(_path, `${name}.tsx`), createTsx(name)),
    writeFile(join(_path, `${name}.styles.ts`), createStylesTs()),
    writeFile(join(_path, 'index.ts'), createIndex(name)),
  ]

  await Promise.all(promsies)

  console.log(chalk.green(`Successfully generates component: ${_path}`))
}

/** @param {string} name */
function createTsx(name) {
  return `function ${name}() {\n  return <div></div>\n}\nexport default ${name}\n`
}

function createStylesTs() {
  return `import { createStyles } from '@mantine/core'\nexport default createStyles(() => ({}))\n`
}

/** @param {string} name */
function createIndex(name) {
  return `import ${name} from './${name}'\nexport default ${name}\n`
}

/** @param {string} path */
function getComponentName(path) {
  return capitalize(path.split(/[/\\]/).at(-1))
}

/** @param {string} path */
function getCapitalizePath(path) {
  const slices = path.split(/[/\\]/)
  const last = capitalize(slices.at(-1))
  slices.pop()
  return [...slices, last].join('/')
}

/** @param {string} str */
function capitalize(str) {
  return str.at(0).toUpperCase() + str.substring(1)
}
