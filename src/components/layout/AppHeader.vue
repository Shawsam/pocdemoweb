<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div class="header replace-icon">
    <div class="wrap">
      <!-- logo区域 -->
      <RouterLink to="/">
        <div class="logo_title">
          <img class="logo" src="@/assets/images/logo.png" alt="" />
        </div>
      </RouterLink>

      <div class="main">
        <!-- 菜单栏 -->
        <nav class="menu-list">
          <div class="menuBox" v-for="v in routerList" :key="v.path">
            <RouterLink class="item" :class="{ 'link-active': v.group == group }" :to="v.path">
              {{ v.name }}
              <!-- <img v-if="v.img" class="h-icon" :src="v.img" alt="" width="14" height="14"> -->
            </RouterLink>
            <div class="menu" v-if="v.children">
              <div
                class="menu-item"
                v-for="v2 in v.children"
                :key="v2.path"
                :class="{ 'active-item': routerPath == v2.path }"
                @click="goMenu(v2.path)"
              >
                {{ v2.name }}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <!-- <el-popover v-if="token" placement="bottom" :width="250" trigger="hover" :teleported="false">
        <template #reference>
          <div class="right">
            <div class="name" @click="router.push({ name: 'User' })">
              <img :src="userImg || defaultImg" alt="" width="50" height="50" :onerror="nofind" />
            </div>
          </div>
        </template>
        <div class="userMenu">
          <div class="borB userMenu-vip">
            <div
              class="userMenu-vip-bgBox"
              :class="[`userMenu-vip-bgBox${userInfo.level}`]"
              @click="router.push({ name: 'User' })"
            >
              <img
                :src="userImg || defaultImg"
                alt=""
                width="60"
                height="60"
                :onerror="nofind"
                style="border-radius: 50%"
              />
              <div class="flex_item ml10">
                <div class="userMenu-vip-name text-ellipsis">{{ userInfo?.nickname || '--' }}</div>
                <span class="userMenu-vip-text" v-if="userInfo.level == 3001">
                  <img src="@/assets/images/user/vip3001.png" alt="" />
                </span>
                <span class="userMenu-vip-text" v-else-if="userInfo.level == 3002">
                  <img src="@/assets/images/user/vip3002.png" alt="" />
                </span>
                <span class="userMenu-vip-text" v-else-if="userInfo.level == 3003">
                  <img src="@/assets/images/user/vip3003.png" alt="" />
                </span>
                <span class="userMenu-vip-text" v-else-if="userInfo.level == 3004">
                  <img src="@/assets/images/user/vip3004.png" alt="" />
                </span>
                <span class="userMenu-vip-text" v-else>
                  <img src="@/assets/images/user/vip0.png" alt="" />
                </span>
              </div>
            </div>
            <div class="flex-between">
              <div class="userMenu-vip-time" v-if="userInfo?.type == 1002 && userInfo?.level != 0">
                {{ userInfo?.authEndTime ? transDateYMD(userInfo?.authEndTime) + '到期' : '--' }}
              </div>
              <div class="userMenu-vip-time" v-else>当前为{{ userInfo?.userLevelName || '普通会员' }}</div>
              <div
                class="userMenu-vip-rt"
                :class="[`userMenu-vip-rt${userInfo.level}`]"
                @click="router.push({ name: 'Buy', query: { level: userInfo.level } })"
              >
                购买/续费
              </div>
            </div>
          </div>
          <div class="flex-between router-item" @click="logOut">
            <div class="flex-between">
              <el-icon>
                <Back />
              </el-icon>
              <span>退出登录</span>
            </div>
            <div>
              <el-icon>
                <Right />
              </el-icon>
            </div>
          </div>
        </div>
      </el-popover> -->
      <!-- 登录用户区域 -->
      <!-- <div v-else class="loginBtn" @click="router.push({ name: 'Login' })">登录/注册</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getUserImg } from '@/api/user'
  import defaultImg from '@/assets/images/user/user.jpg'
  import { Right, Back } from '@element-plus/icons-vue'
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { transDateYMD } from '@/utils/common'
  import { ElMessage } from 'element-plus'
  import { user } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  const userStore = user()
  // userInfo
  const { userInfo, token, userImg } = storeToRefs(userStore)

  const router = useRouter()
  const route = useRoute()
  const routerPath = ref('')
  const routerList = ref([
    {
      path: '/Case1',
      name: 'CASE1',
      group: 'Case1'
    },
    {
      path: '/Case2',
      name: 'CASE2 ',
      group: 'Case2'
    },
    {
      path: '/Case3',
      name: 'CASE3 ',
      group: 'Case3'
    }
  ])

  const login = () => {
    if (localStorage.getItem('token')) {
      router.push({ name: 'User' })
    } else {
      router.push({ name: 'Login' })
    }
  }

  const logOut = () => {
    localStorage.clear()
    // if (route.path.startsWith('/user')) {
    router.push('/login')
    // }
    userStore.setToken(localStorage.getItem('token'))
    ElMessage({ offset: -20, duration: 1500, type: 'success', message: '退出成功' })
  }

  const nofind = (event: any) => {
    var img = event.srcElement
    img.src = defaultImg
    if (!defaultImg) {
      img.onerror = null
    }
  }

  const goMenu = (e) => {
    routerPath.value = e
    router.push(e)
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

  onMounted(() => {
    if (token.value) {
      userStore.setUserInfo()
      loadUserImg()
    }
  })

  const group = ref()
  watch(
    () => route.path,
    (path) => {
      group.value = route.meta.group
      routerPath.value = path
    },
    { immediate: true, deep: true }
  )
</script>
<style lang="scss">
  .elMessage {
    background: #fff !important;
    border-color: #ececec !important;
    color: #000000 !important;

    .el-message__content {
      color: #000000 !important;
    }

    .el-message-icon--success {
      color: #000000 !important;
      width: 25px;
      height: 25px;
      font-size: 25px;
    }
  }
</style>
<style scoped lang="scss">
  .wrap {
    display: flex;
    width: 100%;
  }

  .header {
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    background: #000;
    // background-image: url('@/assets/images/theme/banner.png');
    background-repeat: repeat-x;
    background-size: 100% 100%;
    color: #000;
    display: flex;
    min-width: 1360px;
    // border-bottom: 1px solid #e8e8e8;

    .logo_title {
      display: flex;
      padding: 0 60px;
      height: 66px;
      align-items: center;

      .logo {
        height: 35px;
        // width: 160px;
      }
    }

    .main {
      display: flex;
      align-items: center;
      flex: 1;
      box-sizing: border-box;
      justify-content: space-between;

      .menuBox {
        &:hover {
          .menu {
            display: block;
          }
        }
      }

      // 菜单栏
      .menu-list {
        display: flex;
        // width: 800px;
        position: relative;

        .item {
          display: inline-block;
          height: 56px;
          line-height: 56px;
          width: 180px;
          text-align: center;
          color: #fff;
          position: relative;
          padding-right: 14px;
          font-size: 16px;

          &:first-child {
            padding-right: 0;

            &:hover::after,
            &.router-link-active::after {
              left: 30% !important;
            }
          }

          .h-icon {
            position: absolute;
            top: 12px;
            right: 40px;
          }
        }

        .item.link-active {
          font-size: 16px;
          color: #00ffffb3;
          font-weight: 600;

          // &::after {
          //   content: '';
          //   display: block;
          //   width: 40%;
          //   left: 30%;
          //   height: 2px;
          //   background: #cbc4fc;
          //   // background: linear-gradient(180deg, #004B98 0%, #D2DEFF 100%);
          //   margin: auto;
          //   border-radius: 10px;
          //   position: absolute;
          //   bottom: 8px;
          // }
        }

        .item:hover {
          // background-color: #e1ecfd;
          // font-weight: bold;
        }

        .item:hover::after {
          // content: '';
          // display: block;
          // width: 40%;
          // left: 25%;
          // height: 2px;
          // background: #444;
          // // background: linear-gradient(90deg, #5df0f6 0%, #5e67f8 100%);
          // margin: auto;
          // border-radius: 10px;
          // position: absolute;
          // bottom: 8px;
        }

        .menu {
          display: none;
          z-index: 8888;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 142px;
          line-height: 46px;
          background-color: #fff;
          text-align: center;
          color: #000;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

          .menu-item {
            cursor: pointer;
            font-size: 15px;
          }

          .menu-item:hover {
            color: #000;
            font-weight: bold;
          }

          .active-item {
            background-color: #cbc4fc;
            color: #fff !important;
          }
        }
      }

      .loginBtn {
        cursor: pointer;
        margin: 10px 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 125px;
        height: 34px;
        background: linear-gradient(90deg, #234a5d 0%, #436474 100%);
        border-radius: 22px;
        color: #fff;
        font-size: 16px;
      }
    }

    .right {
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: -10px;
      padding: 10px;

      .name {
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;

        .icon {
          height: 20px;
          width: 20px;
          margin-right: 10px;
        }
      }
    }

    .userMenu {
      .userMenu-info {
        cursor: pointer;
        font-size: 16px;
        padding-bottom: 10px;

        img {
          border-radius: 50%;
        }
      }

      .userMenu-vip {
        padding: 10px 0;

        .userMenu-vip-bgBox {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0 10px;
          margin-bottom: 12px;
          height: 74px;
          border-radius: 4px;
          background: linear-gradient(180deg, #c6c6c6 0%, #f1f1f1 100%);
          background-size: 100% 100%;

          .userMenu-vip-name {
            max-width: 120px;
            margin-bottom: 5px;
            color: #515151;
            font-size: 14px;
          }

          .userMenu-vip-text {
            img {
              height: 15px;
            }
          }
        }

        .userMenu-vip-bgBox3001 {
          background: linear-gradient(180deg, #c7baff 0%, #f7f5ff 100%);
        }

        .userMenu-vip-bgBox3002 {
          background: linear-gradient(180deg, #ffeab3 0%, #fff9e8 100%);
        }

        .userMenu-vip-bgBox3003 {
          background: linear-gradient(180deg, #838fff 0%, #dee1ff 100%);
        }

        .userMenu-vip-bgBox3004 {
          background: linear-gradient(180deg, #818181 0%, #fffae9 100%);
        }

        .userMenu-vip-rt {
          cursor: pointer;
          padding: 5px 15px;
          border-radius: 30px;
          font-size: 13px;
          color: #f6b200;
          border: 2px solid #f6b200;
        }

        // .userMenu-vip-rt0 {
        //   color: #5D89FF;
        //   border: 2px solid #D9E3FF;
        // }

        // .userMenu-vip-rt3001 {
        //   color: #704FFF;
        //   border: 2px solid #CBBFFF;
        // }

        // .userMenu-vip-rt3002 {
        //   color: #FF4C00;
        //   border: 2px solid #FFB08E;
        // }

        // .userMenu-vip-rt3003 {
        //   color: #42C8C8;
        //   border: 2px solid #59EDED;
        // }

        // .userMenu-vip-rt3004 {
        //   color: #FFC40F;
        //   border: 2px solid #FFE5A1;
        // }

        .userMenu-vip-time {
          font-size: 12px;
        }
      }

      .router-item {
        cursor: pointer;
        padding: 15px 0;

        span {
          margin-left: 10px;
          font-size: 15px;
        }

        &:hover {
          span {
            color: #704fff;
          }
        }
      }
    }

    .loginBtn {
      cursor: pointer;
      margin: 15px 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 34px;
      background: linear-gradient(270deg, #4365ff 0%, #ae08ff 100%);
      border-radius: 22px;
      color: #fff;
      font-size: 16px;
    }
  }

  .borB {
    border-bottom: 1px solid #f2f3f5;
  }
</style>
