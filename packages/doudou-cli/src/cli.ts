import * as minimist from 'minimist'

import build from './commands/build'
import init from './commands/init'
import { getPkgVersion } from './util'

export default class CLI {
  appPath: string
  constructor (appPath) {
    this.appPath = appPath || process.cwd()
  }

  run () {
    this.parseArgs()
  }

  parseArgs () {
    const args = minimist(process.argv.slice(2), {
      alias: {
        version: ['v'],
        help: ['h']
      },
      boolean: ['version', 'help']
    })
    const _ = args._
    const command = _[0]
    if (command) {
      switch (command) {
        case 'build': {
          build(args)
          break
        }
        case 'init': {
          init()
          break
        }
        default:
          break
      }
    } else {
      if (args.h) {
        console.log('Usage: doudou <command> [options]')
        console.log()
        console.log('Options:')
        console.log('  -v, --version       output the version number')
        console.log('  -h, --help          output usage information')
        console.log()
        console.log('Command:')
        console.log('  init [projectName]  初始化项目,如: doudou init myApp')
        console.log('  build               构建项目')
        console.log('  help [cmd]          展示帮助文档 [cmd]')
      } else if (args.v) {
        console.log(getPkgVersion())
      }
    }
  }
}