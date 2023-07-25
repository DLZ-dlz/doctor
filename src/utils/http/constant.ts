interface IResult {
  meta: {
    status: number
    msg: string
  }
}
interface IResultData<T = any> extends IResult {
  data: T
}
export type { IResultData }
