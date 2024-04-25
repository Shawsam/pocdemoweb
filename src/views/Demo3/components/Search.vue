<template>
  <div class="search">
    <el-input v-model="keyword" placeholder="search" @keydown.enter="search"></el-input>
    <img class="searchBtn" src="@/assets/images/search.png" @click="search" />
  </div>
</template>

<script setup>
  const emits = defineEmits(['searchConfirm'])
  const keyword = ref('')
  const search = () => {
    emits('searchConfirm', keyword.value)
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
