<template>
  <div class='panel'>
    <el-form ref="formRef" :rules="rules" :model="formData">
      <el-form-item label="" prop="userName">
        <el-input class="input" v-model="formData.userName" placeholder="请输入手机号" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input show-password class="input" v-model="formData.password" placeholder="请输入密码"
          @keyup="verify('password')"></el-input>
      </el-form-item>
      <el-form-item label="" prop="verCode">
        <div class="flex-center flex_item">
          <el-input v-model="formData.verCode" class="input" placeholder="请输入图形验证码"></el-input>
          <div class="getverCode" v-if="isShowVerCode" @click="isShowVerCode = false">
            <img src="@/assets/images/login/refresh.png" alt="">
            <span>点击获取验证码</span>
          </div>
          <div v-else class="codeImg">
            <img @click="refreshCodeUrl" :src="codeUrl" />
          </div>
        </div>
      </el-form-item>
      <el-button type="primary" @click="login" class="loginBtn" v-if="!loading">登录 / 注册</el-button>
      <el-button type="primary" class="loginBtn loadingBtn" v-else>登录 / 注册</el-button>
    </el-form>
    <!-- <div class="flex-between" v-if="env">
      <span class="forget-pass" @click="$emit('pwd')">忘记密码？</span>
    </div> -->
    <div class="agreement"><el-checkbox v-model="isAgree">阅读并接受懂小剧</el-checkbox> <span class="text"
        @click="openNewWindow('userAgreement')">《服务协议》</span> 与 <span class="text"
        @click="openNewWindow('privacyAgreement')">《隐私条款》</span></div>
  </div>
</template>
  
<script setup>
import { accountLogin, getCodeUrl } from '@/api/login'
import { getUserImg } from '@/api/user'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import { parseBoolean, openNewWindow } from '@/utils/common'
import { user } from '@/stores/user'
import { storeToRefs } from "pinia";
const userStore = user()
// userInfo
const { token } = storeToRefs(userStore)

const props = defineProps(['env'])

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const formRef = ref()
const formData = reactive({
  userName: '',
  password: '',
  verCode: '',
})
const verify = (val) => {
  // 禁止输入文字&空格符
  formData[val] = formData[val].replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|\s/g, '')
}
const rules = reactive({
  userName: [{ required: true, message: "请输入手机号", trigger: "blur" }, {
    pattern:
      /^1[3456789]{1}\d{9}$/,
    message: "请输入正确的手机号",
    trigger: "blur"
  }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" },
    // {  //插入正则验证：大小写、数字、至少8位、不常用字符
    //   pattern:
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
    //   message: "密码应当8-16位且含有数字、大小写字母",
    //   trigger: "blur"
    // }
  ],
  verCode: [{ required: true, message: "请输入图形验证码", trigger: "blur" }],
})

const codeUrl = ref('')
const passRememberMe = ref(true)
const isShowVerCode = ref(false)
const isAgree = ref(false)

const getCookie = () => {
  const ye_userName = Cookies.get('ye_userName')
  const ye_password = Cookies.get('ye_passWord')
  formData.userName = ye_userName === undefined ? formData.userName : ye_userName
  formData.password = ye_password === undefined ? formData.password : ye_password
}
const loadUserImg = async () => {
  let user_img = ''
  const params = {
    token: token.value,
    time: new Date().getTime()
  }
  user_img = await getUserImg(params)
  userStore.setUserImg(user_img)
}

const refreshCodeUrl = () => {
  codeUrl.value = getCodeUrl(formData.userName)
}
const userNameInput = (val) => {
  if (val.length == 11) {
    isShowVerCode.value = false
    refreshCodeUrl()
  }
}

const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (!isAgree.value) {
        ElMessage({ offset: -20, duration: 1500, type: 'warning', message: '请阅读并接受懂小剧服务协议与隐私条款' })
        return
      }
      let param = {
        userName: formData.userName,
        password: formData.password,
        verCode: formData.verCode,
        source: 'PC',
      }
      loading.value = true
      accountLogin(param).then((res) => {
        if (passRememberMe.value) {
          Cookies.set('ye_userName', formData.userName, { expires: 15 })
        } else {
          Cookies.remove('ye_userName')
        }
        userStore.setToken(res.token)
        localStorage.setItem('token', res.token)
        window.history.state.back ? router.go(-1) : router.push('/')
        ElMessage({ duration: 1500, type: 'success', message: '登录成功' })
        localStorage.setItem('hasShowPop', '0')
        userStore.setUserInfo()
        loadUserImg()
      }).finally(() => {
        refreshCodeUrl()
        loading.value = false
      })
    }
  })
}
onMounted(() => {
  refreshCodeUrl()
  getCookie()
})

watch(() => formData.userName, (nVal) => {
  if (nVal.length == 11) {
    isShowVerCode.value = false
    refreshCodeUrl()
  }
}, {
  deep: true
})
</script>
<style scoped lang='scss'>
.panel {
  color: #000;

  :deep(.el-form) {
    .el-input {
      .el-input__wrapper {
        border-radius: 2px;
        box-shadow: none;
        border: 1px solid #C4B6FF;
        color: #606266;
        height: 40px;
        padding: 0 20px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
      }
    }
  }
}

.tip {
  font-size: 12px;
  text-align: center;
  margin-bottom: 20px;
  color: #8C8D93;
}

.codeImg {
  cursor: pointer;
  height: 40px;
  background: #FFFFFF;
  border-radius: 2px;
  border: 1px solid #C4B6FF;
  min-width: 91px;
  margin-left: 5px;
  text-align: center;
  line-height: 40px;

  img {
    width: 100%;
    height: 40px;
  }
}

.loginBtn {
  cursor: pointer;
  width: 100%;
  background: linear-gradient(270deg, #4365FF 0%, #AE08FF 100%);
  border: 0;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  color: #FEEDED;
  text-align: center;
  line-height: 40px;
}

.loadingBtn {
  cursor: not-allowed;
  background: #b0bffd;
}

.timer {
  color: var(--brand-6);
  ;
}

.getverCode {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  height: 40px;
  border-radius: 2px;
  min-width: 91px;
  background-color: #F3F3F3;
  color: #333;

  span {
    font-size: 12px;
    line-height: 20px;
  }

  img {
    width: 15px;
  }
}

.mt-20 {
  margin-top: 20px;
}

.passname {
  font-size: 12px;
  color: #8F8F8F;
}

.forget-pass {
  cursor: pointer;
  margin-top: 5px;
  font-size: 13px;
  color: #8F8F8F;
}

.agreement {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #8F8F8F;

  .text {
    color: #704FFF;
  }

  .text:hover {
    color: #AE08FF;
  }

  ::v-deep .el-checkbox__label {
    font-size: 12px;
    color: #8F8F8F;
  }

  span {
    margin: 0 5px;
    cursor: pointer;

    // &:hover {
    //   background: linear-gradient(270deg, var(--pink-7) 0%, var(--yellow-2) 100%);
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    // }
  }
}
</style>