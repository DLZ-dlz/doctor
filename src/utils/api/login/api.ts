import api from '@/utils/http/reqeuest'
import * as Type from '@/utils/api/login/typeVerify'
// 封装方法
export const postLoginApi = (data: Type.ILogin) =>
  api.post('/login/password', data)
// 获取验证码
export const getCodeApi = (params: Type.ICode) => api.get('/code', params)
// 验证码登录
export const postCodeLoginApi = (data: Type.ICodeLogin) =>
  api.post('/login', data)
