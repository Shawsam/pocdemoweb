<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable-next-line vue/multi-word-component-names -->
<template>
  <div class="wrapper">
    <div class='box'>
      <div class="tabs">
        <span class="item" :class="{ 'active': !msgLogin && !passShow }"
          @click="passShow ? showLogin() : switchType(1)">账号密码登录</span>
        <span class="item" :class="{ 'active': msgLogin }" v-if="!passShow" @click="switchType(0)">手机验证登录</span>
        <span class="item" :class="{ 'active': passShow }" v-if="passShow" @click="passShow = true">忘记密码</span>
      </div>
      <msg-pwd v-if="passShow" @toLogin="toLogin"></msg-pwd>
      <msg-login v-if="msgLogin" :isInvite="isInvite"></msg-login>
      <account-login :env="env" v-if="!msgLogin && !passShow" @pwd="passShow = true"></account-login>
      <!-- <div class="wxLogin">
        <div class="wxLogin-box" @click="showWxLogin(true)">
          <img src="@/assets/images/user/wx.png" alt="" width="30">
          微信登录
        </div>
      </div> -->
    </div>
  </div>
  <el-dialog title="微信登录" v-model="showWx" width="360px" center top="23vh">
    <el-input size="large" v-model="openId" autocomplete="off" placeholder="请输入openId" show-word-limit maxlength="20"
      @keyup.enter="wxLogin"></el-input>

    <div class="dialog-footer flex-center mt20">
      <el-button type="default" size="large" @click="showWxLogin(false)" class="cancelBtn">取消</el-button>
      <el-button type="primary" size="large" @click="wxLogin" class="confirmBtn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import AccountLogin from './components/AccountLogin.vue'
import MsgPwd from './components/MsgPwd.vue'
import MsgLogin from './components/MsgLogin.vue'
import { ElMessage } from 'element-plus'
import { getWxUserInfo, getUserImg } from '@/api/user'
import { user } from '@/stores/user'
import { storeToRefs } from 'pinia'
const userStore = user()
const { token } = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()

const isInvite = ref(route.query.invite || '')
// const env = ref(location.hostname.startsWith('t-') || location.hostname.startsWith('localhost'))

const msgLogin = ref(isInvite.value ? true : false)
const passShow = ref(false)
const switchType = (index) => {
  msgLogin.value = index == 0 ? true : false
}
const toLogin = () => {
  passShow.value = false
  msgLogin.value = true
}
const showLogin = () => {
  passShow.value = false
  msgLogin.value = false
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

const openId = ref('')
const showWx = ref(false)
const showWxLogin = (flag) => {
  showWx.value = flag
}
const wxLogin = async () => {
  router.go(-1)
  ElMessage.success('登录成功')
  const data = {
    openId: openId.value,
    wechatUId: Math.random(),
    nickname: "1",
    avatar: "http",
    type: 2003
  }
  await getWxUserInfo(data).then((res) => {
    localStorage.setItem('token', res?.token)
    userStore.setToken(res?.token)
    userStore.setUserInfo()
    loadUserImg()
    localStorage.setItem('hasShowPop', '0')
  })
}
</script>
<style scoped lang='scss'>
.wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - 85px);
  background-image: url('@/assets/images/login/background.png');
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: cover;

  .box {
    position: absolute;
    left: 75%;
    top: 40%;
    padding: 48px 62px;
    width: 436px;
    height: auto;
    border-radius: 10px;
    background-image: url('@/assets/images/login/loginBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transform: translate(-50%, -50%);

    .title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
      color: #704FFF;
    }

    .tabs {
      padding: 10px 0;
      margin-bottom: 15px;
      text-align: center;

      span {
        cursor: pointer;
        display: inline-block;
        padding: 0 10px;
        font-size: 18px;
        font-weight: 600;
        color: #C4B6FF;

        &.active {
          color: #704FFF;

          &::after {
            content: '';
            display: block;
            margin: 0 auto;
            width: 32px;
            height: 5px;
            background: #704FFF;
            border-radius: 4px;
          }
        }
      }
    }

    .wxLogin {
      margin-top: 10px;
      display: flex;
      justify-content: center;

      .wxLogin-box {
        cursor: pointer;
        display: flex;
        align-items: center;
        width: fit-content;
        font-size: 12px;
        color: #8F8F8F;

        img {
          margin-right: 5px;
        }
      }
    }

    .tip {
      font-size: 12px;
      text-align: center;
      margin-bottom: 20px;
      color: #8C8D93;
    }

    .codeImg,
    .msgBtn {
      width: 100%;
      height: 40px;
    }

    .loginBtn {
      display: inline-block;
      width: 100%;
    }
  }
}

@media screen and (max-width: 1500px) {
  .box {
    padding: 24px 45px !important;
    width: 100% !important;
    max-width: 400px;
  }
}

@media screen and (max-width: 1300px) {
  .box {
    padding: 24px 45px !important;
    width: 100% !important;
  }
}

@media screen and (max-width: 750px) {
  .box {
    left: 0% !important;
    transform: translate(0%, -50%) !important;
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

.mt20 {
  margin-top: 20px;
}
</style>