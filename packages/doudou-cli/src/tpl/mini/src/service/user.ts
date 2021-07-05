import { uReq } from '@/utils'

function getUserInfo (data: any, options = {}): Promise<any> {
  return uReq({
    url: '/getUserinfo',
    data,
    ...options,
  })
}

export {
  getUserInfo,
}