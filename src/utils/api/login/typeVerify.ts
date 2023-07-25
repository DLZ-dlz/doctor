interface ILogin {
  mobile: string
  password: string
}
interface ICode {
  mobile: string
  type: string
}
interface ICodeLogin {
  mobile: string
  code: string
}
export type { ILogin, ICode, ICodeLogin }
