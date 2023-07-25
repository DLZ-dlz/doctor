import Cookie from 'js-cookie'

const TokenKey = 'token'
// 取
export const getToken = () => {
  return Cookie.get(TokenKey)
}
// 存
export const setToken = (token: string) => {
  Cookie.set(TokenKey, token)
}
// 删除
export const removeToken = () => {
  Cookie.remove(TokenKey)
}
