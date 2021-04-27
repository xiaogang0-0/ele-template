import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, removeUserInfo} from '@/utils/auth'
import Router from '../router'


// 运行环境
const env = process.env.NODE_ENV === 'development'
  ? 'development'
  : process.env.VUE_APP_BASE_API === '/prod-api' ? 'production'
    : process.env.VUE_APP_BASE_API === '/stage-api' ? 'test'
      : 'production'

console.log(env, '运行环境env{production:线上;test:测试;development:本地;}')
const baseURL = env === 'production' ? 'http://platform.hlwl.com:9300' : (env === 'test' ? 'http://test.hll315.com:9300' : 'http://test.hll315.com:9300')

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
    // 统一携带token
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
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res.msg) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        return Promise.reject(res)
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    let { data } = error.response;

    if (error.response.status == 401) {
      Message({
        message: (data.message ? data.message : data.msg),
        type: 'error',
        duration: 3 * 1000
      })
      setTimeout(()=>{
          removeToken();
          removeUserInfo()

          localStorage.removeItem("ShoppingMall_menuList");
          Router.push({ path: "/login" });
      },2000)
    } else {
      Message({
        message: (data.message ? data.message : data.msg),
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
