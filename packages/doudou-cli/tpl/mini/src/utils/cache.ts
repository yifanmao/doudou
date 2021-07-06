import Taro from '@tarojs/taro'

const cache: {[key: string]: any} = {
  isLogin: false,
  launchOptions: {},
  noSuchKey: {},
}

/**
* @description 获取缓存信息
* @export
* @param {string} key
* @returns {*}
*/
function getCache (key: string, checkLocalStorage?: boolean): any {
  let value: any = cache[key]

  if ((toString.call(value) === '[object Undefined]' || toString.call(value) === '[object Null]') && !cache.noSuchKey[key] && checkLocalStorage) {
    try {
      value = Taro.getStorageSync && Taro.getStorageSync(key)
      if (value !== '') {
        cache[key] = value
      } else {
        cache.noSuchKey[key] = true
      }
    } catch (error) {
      console.log('getStorageSync:error', error)
    }
  }

  return value
}

/**
* @description 存储缓存信息
* @export
* @param {string} key
* @param {*} value
* @param {boolean} storage
*/
function setCache (key: string, vvalue: any, storage?: boolean): void {
  try {
    if ((toString.call(vvalue) !== '[object Undefined]' && toString.call(vvalue) !== '[object Null]')) {
      cache[key] = vvalue
      if (storage) {
        Taro.setStorageSync && Taro.setStorageSync(key, vvalue)
      }
    }
  } catch (error) {
    console.log('setStorageSync:error', error)
  }
}

/**
* @description 清楚缓存信息
* @export
* @param {string} key
* @returns {*}
*/
export function clearCache (key: string): any {
  delete cache[key]
  try {
    Taro.removeStorageSync && Taro.removeStorageSync(key)
  } catch (error) {
    console.log('getStorageSync:error', error)
  }
}

export default {
  getCache,
  setCache,
  clearCache,
}
