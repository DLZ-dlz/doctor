type ModuleType<T> = {
  [key: string]: T
}
const moduleObj: ModuleType<string> = {}
const modules: any = import.meta.glob('./modules/*.ts', { eager: true })
// console.log(modules, 'module')
// @ts-ignore
Object.entries(modules).forEach(
  ([path, moduleFn]: [string, { name: string; default: any }]) => {
    path = path.match(/\/(\w+)\./)![1]
    moduleObj[moduleFn.name] = moduleFn.default
  }
)
export default moduleObj
