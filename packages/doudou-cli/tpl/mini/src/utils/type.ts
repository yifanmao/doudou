/**
 * @description 判断是否是string类型
 * @param {any} str
 * @returns {boolean}
 */
function isString (str: any): boolean {
  return toString.call(str) === '[object String]'
}

/**
 * @description 判断是否是数组
 * @param {any} arr
 * @returns {boolean}
 */
function isArray (arr: any): boolean {
  return toString.call(arr) === '[object Array]'
}

/**
 * @description 判断是否是boolean类型
 * @param {any} bool
 * @returns {boolean}
 */
function isBoolean (bool: any): boolean {
  return toString.call(bool) === '[object Boolean]'
}

/**
 * @description 判断是否是undefined
 * @param {any} bool
 * @returns {boolean}
 */
function isUndefined (bool: any): boolean {
  return toString.call(bool) === '[object Undefined]'
}

/**
 * @description 判断是否是null类型
 * @param {AnyAaaaRecord} bool
 * @returns {boolean}
 */
function isNull (bool: any): boolean {
  return toString.call(bool) === '[object Null]'
}

/**
 * @description 判断是否是数字类型
 * @param {any} num
 * @returns {boolean}
 */
function isNumber (num: any): boolean {
  return toString.call(num) === '[object Number]'
}

/**
 * @description 判断是否是对象
 * @param {any} obj
 * @returns {boolean}
 */
function isObject (obj: any): boolean {
  return toString.call(obj) === '[object Object]'
}

/**
 * @description 判断是否是空对象
 * @param {any} obj
 * @returns {boolean}
 */
function isEmptyObject (obj: any): boolean {
  if (!isObject(obj)) {
    return false
  }

  for (const prop in obj) {
    if (!isUndefined(obj[prop])) {
      return false
    }
  }

  return true
}

/**
 * @description 判断是否是方法
 * @param {any} arg
 * @returns {boolean}
 */
function isFunction (arg: any): boolean {
  return toString.call(arg) === '[object Function]'
}

/**
 * @description 判断是否是symbol
 * @param {any} sym
 * @returns {boolean}
 */
function isSymbol (sym: any): boolean {
  return toString.call(sym) === '[object Symbol]'
}

/**
 * @description 校验手机号
 * @param {string} phone
 * @returns {boolean}
 */
function isPhoneNumber (phone: string): boolean {
  return /^1[3456789]\d{9}$/.test(phone)
}

export default {
  isString,
  isArray,
  isBoolean,
  isUndefined,
  isNull,
  isNumber,
  isObject,
  isEmptyObject,
  isFunction,
  isSymbol,
  isPhoneNumber,
}
