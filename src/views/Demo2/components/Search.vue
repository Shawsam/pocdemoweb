<template>
  <div class="search">
    <el-input v-model="name" placeholder="search account" @keydown.enter="search"></el-input>
    <img class="searchBtn" src="@/assets/images/search.png" @click="search" />
  </div>

  <el-drawer v-model="dialogVisible" title="" size="400">
    <img @click="back" class="back" src="@/assets/images/back.png" />
    <SearchResult class="following" :country="country" :nickname="nickname" />
  </el-drawer>
</template>

<script setup>
  import SearchResult from './SearchResult.vue'

  const props = defineProps({
    country: {
      type: String,
      default: 'US'
    }
  })

  const name = ref('')
  const nickname = ref('')
  const dialogVisible = ref(false)
  const search = () => {
    dialogVisible.value = true
    nickname.value = name.value
  }

  const back = () => {
    dialogVisible.value = false
    name.value = ''
  }
</script>

<style scoped lang="scss">
  .back {
    position: absolute;
    top: 12px;
    left: 18px;
    z-index: 2001;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  ::v-deep .el-drawer {
    background: none;
  }
  ::v-deep .el-drawer__body {
    padding: 0 !important;
  }

  ::v-deep .el-loading-mask {
    background-color: rgba(0, 0, 0, 0) !important; /* 这里的透明度可以根据需要调整 */
  }
  ::v-deep .el-input__inner {
    width: 280px;
  }
  .search {
    position: absolute;
    top: -50px;
    right: 30px;
    z-index: 100000;

    .searchBtn {
      height: 20px;
      width: 20px;
      position: absolute;
      right: 10px;
      top: 5px;
      cursor: pointer;
      &:active {
        transform: scale(1.05);
      }
    }
  }
</style>
