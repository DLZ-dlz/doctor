import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError
} from 'axios'
import * as TS from '@/utils/http/constant'
import { getToken } from '@/utils/http/auth'
// 配置
const config = {
  baseURL: '',
  timeout: 1000 * 9,
  withCredentials: true, // 允许跨域携带凭证
  headers: {
    'Content-Type': 'application/json'
  }
}

class RequestHttp {
  // 初始化一个对象用来存储axios实例对象
  instance: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 创建一个axios的实例对象
    this.instance = axios.create(config)
    // 添加一个请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log(config,"config");
        if (getToken()) {
          config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        return config
      },
      (error: AxiosError) => {
        Promise.reject(error)
      }
    )
    // 添加一个响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {
        Promise.reject(error)
      }
    )
  }
  // 定义请求基准路径
  public adUrl(url: string) {
    return !import.meta.env.VITE_API_BASE_URL
      ? url
      : import.meta.env.VITE_API_BASE_URL + url
  }
  // 封装一些自定义的请求方法
  public get<T>(url: string, params?: object): Promise<TS.IResultData<T>> {
    return this.instance.get(this.adUrl(url), { params })
  }
  public post<T>(url: string, params?: object): Promise<TS.IResultData<T>> {
    return this.instance.post(this.adUrl(url), params)
  }
  public delete<T>(url: string, params?: object): Promise<TS.IResultData<T>> {
    return this.instance.delete(this.adUrl(url), params)
  }
  public put<T>(url: string, params?: object): Promise<TS.IResultData<T>> {
    return this.instance.put(this.adUrl(url), params)
  }
}

const http = new RequestHttp(config)
export default http
