import * as shelljs from 'shelljs'

export default function build (args: any) {
  const { type = 'weapp', watch, env = 'development' } = args
  let command = `NODE_ENV=${env} taro build --type ${type}${watch ? ' --watch' : ''}`
  shelljs.exec(command)
}