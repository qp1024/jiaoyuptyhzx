// import axios from 'axios'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import { ERR_OK } from './common/common'
import global from '../../static/config/global'
import router from '../router'

// http Request 拦截器
axios.interceptors.request.use(config => { // 这里的config包含每次请求的内容
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  if (response.status === undefined) {
    localStorage.removeItem('Authorization')// 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
    router.push({
      path: '/login' // 到登录页重新获取token
    })
  }
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 ||
    response.status === 400 || response.status === 201 || response.status === 204)) {
    return response
  } else if (!response.status) {
  } else if (response.status === 403) {
    Message({
      showClose: true,
      message: 'token过期或缺少token,请重新登录！',
      type: 'error'
    })
    localStorage.removeItem('Authorization')// 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
  } else {
    // 异常状态下，把错误信息返回去
    return {
      status: 404,
      data: { code: 404, message: '服务器异常，请稍后重试' },
      msg: '服务器异常，请稍后重试'
    }
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === 404) {
    // Message({
    //   type: 'error',
    //   message: res.msg
    // })
  }
  if ((res.status !== ERR_OK && res.status !== 201 && res.status !== 204)) {
    // Message({
    //   type: 'error',
    //   message: res.data.message
    // })
  }
  return res
}
// 请求方式的配置
export default {
  post (url, data, type) { //  post
    let obj = {}
    let Authorization = ''
    if (document.cookie.length > 0) {
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        // 判断查找相对应的值
        if (arr2[0] === 'Authorization') {
          Authorization = arr2[1]
        }
      }
    } else {
      localStorage.setItem('Authorization', '')
    }
    if (url.indexOf('login') === -1) { // 不是、login,传token
      obj = {
        'Authorization': Authorization
      }
    } else if (url.indexOf('login') > -1) { // 登录页面
      // localStorage.setItem('Authorization', '')
      obj = {
        Authorization: 'Authorization'
      }
    }

    return axios({
      method: 'post',
      baseURL: global.BASE_URL,
      url,
      data: type ? data : qs.stringify(data),
      timeout: 5000,
      headers: obj
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) { // get
    let obj = {}
    let Authorization = ''

    if (document.cookie.length > 0) {
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        // 判断查找相对应的值
        if (arr2[0] === 'Authorization') {
          Authorization = arr2[1]
        }
      }
    } else {
      localStorage.setItem('Authorization', '')
    }
    if (url.indexOf('login') === -1) {
      obj = {
        'Authorization': Authorization
      }
    } else if (url.indexOf('login') > -1) { // 登录页面
      obj = {
        // 'X-Requested-With': 'XMLHttpRequest'
      }
    }
    return axios({
      method: 'get',
      baseURL: global.BASE_URL,
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: obj
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  delete (url, params) { // delete
    let obj = {}
    let Authorization = ''
    if (document.cookie.length > 0) {
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        // 判断查找相对应的值
        if (arr2[0] === 'Authorization') {
          Authorization = arr2[1]
        }
      }
    } else {
      localStorage.setItem('Authorization', '')
    }
    if (url.indexOf('login') === -1) {
      obj = {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Authorization': localStorage.getItem('Authorization') // Authorization
        'Authorization': Authorization
      }
    } else if (url.indexOf('login') > -1) { // 登录页面
      obj = {
        // 'X-Requested-With': 'XMLHttpRequest'
      }
    }
    return axios({
      method: 'delete',
      baseURL: global.BASE_URL,
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: obj
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },

  put (url, params) { // put
    let obj = {}
    let Authorization = ''
    if (document.cookie.length > 0) {
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        // 判断查找相对应的值
        if (arr2[0] === 'Authorization') {
          Authorization = arr2[1]
        }
      }
    } else {
      localStorage.setItem('Authorization', '')
    }
    if (url.indexOf('login') === -1) {
      obj = {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Authorization': localStorage.getItem('Authorization') // Authorization
        'Authorization': Authorization
      }
    } else if (url.indexOf('login') > -1) { // 登录页面
      obj = {
        // 'X-Requested-With': 'XMLHttpRequest'
      }
    }
    return axios({
      method: 'put',
      baseURL: global.BASE_URL,
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: obj
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
