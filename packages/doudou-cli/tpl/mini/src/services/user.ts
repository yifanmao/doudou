import { uReq } from '@/utils'

function getUserInfo (data: any, options:IRequestOption = {}): Promise<any> {
  return uReq({
    url: '/getUserinfo',
    data,
    ...options,
  })
}

export {
  getUserInfo,
}