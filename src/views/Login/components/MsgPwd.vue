<template>
  <div class='panel'>
    <el-form v-if="type == 1" ref="phoneFormRef" :rules="phoneRules" :model="phoneForm">
      <el-form-item label="" prop="userName">
        <el-input v-model="phoneForm.userName" class="input" maxlength="11" @input="userNameInput"
          placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="verCode">
        <div class="flex-center flex_item">
          <el-input v-model="phoneForm.verCode" class="input" placeholder="请输入图形验证码"></el-input>
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
          <el-input v-model="phoneForm.smsCode" class="input" placeholder="请输入验证码"></el-input>
          <div v-if="!isWait" @click="sendMsg" class="msgBtn">获取验证码</div>
          <div v-if="isWait" class="msgBtn timer">{{ countDownVal }}s</div>
        </div>
      </el-form-item>
      <el-button @click="submitForm('phoneForm')" type="primary" class="loginBtn">下一步</el-button>
    </el-form>
    <el-form v-if="type == 2" ref="passFormRef" :rules="passRules" :model="passForm">
      <p class="tip">密码重置</p>
      <el-form-item label="" prop="newPassword">
        <el-input show-password class="input" v-model="passForm.newPassword" placeholder="请输6-16位密码，包含数字和字母"
          @keyup="verify('newPassword')"></el-input>
      </el-form-item>
      <el-form-item label="" prop="confirmPassword">
        <el-input show-password class="input" v-model="passForm.confirmPassword" placeholder="再次输入确认新密码"
          @keyup="verify('confirmPassword')"></el-input>
      </el-form-item>
      <el-button @click="submitForm('passForm')" type="primary" class="loginBtn">完成</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getSmsCode, getCodeUrl, checkSmsLogin } from '@/api/login'
import { setPwd } from "@/api/user";
import { ElMessage } from 'element-plus';

const emit = defineEmits(["toLogin"]);

const phoneFormRef = ref()
const passFormRef = ref()

const verCode = ref('')
const isWait = ref(false)
const countDownVal = ref(60)
const codeUrl = ref('') as any
const isShowVerCode = ref(false)
const type = ref(1)
const phoneForm = reactive({
  userName: "",
  smsCode: "",
  verCode: "",
})
const phoneRules = reactive({
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
const passForm = reactive({
  oldPassword: '',
  newPassword: "",
  confirmPassword: "",
}) as any
const passRules = reactive({
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" },
  {  //插入正则验证：大小写、数字、至少8位、不常用字符p
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
    message: "密码应当8-16位且含有数字、大小写字母",
    trigger: "blur"
  },],
  confirmPassword: [{ required: true, message: "请再次输入新密码", trigger: "blur" },
  {  //插入正则验证：大小写、数字、至少8位、不常用字符
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
    message: "密码应当8-16位且含有数字、大小写字母",
    trigger: "blur"
  },],
})

const refreshCodeUrl = () => {
  codeUrl.value = getCodeUrl(phoneForm.userName)
}
const userNameInput = (val: string) => {
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
      verCode.value = ''
      countDownVal.value = 60
      isWait.value = false
    }
    countDownVal.value = countDownVal.value - 1
  }, 1000)
}
//发送短信
const sendMsg = () => {
  let param = {
    "userName": phoneForm.userName,
    "verCode": phoneForm.verCode,
    "type": 3002
  }
  getSmsCode(param).then(() => {
    ElMessage.success('发送成功')
    countDownStart()
  }).catch(err => {
    ElMessage(err.message)
  })
}
const submitForm = (formName: string) => {
  if (formName == 'phoneForm') {
    phoneFormRef.value.validate((valid: any) => {
      if (valid) {
        checkCode()
      }
    })
  } else if (formName == 'passForm') {
    passFormRef.value.validate((valid: any) => {
      if (valid) {
        setPasswrod()
      }
    })
  } else {
    return false
  }
}
// 验证短信
const checkCode = () => {
  checkSmsLogin({
    userName: phoneForm.userName,
    smsCode: phoneForm.smsCode
  }).then(() => {
    type.value = 2
  })
}
//设置密码
const verify = (val: string) => {
  // 禁止输入文字&空格符
  passForm[val] = passForm[val].replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|\s/g, '')
}
const setPasswrod = () => {
  let data = passForm
  data.userName = phoneForm.userName
  data.smsCode = 'restpwd'
  setPwd(data).then(() => {
    ElMessage.success('密码设置成功,请重新登录')
    localStorage.clear()
    emit('toLogin')
  })
}
refreshCodeUrl()
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
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  color: #3D3D3D;
  text-align: left;
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
  background: linear-gradient(270deg, #394CCE 0%, #A7AFEE 100%);
  border: 0;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  color: #FEEDED;
  text-align: center;
  line-height: 40px;
}

.timer {
  color: var(--brand-6);
  ;
}

.theme-color {
  color: #704FFF;
}

.passname {
  font-size: 12px;
  color: #3D3D3D;
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

.agreement {
  font-size: 12px;
  text-align: center;
  color: #8C8D93;
  margin-left: 10px;

  span {
    cursor: pointer;

    &:hover {
      background: linear-gradient(270deg, var(--pink-7) 0%, var(--yellow-2) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>