import { defineStore } from 'pinia'
import {
  getCodeApi,
  postLoginApi,
  postCodeLoginApi
} from '@/utils/api/login/api'
import { STATUS } from '@/utils/http/status'
import { showFailToast, showSuccessToast } from 'vant'
import { setToken } from '@/utils/http/auth'
import router from '@/router'
const useLogin = defineStore('login', {
  state() {
    return {
      form: {
        mobile: '13230000100',
        password: 'abc123456',
        code: ''
      },
      isCode: false, // 密码登录状态 为true是验证码登录
      isPwd: false, // 密码状态
      checked: false, // 协议状态
      isDisabled: false, // 按钮禁用
      isCodeStatus: false,
      codeMsg: '发送验证码'
    }
  },
  actions: {
    // 发送验证码
    async sendCode() {
      this.isCodeStatus = true
      let time = 60
      const timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer)
          this.isCodeStatus = false
          this.codeMsg = `发送验证码`
          // console.log(this.codeMsg, 'this.codeMsg');
        } else {
          this.codeMsg = `${time}s后再次发送`
          time--
        }
      }, 1000)
      const res = await getCodeApi({ mobile: this.form.mobile, type: 'login' })
      console.log('验证码', res)
      const { code, data, message } = res.data as any
      if (STATUS.SUCCESS.includes(code)) {
        showSuccessToast(message)
        this.form.code = data.code
      } else {
        showFailToast(message)
      }
    },
    // 登录请求
    async onSubmit() {
      if (this.checked) {
        let res
        if (this.isCode) {
          // 验证码登录
          res = await postCodeLoginApi(this.form)
          console.log('验证码登录数据', res)
        } else {
          res = await postLoginApi(this.form)
          console.log('密码登录数据', res)
        }

        const { code, data, message } = res.data as any
        if (STATUS.SUCCESS.includes(code)) {
          showSuccessToast(message)
          setToken(data.token)
          // 跳转到登录页面
          router.push('/')
        } else {
          showFailToast(message)
        }
      }
    }
  }
})
export const name: any = 'useLogin'
export default useLogin
