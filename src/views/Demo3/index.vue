<template>
  <div class="wrapper">
    <Search @searchConfirm="searchConfirm" />
    <div class="main">
      <Map class="map" v-if="countryData.length" :data="countryData" @itemSelect="itemSelect" />
      <div class="map" v-else></div>
      <div class="info">
        <List class="list" :account="account" />
        <div class="inf">
          <Keyword class="keyword" :word="word" :account="account" />
          <KeywordPop class="keywordPop" :word="word" :account="account" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Search from './components/Search.vue'
  import Keyword from './components/Keyword.vue'
  import KeywordPop from './components/KeywordPop.vue'
  import List from './components/List.vue'
  import Map from './components/Map.vue'
  import { getRegionData } from '@/api/demo'

  const countryData = ref([])
  onMounted(() => {
    getRegionData().then((res) => {
      res.list[0].selected = true
      countryData.value = res.list
    })
  })

  const word = ref('makeup')
  const searchConfirm = (val) => {
    word.value = val
  }

  const account = ref('jsjj.hshsq')
  const itemSelect = (val) => {
    account.value = val
  }
</script>

<style scoped lang="scss">
  ::v-deep .el-drawer__body {
    padding: 0 !important;
  }
  ::v-deep .el-drawer {
    background: none;
  }
  .wrapper {
    margin: 0 auto;
    // background: url('@/assets/images/space.jpg') 100% 100% fixed;
    padding: 30px;
  }
  .main {
    color: #fff;
    display: flex;
    height: calc(100vh - 126px);
    .map {
      width: 51%;
      margin-right: 20px;
    }
    .info {
      width: 49%;
      display: flex;
      .list {
        width: 50%;
        background: #728292;
        border-radius: 10px;
        margin-right: 20px;
      }
      .inf {
        width: 50%;
        border-radius: 10px;
        .keyword {
          margin-bottom: 20px;
          height: calc(40% - 20px);
        }
        .keywordPop {
          height: 60%;
        }
      }
    }
  }
</style>
