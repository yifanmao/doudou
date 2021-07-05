import * as inquirer from 'inquirer'
import * as fs from 'fs-extra'

async function fetchTemplate (answers: Record<string, any>) {
  const { projectName, description, tplType } = answers
  console.log(projectName, description, tplType)
}

async function init () {
  const prompts: any[] = []
  prompts.push({
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称！',
    validate (input: string) {
      if (!input) {
        return '项目名不能为空！'
      }
      if (fs.existsSync(input)) {
        return '当前目录已经存在同名项目，请换一个项目名！'
      }
      return true
    }
  })

  prompts.push({
    type: 'input',
    name: 'description',
    message: '请输入项目介绍！'
  })

  prompts.push({
    name: 'tplType',
    type: 'list',
    message: '请选择项目模版',
    choices: [
      {
        name: '小程序',
        value: 'mini'
      },
      {
        name: 'pc后台',
        value: 'pcAdmin'
      }
    ],
  })

  const answers = await inquirer.prompt(prompts)

  await fetchTemplate(answers)
}

export default init