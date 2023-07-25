<template>
  <div class="login">
    <van-nav-bar
      right-text="注册"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />
    <div class="code">
      <h1>{{ store.isCode ? '手机验证码登录' : '密码登录' }}</h1>
      <p @click="codeLogin">
        {{ store.isCode ? '密码登录' : '手机验证码登录' }} >
      </p>
    </div>
    <!-- 表单 -->
    <div class="form">
      <div class="form-item">
        <input
          type="text"
          v-model="store.form.mobile"
          @blur="inputBlur('mobile')"
          placeholder="请输入手机号"
        />
        <p>{{ msg['mobile'] }}</p>
      </div>
      <!-- 密码 -->
      <div class="form-item" v-if="!store.isCode">
        <input
          :type="store.isPwd ? 'text' : 'password'"
          v-model="store.form.password"
          @blur="inputBlur('password')"
          placeholder="请输入密码"
        />
        <p>{{ msg['password'] }}</p>
        <i
          class="iconfont"
          :class="store.isPwd ? 'icon-eye2' : 'icon-eyeOff'"
          @click="store.isPwd = !store.isPwd"
        ></i>
      </div>
      <!-- 验证码 -->
      <div class="form-item item-code" v-else>
        <input
          v-model="store.form.code"
          @blur="inputBlur('code')"
          placeholder="请输入验证码"
        />
        <p>{{ msg['code'] }}</p>
        <button
          :class="store.isCodeStatus ? 'active' : ''"
          @click="store.sendCode"
          :disabled="store.isCodeStatus"
        >
          {{ store.codeMsg }}
        </button>
      </div>
      <div class="form-item">
        <van-checkbox v-model="store.checked"></van-checkbox>
        <p>
          我已同意&nbsp;
          <span>用户协议</span>
          &nbsp; 及 &nbsp;
          <span>隐私协议</span>
        </p>
      </div>
      <div class="form-item">
        <button
          :class="store.isDisabled ? 'isDis' : ''"
          :disabled="!store.isDisabled"
          @click="store.onSubmit"
        >
          登录
        </button>
      </div>
      <div class="form-item">
        <p>忘记密码？</p>
      </div>
    </div>
    <div class="party">
      <p>第三方登录</p>
      <i class="iconfont icon-qqqianbao"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import modules from '@/stores'

// 引入仓库
// @ts-ignore
const store = modules.useLogin()

//#region 正则校验
const rules: any = {
  mobile: [
    { required: true, message: '请输入手机号' },
    {
      pattern: /^1[3,4,5,6,7,8,9]\d{9}$/,
      message: '手机号格式不正确'
    }
  ],
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: /^[a-zA-Z0-9]{8,24}$/,
      message: '密码需8-24个字符'
    }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码6个数字'
    }
  ]
}

//#endregion
//#region 密码失焦校验
const inputBlur = (rule: any) => {
  let num = 0
  rules[rule].forEach((item: any) => {
    if (item.required && !(store.form as any)[rule]) {
      num++
      return (msg[rule] = item.message)
    } else if (store.form[rule] && item.pattern) {
      if (!item.pattern.test(store.form[rule])) {
        num++
        return (msg[rule] = item.message)
      }
    } else if (num == 0) {
      return (msg[rule] = '')
    }
  })
  regBox()
}

const regBox = () => {
  let mobile = /^1[3,4,5,6,7,8,9]\d{9}$/.test(store.form.mobile)
  let password = /^[a-zA-Z0-9]{8,24}$/.test(store.form.password)
  let code = /^[0-9]{6}$/.test(store.form.code)
  if ((mobile && password) || (mobile && code)) {
    store.isDisabled = true
  } else {
    store.isDisabled = false
  }
}
regBox()
//#endregion

//#region 切换验证码登录
const codeLogin = () => {
  store.isCode = !store.isCode
  regBox()
}
//#endregion
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}

::v-deep(.van-nav-bar__content) {
  height: 1.1734rem;
}
::v-deep(.van-nav-bar__text) {
  font-size: 0.4534rem;
}
::v-deep(.van-nav-bar .van-icon) {
  font-size: 0.4533rem;
}

// 密码登录标题样式
.code {
  width: 100%;
  height: 0.96rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.6667rem;
  padding: 0 0.2667rem 0 0.4rem;
  box-sizing: border-box;
  h1 {
    font-size: 0.6333rem;
    font-weight: normal;
  }
  p {
    font-size: 0.4267rem;
    letter-spacing: 0.0267rem;
    color: #3c3e42;
    margin-bottom: -0.2rem;
    cursor: pointer;
  }
}
// 表单部分样式
.form {
  margin-top: 1.2rem;
  .form-item {
    width: 9.2rem;
    margin: auto;
    position: relative;
    border-bottom: 0.0133rem solid #e5e5e5;

    input {
      width: 100%;
      height: 1.3733rem;
      font-size: 0.4rem;
      border: none;
      &::placeholder {
        color: #999;
      }
    }
    i {
      font-size: 0.6rem;
      position: absolute;
      right: 0.6rem;
      top: 0.4rem;
      cursor: pointer;
    }
    // 复选框样式
    .van-checkbox {
      font-size: 0.4rem;
      margin-right: 0.1547rem;
    }
    &:nth-of-type(1),
    &:nth-of-type(2) {
      p {
        font-size: 0.4rem;
        color: #f00;
      }
    }
    &:nth-of-type(3) {
      margin: 0.4rem auto 0.56rem;
      display: flex;
      align-items: center;
      font-size: 0.4rem;
      border: none;
      span {
        color: #1bc3a5;
      }
    }
    &:nth-of-type(4) {
      button {
        width: 100%;
        height: 1.1733rem;
        border-radius: 0.6333rem;
        border: none;
        font-size: 0.4rem;
        color: #999;
        font-weight: 700;
        background-color: #fafafa;
        cursor: pointer;
        &.isDis {
          color: #fff;
          background-color: #16c2a3;
        }
      }
    }
    &:nth-of-type(5) {
      margin-top: 0.4rem;
      align-items: center;
      border: none;
      p {
        font-size: 0.4033rem;
        color: #666;
        cursor: pointer;
      }
    }
  }
  // 验证码样式
  .item-code {
    font-size: 0.4rem;
    position: relative;
    input {
      flex: 1;
    }
    button {
      position: absolute;
      right: 0;
      top: 0.4rem;
      width: 3.8133rem;
      flex-shrink: 0;
      text-align: right;
      font-size: 0.38rem;
      box-sizing: border-box;
      background-color: #fff;
      color: #16c2a3;
      cursor: pointer;
      border: none;
      &.active {
        color: #8ae0d1;
      }
    }
  }
}
// 第三方登录样式
.party {
  width: 5.3333rem;
  margin: 7.36rem auto 0;
  text-align: center;
  input {
    width: 100%;
    height: 1.6667rem;
  }
  p {
    font-size: 0.4033rem;
    color: #999;
    margin-bottom: 0.4rem;
  }
  i {
    font-size: 0.8rem;
    cursor: pointer;
    color: #39f;
  }
}
// 按钮是否禁用
</style>
