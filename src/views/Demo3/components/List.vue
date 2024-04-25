<template>
  <section class="section" v-loading="isloading">
    <div class="title">
      <el-select
        v-model="type"
        placeholder="Select"
        style="background: #000; width: 100px; border: none; text-align: center"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="list" v-if="type == 'Ads' && listData.length">
      <div class="item" v-for="(item, index) in listData">
        <div class="left">
          <a class="posterCon" :href="item.data.video.web_play_addr" target="_blank">
            <img class="poster" :src="item.data.video.cover" :onerror="nofind" v-lazy />
            <img class="icon" src="@/assets/images/play-btn.png" />
          </a>
          <!-- <p>Commision Paid</p> -->
        </div>

        <div class="info">
          <p class="line3">Title: {{ item.data.video.title }}</p>
          <p>Nickname: {{ item.data.blogger_info.nickname }}</p>
          <p>Time: {{ moment(item.data.video.create_time * 1000).format('YYYY-MM-DD') }}</p>
        </div>
      </div>
    </div>
    <div class="list" v-if="type == 'Lives' && listData.length">
      <div class="item" v-for="(item, index) in listData">
        <div class="left">
          <a class="posterCon" :href="item.data.room_play_link.FULL_HD1" target="_blank">
            <img class="poster" :src="item.data.live_cover" />
            <img class="icon" src="@/assets/images/play-btn.png" />
          </a>
          <!-- <p>Commision Paid</p> -->
        </div>

        <div class="info">
          <p class="line3">Title: {{ item.data.live_title }}</p>
          <p>Nickname: {{ item.data.blogger_info.nickname }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="list empty" v-else>
      <el-empty description="Data waiting for update" :image-size="100" v-if="!isloading" />
    </div> -->
    <!-- <div class="pagination">
      <el-pagination
        background
        small="true"
        layout="prev, pager, next"
        :pager-count="3"
        :current-page="currentPage"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </section>
</template>

<script setup>
  import moment from 'moment'
  import { ref, onMounted } from 'vue'
  import { getFollowing } from '@/api/demo'
  import * as json from '@/utils/mock.json'
  import defaultImg from '@/assets/images/load.png'

  const props = defineProps({
    account: {
      type: String,
      default: 'jsjj.hshsq'
    }
  })

  const options = [
    {
      value: 'Ads',
      label: 'Ads'
    },
    {
      value: 'Lives',
      label: 'Lives'
    }
  ]
  const type = ref('Ads')

  const isloading = ref(true)
  onMounted(() => {
    let { ad, live } = json.default[props.account]
    listData.value = ad
    isloading.value = false
  })

  watch(
    () => props.account,
    (newVal) => {
      isloading.value = true
      let { ad, live } = json.default[props.account]
      if (type.value === 'Ads') {
        listData.value = ad
      } else if (type.value === 'Lives') {
        listData.value = live
      }
      isloading.value = false
    }
  )

  watch(
    () => type.value,
    (newVal) => {
      isloading.value = true
      let { ad, live } = json.default[props.account]
      if (newVal === 'Ads') {
        listData.value = ad
      } else if (newVal === 'Lives') {
        listData.value = live
      }
      isloading.value = false
    }
  )

  const total = ref(0)
  const listData = ref([])
  const currentPage = ref(1)
  const pageSize = ref(10)

  const listLoad = () => {
    let param = {
      id: '5831967',
      page: currentPage.value - 1,
      size: pageSize.value
    }
    isloading.value = true
    getFollowing(param)
      .then((res) => {
        isloading.value = false
        listData.value = res.list
        total.value = res.size
      })
      .catch((err) => {
        isloading.value = false
      })
  }

  const handleCurrentChange = (newPage) => {
    currentPage.value = newPage
    listLoad()
  }

  const nofind = (event) => {
    var img = event.srcElement
    img.src = defaultImg
    if (!defaultImg) {
      img.onerror = null
    }
  }
</script>

<style scoped lang="scss">
  .line3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  ::v-deep .el-select__wrapper.is-focused {
    border: none !important;
    box-shadow: none !important;
  }
  ::v-deep .el-select .el-input.is-focus .el-input__inner {
    border: none !important;
    text-align: center;
  }
  ::v-deep .el-select__wrapper {
    background: #000;
    border: none !important;
    box-shadow: none !important;
    color: #fff;
    text-align: center;
  }
  ::v-deep .el-select__placeholder {
    color: #fff !important;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .followingP {
    cursor: pointer;
    p {
      text-decoration: underline;
    }
  }
  ::v-deep .el-loading-mask {
    background-color: rgba(0, 0, 0, 0) !important; /* 这里的透明度可以根据需要调整 */
  }
  .section {
    height: 100%;
    background: #000;
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
      // height: calc(100% - 100px);
      height: calc(100% - 50px);
      overflow-y: scroll;
      .item {
        &:nth-child(2n) {
          background: #4a5968;
        }
        display: flex;
        align-items: center;
        padding: 10px;
        .left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-right: 30px;
          .posterCon {
            position: relative;
            height: 100px;
            width: 80px;
            .poster {
              height: 100%;
              width: 100%;
            }
            .icon {
              display: inline-block;
              height: 40px;
              width: 40px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
        .info {
        }
      }
    }
  }
  ::-webkit-scrollbar-thumb {
    background: #999;
  }
</style>
