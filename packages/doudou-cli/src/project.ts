import * as path from 'path'
import * as memFs from 'mem-fs'
import * as editor from 'mem-fs-editor'
import * as ora from 'ora'

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
    })
  }
}