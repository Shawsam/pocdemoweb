<template>
  <div class='panel'>
    <el-form ref="formRef" :rules="rules" :model="formData">
      <el-form-item label="" prop="userName">
        <el-input v-model="formData.userName" class="input" maxlength="11" @input="userNameInput"
          placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="verCode">
        <div class="flex-center flex_item">
          <el-input v-model="formData.verCode" class="input flex_item" placeholder="请输入图形验证码"></el-input>
          <div class="getverCode" v-if="isShowVerCode" @click="isShowVerCode = false">
            <img src="@/assets/images/login/refresh.png" alt="">
            <span>点击获取验证码</span>
          </div>
          <div v-else class="codeImg">
            <img @click="refreshCodeUrl()" :src="codeUrl" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="" prop="smsCode">
        <div class="flex-center flex_item">
          <el-input v-model="formData.smsCode" class="input " placeholder="请输入验证码"></el-input>
          <div v-if="!isWait" @click="sendMsg" class="msgBtn">获取验证码</div>
          <div v-if="isWait" class="msgBtn timer">{{ countDownVal }}s</div>
        </div>
      </el-form-item>
      <el-button type="primary" @click="login" class="loginBtn" v-if="!loading">登录 / 注册</el-button>
      <el-button type="primary" class="loginBtn loadingBtn" v-else>登录 / 注册</el-button>
    </el-form>
    <div class="mt10">
      <div class="agreement"><el-checkbox v-model="isAgree">阅读并接受懂小剧 </el-checkbox> <span class="text"
          @click="openNewWindow('userAgreement')"> 《服务协议》 </span> 与 <span class="text"
          @click="openNewWindow('privacyAgreement')"> 《隐私条款》 </span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { smsLogin, getSmsCode, getCodeUrl } from '@/api/login'
import { getUserImg } from "@/api/user";
import { ElMessage } from 'element-plus'
import { parseBoolean, openNewWindow } from '@/utils/common'
import Cookies from 'js-cookie'
import { user } from '@/stores/user'
import { storeToRefs } from "pinia";
const userStore = user()
// userInfo
const { token } = storeToRefs(userStore)
const props = defineProps(['isInvite'])
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formRef = ref()
const formData = reactive({
  userName: '',
  smsCode: '',
  verCode: '',
})
const rules = reactive({
  userName: [{ required: true, message: "请输入手机号", trigger: "blur" }, {
    pattern:
      /^1[3456789]{1}\d{9}$/,
    message: "请输入正确的手机号",
    trigger: "blur"
  }
  ],
  smsCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  verCode: [{ required: true, message: "请输入图形验证码", trigger: "blur" }],
})
const isWait = ref(false)
const countDownVal = ref(60)
const codeUrl = ref('')
const isShowVerCode = ref(false)
const rememberMe = ref(true)
const isAgree = ref(false)

const getCookie = () => {
  const ye_userName = Cookies.get('ye_phone')
  formData.userName = ye_userName === undefined ? formData.userName : ye_userName
  userNameInput(formData.userName)
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
//倒计时
const countDownStart = () => {
  isWait.value = true
  let timer = setInterval(() => {
    if (countDownVal.value == 0) {
      clearInterval(timer)
      refreshCodeUrl()
      formData.verCode = ''
      countDownVal.value = 60
      isWait.value = false
    }
    countDownVal.value = countDownVal.value - 1
  }, 1000)
}
//发送短信
const sendMsg = () => {
  if (!formData.userName) {
    ElMessage({ offset: -20, duration: 1500, type: 'warning', message: '请输入手机号' })
    return false
  } else if (!formData.verCode) {
    ElMessage({ offset: -20, duration: 1500, type: 'warning', message: '请输入图形验证码' })
    return false
  }
  let param = {
    "userName": formData.userName,
    "verCode": formData.verCode,
    "type": 3001
  }
  getSmsCode(param).then(() => {
    countDownStart()
  })
}
//登录
const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (!isAgree.value) {
        ElMessage({ offset: -20, duration: 1500, type: 'warning', message: '请阅读并接受懂小剧服务协议与隐私条款' })
        return false
      }
      let data = {
        userName: formData.userName,
        smsCode: formData.smsCode,
        registerCode: props.isInvite,
        source: 'PC'
      }
      loading.value = true
      smsLogin(data, data).then((res) => {
        userStore.setToken(res.token)
        localStorage.setItem('token', res.token)
        ElMessage({ duration: 1500, type: 'success', message: '登录成功' })
        if (rememberMe.value) {
          Cookies.set('ye_phone', formData.userName, { expires: 15 })
        } else {
          Cookies.remove('ye_phone')
        }
        window.history.state.back ? router.go(-1) : router.push('/')
        userStore.setUserInfo()
        loadUserImg()
        localStorage.setItem('hasShowPop', '0')
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
  margin-bottom: 10px;
  color: #8F8F8F;
}

.codeImg,
.msgBtn {
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

.text {
  color: #704FFF;
}

.text:hover {
  color: #AE08FF;
}

.passname {
  font-size: 12px;
  color: #8F8F8F;
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

.agreement {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #8F8F8F;

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