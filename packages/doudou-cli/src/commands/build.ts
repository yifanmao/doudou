import * as shelljs from 'shelljs'

export default function build (args: any) {
  const { type = 'weapp', watch } = args
  let command = `taro build --type ${type}${watch ? ' --watch' : ''}`
  shelljs.exec(command)
}