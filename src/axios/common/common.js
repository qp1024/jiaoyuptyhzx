/**
 * 定义常量
 * @param
 */
export const ERR_OK = 200
export const ERR_REQUEST = 400
export const subjectList = [
  {code: '', subject: '全部'},
  {code: '', subject: '语文'},
  {code: '', subject: '数学'},
  {code: '', subject: '英语'},
  {code: '', subject: '思想品德'},
  {code: '', subject: '自然科学'},
  {code: '', subject: '物理'},
  {code: '', subject: '化学'},
  {code: '', subject: '生物'},
  {code: '', subject: '历史'},
  {code: '', subject: '地理'},
  {code: '', subject: '政治'},
  {code: '', subject: '信息技术'},
  {code: '', subject: '音乐'},
  {code: '', subject: '体育'},
  {code: '', subject: '其它'}
]

/**
 * 正则校验
 * @param手机号
 */
export function isMobile (value) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
}
/**
 * 正则校验
 * @param不为空
 */
export function isNotNull (value) {
  return !(typeof (value) === 'undefined' || value === null || !value.replace(/(^\s*)|(\s*$)/g, '').length)
}
/**
 * 正则校验
 * @param邮箱
 */
export function isEmail (value) {
  return /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/.test(value)
}
/**
 * 正则校验
 * @param密码6-14位数字字母
 * */
export function isPassword (value) {
  return /^[a-zA-Z0-9]{6,14}$/.test(value)
}
/**
 * 正则校验
 * @param序号1-9数字
 * */
export function isNumber (value) {
  return /^[1-9]\d*$/.test(value)
}

/**
 * 字符串截取
 * @param value
 */
export function valueSubstr (value, len) {
  if (value) {
    return value.substring(0, value.length - len)
  }
}

/**
 * 查询回车事件
 * @param
 */
export function keyBoardEnter (e, cb) {
  const keyCode = window.event ? e.keyCode : e.which
  if (keyCode === 13 || (e.target && (e.target.nodeName === 'BUTTON' || e.target.nodeName === 'SPAN'))) {
    cb()
  }
}
/**
 * 正则校验
 * 去掉所有的html标签
 * */
export function deleteHtmlTag (str) {
  str = str.replace(/<[^>]+>|&[^>]+;/g, '').trim()
  return str
}
/**
 * 排序
 * 根据某个属性将数组排序
 * */
export function compare (property) {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}
/**
 * 排序
 * 根据某个属性将数组排序
 * */
export function getBody (content) {
  let REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/
  let result = REG_BODY.exec(content)
  if (result && result.length === 2) { return result[1] }
  return content
}
/**
 * 正则
 * 提取字符串中的数字
 * */
export function getNumber (str) {
  let str1 = str.replace(/[^0-9]/ig, '')
  return str1
}

/**
 * 正则
 * 检验特殊字符
 * */
export function checkSpecificKey (str) {
  const specialKey = /^[0-9a-zA-Z]+$/ // 数字和字母
  if (specialKey.test(str)) {
    return true
  }
  return false
}

/**
 * 正则
 * 汉字和字母
 * */
export function checkUserName (str) {
  const specialKey = /^[A-Za-z\u4e00-\u9fa5]+$/ // 汉字和字母
  // const specialKey = /^[\u4E00-\u9FA5A-Za-z].{1,11}$/ // 汉字和字母
  if (specialKey.test(str)) {
    return true
  }
  return false
}

/**
 * 正则
 * 不能包含空格
 * */
export function checkBlank (str) {
  const blank = /^\S*$/ // 数字和字母
  if (blank.test(str)) {
    return true
  }
  return false
}

/**
 * 正则
 * 数字1-10位
 * */
export function checkNumber (str) {
  const blank = /^\d{1,10}$/ // 数字1-10位
  if (blank.test(str)) {
    return true
  }
  return false
}

/**
 * 匹配手机号中间六位
 *
 * */
export function checkPhone (str) {
  const reg = /^(\d{3})\d*(\d{2})$/
  return str.replace(reg, '$1******$2')
}

/**
 * 匹配手机号中间六位
 *
 * */
export function checkEmail (str) {
  const reg = /(.{2}).+(.{2}@.+)/g
  return str.replace(reg, '$1******$2')
}

/**
 * 匹配手机号中间六位
 *
 * */
export function validatePass (num) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$/.test(num)
}

/**
 * 排序
 * 第二个参数没有传递 默认升序排列
 * */
export function sortBy (attr, rev) {
  if (rev === undefined) {
    rev = 1
  } else {
    rev = (rev) ? 1 : -1
  }

  return function (a, b) {
    a = a[attr]
    b = b[attr]
    if (a < b) {
      return rev * -1
    }
    if (a > b) {
      return rev * 1
    }
    return 0
  }
}

/**
 * 获取对应路由
 *
 * */
export function filterAsyncRouter (routes, roleId) {
  let results = []
  routes.filter(item => {
    if (item.meta) {
      if (item.meta.roleId) {
        if (item.meta.roleId === roleId) {
          results.push(item)
        }
      } else { // 例如404页面
        results.push(item)
      }
    } else {
      results.push(item)
    }
  })
  return results
}
