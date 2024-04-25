<template>
  <div class="wrapper">
    <Search :country="theCountry" />
    <div class="main">
      <Map class="map" v-if="countryData.length" :data="countryData" @countrySelect="countrySelect" />
      <div class="map" v-else></div>
      <div class="info">
        <CountryList
          class="country"
          :countryIndex="theCountryIndex"
          :list="countryData"
          @countrySelect="countrySelect"
          v-loading="!countryData.length"
        />
        <AccountList class="account" :country="theCountry" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Search from './components/Search.vue'
  import AccountList from './components/AccountList.vue'
  import CountryList from './components/CountryList.vue'
  import Map from './components/Map.vue'
  import { getRegionData, getOverview } from '@/api/demo'

  const countryData = ref([])
  const theCountry = ref('')
  const theCountryIndex = ref(0)
  onMounted(() => {
    getRegionData().then((res) => {
      res.list[0].selected = true
      countryData.value = res.list
      theCountry.value = res.list[0].name
    })
  })

  const countrySelect = (index) => {
    theCountryIndex.value = index
    countryData.value.forEach((item) => {
      item.selected = false
    })
    countryData.value[index].selected = true
    theCountry.value = countryData.value[index].region
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
      .country {
        width: 50%;
        background: #728292;
        border-radius: 10px;
        margin-right: 20px;
      }
      .account {
        width: 50%;
        background: #728292;
        border-radius: 10px;
      }
    }
  }
</style>
