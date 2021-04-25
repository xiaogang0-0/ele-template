/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// /**
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 验证手机号码
 * @param {string} val
 * @returns {Boolean}
 */
export function Phone(val) {
  // 手机号正则
  const reg = /^1[3456789]\d{9}$/
  return reg.test(val)
}

/**
 * 正整数
 * @param {string} val
 * @returns {number}
 */
export function isNum(val) {
  // 先把非数字的都替换掉，除了数字和"."
  val = val.replace(/[^\d]/g, "")
  val = val.replace(/^(\d)\$/)
  // 不能转化数字的都为空
  // val = isNaN(val) ? '' : val != '' ? val * 1 : val
  val = isNaN(val) ? '' : val
  return val
}

/**
 * 验证保留四位小数
 * @param {string} val
 * @returns {number}
 */
export function Price(val) {
  // 先把非数字的都替换掉，除了数字和"."
  val = val.replace(/[^\d.]/g, "");
  // 保证只有出现一个"."而没有多个"."
  val = val.replace(/\.{2,}/g, ".");
  // 必须保证第一个为数字而不是"."
  val = val.replace(/^\./g, "");
  // 保证"."只出现一次
  val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 只能输入4个小数
  val = val.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3');
  // 不能转化数字的都为空
  val = isNaN(val) ? '' : val
  return val
}

/**
 * 验证返点: 小数点前三位，小数点后两位
 * @param {string} val
 * @returns {number}
 */
export function Rebate(val) {
  // 先把非数字的都替换掉，除了数字和"."
  val = val.replace(/[^\d.]/g, "");
  val = val >1000 ? val.substring(0,3) : val
  // 保证只有出现一个"."而没有多个"."
  val = val.replace(/\.{2,}/g, ".");
  // 必须保证第一个为数字而不是"."
  val = val.replace(/^\./g, "");
  // 保证"."只出现一次
  val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 只能输入2个小数
  val = val.replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3');
  // 不能转化数字的都为空
  val = isNaN(val) ? '' : val
  return val
}

/**
 * 数字 四舍五入 保留两位小数 并补零
 * @param {string} val
 * @returns {number}
 */
export function returnFloat(val) {
  var val = Math.round(parseFloat(val)*100)/100;
  var xsd = val.toString().split(".");
  if (xsd.length == 1) {
    val = val.toString() + ".00";
    return val;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      val = val.toString() + "0";
    }
    return val;
  }
}

export function inputChange(item, tag, lengths) {
  // 可输入负数验证
  // 只能输入数字、小数点
  // item[tag] = item[tag].replace(/[^\d.]/g, "");
  // 只能输入数字、小数点、负号
  item[tag] = item[tag].replace(/[^\d\.-]/g, "");
  // 只能有一个小数点
  item[tag] = item[tag]
    .replace(/\.{2,}/g, ".")
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  //只能有一个负号，且不出现在输入值中间
  item[tag] = item[tag]
    .replace(/\-{2,}/g, "-")
    .replace("-", "$#$")
    .replace(/\-/g, "")
    .replace("$#$", "-")
    .replace(/(?<=\d)-$|(?<=\.)-$/g, "");
  // let symbol = item[tag][0] == '-' ? '-' : ''
  if (lengths == 2) {
    item[tag] = item[tag].replace(/^(\-)*(\d+)\.(\d{0,2}).*$/, "$1$2.$3");
  }
  if (lengths == 4) {
    item[tag] = item[tag].replace(/^(\-)*(\d+)\.(\d{0,4}).*$/, "$1$2.$3");
  }

  // console.log(Math.abs(item[tag]),'qwqe')
  // 负数符号的时候 仅验证 不执行计算  提交的收 也要加上这个 -符号验证
  // let isCount = isNaN(Math.abs(item[tag])) ? false : true;
  return item[tag]

}

