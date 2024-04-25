<template>
  <section class="section" v-loading="isloading">
    <div class="title">
      Account Rankings
      <div class="sort">
        <el-select v-model="sortValue" placeholder="Sort by" size="small">
          <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in listData">
        <div class="user">
          <div class="rank">{{ index + 1 }}</div>
          <div class="info">
            <!-- <img class="avatar" src="@/assets/images/user/user.jpg" /> -->
            <img class="avatar" :src="`/avatar-api/${item.secUid}/avatar.jpg`" />
            <p>{{ item.nickname }}</p>
          </div>
        </div>
        <div class="datas">
          <div class="col">
            <div class="itm following" @click="openFollowing(item)">
              {{ item.followingCountStr }}
              <p class="desp">Following</p>
            </div>
            <div class="itm">
              {{ item.followerCountStr }}
              <p class="desp">Follower</p>
            </div>
          </div>
          <div class="col">
            <div class="itm">
              {{ item.heartCountStr }}
              <p class="desp">Likes</p>
            </div>
            <div class="itm">
              {{ item.videoCountStr }}
              <p class="desp">Posts</p>
            </div>
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
        :current-page="currentPage"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-drawer v-model="dialogVisible" title="" size="400">
      <img @click="dialogVisible = false" class="back" src="@/assets/images/back.png" />
      <FollowingList class="following" :user="userItem" />
    </el-drawer>
  </section>
</template>

<script setup>
  import FollowingList from './FollowingList.vue'
  import { getOverview } from '@/api/demo'

  const props = defineProps({
    country: {
      type: String,
      default: 'US'
    }
  })

  const options = ref([
    {
      value: 'follower',
      label: 'sort by Follower'
    },
    {
      value: 'heart',
      label: 'sort by Likes'
    },
    {
      value: 'video',
      label: 'sort by Posts'
    }
  ])
  const sortValue = ref('follower')

  const isloading = ref(true)
  onMounted(() => {
    listLoad()
  })

  const total = ref(0)
  const listData = ref([])
  const currentPage = ref(1)
  const pageSize = ref(10)

  const listLoad = () => {
    let param = {
      region: props.country,
      type: sortValue.value,
      page: currentPage.value - 1,
      size: pageSize.value,
      nickname: ''
    }
    isloading.value = true
    getOverview(param)
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

  watch(sortValue, () => {
    currentPage.value = 1
    total.value = 0
    listLoad()
  })

  watch(
    () => props.country,
    () => {
      currentPage.value = 1
      total.value = 0
      listLoad()
    }
  )

  let userItem = ref({})
  let dialogVisible = ref(false)
  const openFollowing = (item) => {
    userItem.value = item
    dialogVisible.value = true
  }
</script>

<style scoped lang="scss">
  .following {
    cursor: pointer;
    p {
      text-decoration: underline;
    }
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
  .section {
    border-radius: 10px;
    .title {
      padding: 0 20px;
      background: #000;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sort {
        width: 120px;
      }
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
        &:nth-child(2n) {
          background: #4a5968;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        .user {
          width: 150px;
          display: flex;

          .rank {
            width: 30px;
            line-height: 5;
            text-align: center;
          }
          .info {
            width: 100%;
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
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
          .col {
            display: flex;
            .itm {
              text-align: center;
              flex: 1;
              margin-bottom: 10px;
              .desp {
                color: #eee;
              }
            }
          }
          .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  ::-webkit-scrollbar-thumb {
    background: #999;
  }

  .back {
    position: absolute;
    top: 12px;
    left: 18px;
    z-index: 2001;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  ::v-deep .el-pagination.is-background .el-pager li.is-active {
    background: #4a5968 !important;
  }
</style>
