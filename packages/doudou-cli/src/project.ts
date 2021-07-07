import * as path from 'path'
import * as memFs from 'mem-fs'
import * as editor from 'mem-fs-editor'
import * as ora from 'ora'
import * as shelljs from 'shelljs'
import chalk from 'chalk'

interface IProjectConf {
  projectName: string,
  template: 'mini' | 'pcAdmin',
  description?: string,
}

export default class Project {

  conf: IProjectConf

  fs: any

  constructor (options: IProjectConf) {
    this.conf = options
    const store = memFs.create()
    this.fs = editor.create(store)
  }

  create () {
    const from = path.resolve(__dirname, `../tpl/${this.conf.template}`)
    const to = process.cwd() + `/${this.conf.projectName}`
    let spinner = ora('正在生成项目文件...').start()
    this.fs.copyTpl(from, to, this.conf, this.conf, {globOptions: {dot: true}})
    this.fs.commit(() => {
      spinner.succeed('成功生成项目文件')
      const installSpinner = ora('正在安装依赖...').start()
      const command = 'yarn install'
      shelljs.cd(to)
      const install = shelljs.exec(command, { silent: true })
      if (install.code === 0) {
        console.log(`${install.stderr}${install.stdout}`)
        installSpinner.color = 'green'
        installSpinner.succeed('安装成功')
      } else {
        installSpinner.color = 'red'
        installSpinner.fail(chalk.red(`快应用依赖环境安装失败，请进入 ${to} 重新安装！`))
        console.log(`${install.stderr}${install.stdout}`)
      }
    })
  }
}