<script setup>
import {User, Lock, Message, Ticket} from '@element-plus/icons-vue'
import { ref,watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import {getVerificationCodeService, userLoginService, userRegisterService} from "@/api/user.js";
const isRegister = ref(false)

const formModel = ref({   // 属性名与后端联系
  email: '',
  username: '',
  gender: '',
  VerificationCode: '',
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },//非空校验  trigger表示 blur 光标离开校验 change 实时校验
    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change' }
  ],
  email: [
      { required: true, message: '请输入邮箱', trigger: 'change' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' },
      { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'change' }
  ],
  gender: [
      { required: true, message: '请选择性别', trigger: 'change' }
  ],
  VerificationCode: [
      { required: true, message: '请输入验证码', trigger: 'change' },
      { pattern: /^[0-9]{3,8}$/, message: '请输入正确的验证码', trigger: 'change'}
  ]
}
const form = ref()
const register = async() => {
  await form.value.validate()
  // console.log('开始注册请求')
  await userRegisterService(formModel.value)
  isRegister.value = false
}
// const userStore = useUserStore()
const router = useRouter()
const useStore = useUserStore()
const login = async() => {
  await form.value.validate()
  // console.log('开始登录请求')
  const res = await userLoginService(formModel.value)
  console.log(res.data.data)
  useStore.setToken(res.data.data)
  await router.push('/')
}
const timer = ref('获取验证码')
const isCounting = ref(false)

const getCode = async() => {
  if (isCounting.value) return

  // 发起请求
  await getVerificationCodeService(formModel.value.email)

  let countDown = 50
  isCounting.value = true
  timer.value = `${countDown}s`

  const interval = setInterval(() => {
    countDown--
    if (countDown > 0) {
      timer.value = `${countDown}s`
    } else {
      clearInterval(interval)
      timer.value = '获取验证码'
      isCounting.value = false
    }
  }, 1000)
}

// 切换登录注册的时候重置表单
watch(isRegister, () => {
  formModel.value= {
    username: '',
    password: '',
    repassword: ''
  }
})

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>




    <el-col :span="6" :offset="3" class="form">
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="formModel.email" :prefix-icon="Message" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="gender" class="flex">
          <el-select class="elFlex" v-model="formModel.gender" placeholder="请选择性别" >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            <el-option label="other" value="2"></el-option>
          </el-select>
          <el-button
              class="genderButton"
              type="info"
              round
              auto-insert-space
              :disabled="isCounting"
              @click="getCode"
          >
            {{ timer }}
          </el-button>
        </el-form-item>
        <el-form-item prop="VerificationCode">
          <el-input v-model="formModel.VerificationCode" :prefix-icon="Ticket" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="formModel.email" :prefix-icon="Message" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="VerificationCode" class="flex">
          <el-input class="elFlex" v-model="formModel.VerificationCode" :prefix-icon="Ticket" placeholder="请输入验证码"></el-input>
          <el-button
              class="genderButton"
              type="info"
              round
              auto-insert-space
              :disabled="isCounting"
              @click="getCode"
          >
            {{ timer }}
          </el-button>
        </el-form-item>
<!--        <el-form-item class="flex">-->
<!--          <div class="flex">-->
<!--            <el-checkbox>记住我</el-checkbox>-->
<!--            <el-link type="primary" :underline="false">忘记密码？</el-link>-->
<!--          </div>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space
          >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .elFlex{
      width: 45%;
      margin-right: 15%;
    }
    .genderButton{
      width: 40%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
