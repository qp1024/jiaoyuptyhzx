import http from './http'

/**
 * login
 *
 * */
export function login (query) {
  return http.post('/door/login', {
    'username': query.username,
    'password': query.password
  })
}
/**
 * verify验证用户名
 *
 * */
export function verifyAccount (username) {
  return http.post('/users/check/username', {
    'username': username
  })
}
/**
 * 验证手机号是否注册
 *
 * */
export function verifyPhone (number) {
  return http.get('/users/check/phone', {
    'phone': number
  })
}
/**
 * 发送验证码到手机
 *
 * */
export function sendCodeToPhone (number) {
  return http.post('/users/send_code', {
    'phone': number
  })
}
/**
 * 验证手机验证码
 *
 * */
export function verifyPhoneCode (phoneInfo) {
  return http.get('/users/verify_phone', {
    'phone': phoneInfo.phoneNumber,
    'code': phoneInfo.code
  })
}
/**
 * 重置密码
 *
 * */
export function resetPassword (phoneInfo) {
  return http.post('/users/reset_pwd', {
    'password': phoneInfo.password,
    'phone': phoneInfo.number
  })
}
/**
 * 验证邮箱号是否注册
 *
 * */
export function verifyEmail (email) {
  return http.get('/users/check/email', {
    'email': email
  })
}
/**
 * 发送验证码到邮箱
 *
 * */
export function sendCodeToEmail (email) {
  return http.post('/users/email/send_code', {
    'email': email
  })
}
/**
 * 验证邮箱验证码
 *
 * */
export function verifyEmailCode (phoneInfo) {
  return http.get('/users/verify_email', {
    'email': phoneInfo.phoneNumber,
    'code': phoneInfo.code
  })
}
/**
 * 重置邮箱密码
 *
 * */
export function resetEmailPassword (phoneInfo) {
  return http.post('/users/email/reset_pwd', {
    'email': phoneInfo.number,
    'password': phoneInfo.password
  })
}
/**
 * 查询首页轮播公告
 *
 * */
export function queryBannerBulletin () {
  return http.get('/bulletin/recommend')
}
/**
 * 查询公告列表
 *
 * */
export function queryBulletin (page) {
  return http.get('/bulletin/list', {
    'page': page
  })
}
/**
 * 查询公告详情
 *
 * */
export function queryBulletinDetail (id) {
  return http.get('/bulletin/info/' + id)
}
