import MyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求拦截成功')
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('请求拦截失败')
      return error
    },
    responseInterceptor: (res) => {
      // console.log('响应拦截成功')
      return res
    },
    responseInterceptorCatch: (error) => {
      console.log('响应拦截失败')
      console.log(error)
      return error
    }
  }
})

export default myRequest
