import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import Router from '../router'

// 运行环境
const env = process.env.NODE_ENV === 'development'
  ? 'development'
  : process.env.VUE_APP_BASE_API === '/prod-api' ? 'production'
    : process.env.VUE_APP_BASE_API === '/stage-api' ? 'test'
      : 'production'

console.log(env, '运行环境env{production:线上;test:测试;development:本地;}')
const baseURL = env === 'production' ? 'http://47.114.132.55:8008' : (env === 'test' ? 'http://47.111.9.187:8008/' : 'http://47.111.9.187:8008/')

// 创建AXIOS实例
const service = axios.create({
  baseURL,
  // withCredentials: true, // 跨域请求时发送cookie
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做点什么

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // 请根据实际情况修改
    //   config.headers['X-Token'] = getToken()
    // }
    // 统一携带tooken

    // 本地备用admin token
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODY3Nzk2MjksInVzZXJfbmFtZSI6ImFkbWlufCIsImF1dGhvcml0aWVzIjpbIlJPTEVfTUFOQUdFUiJdLCJqdGkiOiJjYjQ2MDBiYS05OGYyLTQ1ZDQtYmZiYy03ZmM0MDQ2YjBkZTIiLCJjbGllbnRfaWQiOiJobGwtcGxhdGZvcm0tYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.gRSUGdu53ctIvt2Ogx6KOPsENQgFjQwbloMvovsRRVc'
    // if (token) {
    //   config.headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   }
    // }
    // 正常线上的
    if (getToken()) {
      config.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    }

    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200 && res.code !== 1002) {
      if (res.msg) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        return Promise.reject(res)
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      /* return Promise.reject(new Error(res.message || res.msg || 'Error')) */
    } else {
      return res
    }
  },
  error => {
    const res = error.response.data
    // console.log(res)
    Message({
      message: res.error || res.message || res.msg || '请求超时',
      type: 'error',
      duration: 3 * 1000
    })
    if (res.code == 401) {
      setTimeout(() => {
        removeToken()
        localStorage.removeItem('YXKJ_userInfo')
        localStorage.removeItem('YXKJ_menuList')
        Router.push({ path: '/login' })
      }, 2000)
    }
    return Promise.reject(error)
  }
)

export default service
