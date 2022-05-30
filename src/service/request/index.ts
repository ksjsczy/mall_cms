import axios from 'axios'
import { AxiosRequestConfig, AxiosInstance } from 'axios'
import { MyRequestConfig } from './types'
import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = false

class MyRequest {
  //创建axios实例
  instance: AxiosInstance

  //保存基本信息
  loading?: any
  showLoading: boolean

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config?.showLoading ?? DEFAULT_LOADING

    //从config中取出的拦截器，是对应的实例自己的拦截器
    this.instance.interceptors.request.use(
      config?.interceptors?.requestInterceptor,
      config?.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config?.interceptors?.responseInterceptor,
      config?.interceptors?.responseInterceptorCatch
    )

    //添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器，请求成功')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (error) => {
        console.log('所有的实例都有的拦截器，请求失败')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器，响应成功')

        //将loading移除
        if (this.showLoading) this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        }
        return data
      },
      (error) => {
        console.log('所有的实例都有的拦截器，响应失败')

        //将loading移除
        if (this.showLoading) this.loading?.close()

        if (error.response.status === 404) {
          console.log('404错误')
        }
        return error
      }
    )
  }

  request<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = !DEFAULT_LOADING
      }
      if (config?.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config?.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //防止影响同一个实例的其他请求
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          //防止影响同一个实例的其他请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
