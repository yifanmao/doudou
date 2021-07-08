import Taro from '@tarojs/taro'
import { DOMAIN, CODE } from '@/constants'
import { uCache } from '@/utils'

function getReqData (options: any): Record<string, any> {
  const data: any = options.data

  return options.method === 'GET' ? data : JSON.stringify(data)
}

function getReqUrl (options: any): string {
  const url: string = options.url
  const env = process.env.NODE_ENV || 'dev'
  const domain: string = DOMAIN[env].MAIN

  if (/^http/.test(url)) {
    return url
  }

  return domain + url
}

function getReqHeader (): Record<string, any> {
  const header: Record<string, any> = {
    'Content-Type': 'application/json',
    'user-token': uCache.getCache('token') || '',
    Accept: '*/*',
  }

  return header
}

function doLogin () {
  const pages = Taro.getCurrentPages()
  const currentPath = pages[pages.length - 1].route
  Taro.redirectTo({
    url: `/pages/login?redirectUrl=${encodeURIComponent(currentPath)}`
  })
}

function requestErr (response: any) {
  const code: any = response.code
  if (code === CODE.INVALID_USER_TOKEN) {
    const checkedLogin = uCache.getCache('checkedLogin')
    if (!checkedLogin) {
      doLogin()
    }
    // 中断请求
    return new Promise(() => {
    }).catch(() => {
    })
  }

  throw response
}

function requestSuccess (response: any, options: any): Record<string, any> {
  if (!response) {
    return requestErr({ code: -1, msg: '服务不可用' })
  }

  if (!response.success) {
    return requestErr(response)
  }

  if (options.proxy) {
    return response.data
  }

  return {
    success: true,
    status: response.status,
    data: response.data,
  }
}

function errorHandler (err: Record<string, any>, options: any): any {
  // 当请求status不为200时，出错信息的数据会存在两个地方，一个是data里，一个是data同级的字段里
  if (err.data && err.data.errorMessage) {
    // eslint-disable-next-line no-param-reassign
    err = err.data
  }
  const error: Record<string, any> = { success: false }
  if (err.errorMessage && err.errorMessage === 'JSON parse data error') {
    err.errorMessage = '服务无法访问'
  }

  if (err.errMsg && err.errMsg.indexOf('request:fail') > -1) {
    err.errorMessage = '网络不可用'
  }
  error.msg = err.msg || err.errorMessage || err.errMsg || '服务不可用'
  error.code = err.code || err.status || err.error || -1
  if (options.pageError) {
    error.pageError = true
    throw error
  } else if (options.proxy) {
    Taro.showToast({
      title: error.msg,
      icon: 'none',
    })
    throw error
  } else {
    return {
      success: false,
      code: error.code,
      msg: error.msg,
    }
  }
}

/**
 * options 参数说明
 * proxy: 错误信息是否自动以toast处理。默认为true
 */
export default async function (options: Record<string, any> = {}): Promise<Record<string, any>> {
  options.method = options.method ? options.method : 'GET'
  options.proxy = options.proxy !== false
  const requestData: any = options.method === 'GET'
    ? {
      params: getReqData(options),
    }
    : {
      data: getReqData(options),
    }

  try {
    let response: Record<string, any> = {}
    if (options.url) {
      response = await Taro.request({
        url: getReqUrl(options),
        header: getReqHeader(),
        method: options.method,
        ...requestData,
      })
    }

    return requestSuccess(response.data, options)
  } catch (err) {
    return errorHandler(err, options)
  }
}
