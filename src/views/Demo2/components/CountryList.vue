<template>
  <section class="section">
    <div class="title">Country</div>
    <div class="list">
      <div
        class="item"
        @click="countrySelect(index + (currentPage - 1) * pageSize)"
        :class="{ active: item.selected }"
        v-for="(item, index) in paginatedData"
      >
        <div class="user">
          <div class="rank">{{ index + 1 + (currentPage - 1) * pageSize }}</div>
          <div class="info">
            <p>{{ item.regionEnName ? item.regionEnName : item.region }}</p>
          </div>
        </div>
        <div class="datas">
          <div class="itm"><img class="icon" src="@/assets/images/user.png" />{{ formatNumber(item.userCount) }}</div>
          <div class="itm">
            <img class="icon" src="@/assets/images/video.png" />{{ formatNumber(item.videoSumCount) }}
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        small="true"
        layout="prev, pager, next"
        :pager-count="3"
        :total="list.length"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    },
    countryIndex: {
      type: String,
      default: 'US'
    }
  })

  const emits = defineEmits(['countrySelect'])

  const currentPage = ref(1)
  const pageSize = ref(10)

  // 计算分页后的数据
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return props.list.slice(start, end)
  })

  // 当前页改变时的处理函数
  function handleCurrentChange(newPage) {
    currentPage.value = newPage
  }

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function countrySelect(index) {
    emits('countrySelect', index)
  }

  watch(
    () => props.countryIndex,
    (newVal) => {
      currentPage.value = parseInt(newVal / 10) + 1
    }
  )
</script>

<style scoped lang="scss">
  /* 给 v-loading 添加一个透明度为0.5的背景色 */
  ::v-deep .el-loading-mask {
    background-color: rgba(0, 0, 0, 0) !important; /* 这里的透明度可以根据需要调整 */
  }
  .section {
    border-radius: 10px;
    .title {
      text-align: center;
      background: #000;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
    }
    .pagination {
      background: #000;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list {
      height: calc(100% - 100px);
      overflow-y: scroll;
      .item {
        cursor: pointer;
        &.active {
          border: 2px solid #92dded;
          box-sizing: border-box;
        }
        &:nth-child(2n) {
          background: #4a5968;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        .user {
          width: 180px;
          display: flex;
          align-items: center;
          .rank {
            width: 20px;
            text-align: center;
            line-height: 5;
          }
          .info {
            text-align: center;
            flex: 1;
            text-align: center;
          }
          .avatar {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          p {
            font-size: 16px;
            color: #fff;
          }
        }
        .datas {
          flex: 1;
          .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
          .itm {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  ::-webkit-scrollbar-thumb {
    background: #999;
  }

  ::v-deep .el-pagination.is-background .el-pager li.is-active {
    background: #4a5968 !important;
  }
</style>
