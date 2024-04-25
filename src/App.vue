<script setup>
  import { getTotalCount } from '@/api/demo'
  import { RouterView, useRoute } from 'vue-router'
  import AppHeader from './components/layout/AppHeader.vue'
  import AppFooter from './components/layout/AppFooter.vue'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import { account } from '@/stores/account'
  const accountStore = account()

  const locale = zhCn
  const route = useRoute()
  onMounted(() => {
    localStorage.setItem('hasShowPop', '0')
    document.body.style.setProperty('--el-color-primary', '#704FFF')
    accountStore.setTotalNum()
  })
</script>

<template>
  <el-config-provider :locale="locale">
    <template v-if="route.meta.isHideHeader">
      <div class="view">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" />
        </router-view>
      </div>
    </template>
    <template v-else>
      <AppHeader></AppHeader>
      <div class="webview">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" />
        </router-view>
      </div>
    </template>
  </el-config-provider>
</template>

<style lang="scss">
  #app {
    background: #213a53 !important;
    .container {
      min-height: 100vh;
      min-width: 1360px;
      box-sizing: border-box;
    }

    .view {
      min-height: calc(100vh);
      box-sizing: border-box;

      position: relative;
    }

    .webview {
      padding-top: 66px;
      min-height: calc(100vh - 66px);
      box-sizing: border-box;
      position: relative;

      // .el-breadcrumb {
      //   position: sticky;
      //   top: 66px;
      //   padding: 20px 20px 5px 20px;
      //   width: 1340px;
      // }

      // .bread-card {
      //   height: 50px;
      //   display: flex;
      //   align-items: center;
      //   margin-left: 10px;
      //   font-weight: bold;
      //   background-color: #FAFAFA;
      // }
    }
  }
</style>
