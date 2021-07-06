
function hackTaroParams (params: Record<string, any> = {}): Record<string, any> {
  if (process.env.TARO_ENV === 'alipay') {
    return params
  }
  const newParams: any = {}
  for (const key in params) {
    const kkey: any = decodeURIComponent(key)
    const vvalue: any = decodeURIComponent(params[key])
    if (toString.call(vvalue) === '[object String]' && (/^{(.*?)}$/.test(vvalue) || /^\[(.*?)\]$/.test(vvalue))) {
      newParams[kkey] = JSON.parse(vvalue)
    } else {
      newParams[kkey] = vvalue
    }
  }

  return newParams

}

/**
 * @description 传入search返回对象，解析query成对象
 * @param {string} str
 * @param {boolean} [decode=true]
 * @returns {Record<string, any>}
 */
function parse (str: string): Record<string, any> {
  if (!str) {
    return {}
  }

  if (str[0] === '?') {
    // eslint-disable-next-line no-param-reassign
    str = str.substr(1)
  }
  const params: Record<string, any> = {}
  const newStr: string[] = str.split('&')

  for (let i = 0; i < newStr.length; i++) {
    const [key, value]: string[] = newStr[i].split('=')
    const kkey: any = decodeURIComponent(key)
    const vvalue: any = decodeURIComponent(value)
    if (toString.call(vvalue) === '[object String]' && (/^{(.*?)}$/.test(vvalue) || /^\[(.*?)\]$/.test(vvalue))) {
      params[kkey] = JSON.parse(vvalue)
    } else {
      params[kkey] = vvalue
    }
  }

  return params
}

/**
 * @description 传入一个对象返回&拼接的字符串，对象解析成字符串以&拼接
 * @param {Record<string, any>} obj
 * @returns {string}
 */
function stringify (obj: Record<string, any> = {}): string {
  const str: string[] = []

  for (const key in obj) {
    let value = ''
    if (typeof obj[key] === 'object') {
      value = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(obj[key]))}`
    } else if (typeof obj[key] === 'undefined') {
      value = `${encodeURIComponent(key)}=undefined`
    } else {
      value = `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
    }
    str.push(value)
  }

  return str.join('&')
}

/**
 * @description 传入整个路径以解析
 * @param {string} href eg. https://m.dian.so/test?param=a || pages/test?params=a
 * @returns {{ path: string; params: Record<string, any> }}
 */
function parseHrefOrSearch (href: string): { path: string; params: Record<string, any> } {
  const [path = '', value = '']: string[] = href.split('?')

  return {
    path,
    params: value ? parse(value) : {},
  }
}

function parseQuery (query: string): any {
  const params: any = {}
  const arr: any = query.split('&')
  for (let i = 0; i < arr.length; i++) {
    const item: any = arr[i].split('=')
    params[item[0]] = decodeURIComponent(item[1])
  }

  return params
}

export default {
  hackTaroParams,
  parse,
  stringify,
  parseHrefOrSearch,
  parseQuery,
}
