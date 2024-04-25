<template>
  <section class="section" v-loading="isloading">
    <div class="title">Search Result</div>
    <div class="list" v-if="listData.length">
      <div class="item" v-for="(item, index) in listData">
        <div class="user">
          <div class="info">
            <!-- <img class="avatar" src="@/assets/images/user/user.jpg" /> -->
            <!-- <img class="avatar" :src="`/avatar-api/${item.secUid}/avatar.jpg`" /> -->
            <p>{{ item.nickname }}</p>
          </div>
        </div>
        <div class="datas">
          <div class="col">
            <!-- <div class="itm followingP" @click="openFollowing(item)"> -->
            <div class="itm">
              {{ item.followingCount }}
              <p class="desp">Following</p>
            </div>
            <div class="itm">
              {{ item.followerCount }}
              <p class="desp">Follower</p>
            </div>
          </div>
          <div class="col">
            <div class="itm">
              {{ item.heartCount }}
              <p class="desp">Likes</p>
            </div>
            <div class="itm">
              {{ item.videoCount }}
              <p class="desp">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list empty" v-else>
      <el-empty description="Data waiting for update" :image-size="100" v-if="!isloading" />
    </div>
    <div class="pagination">
      <p class="p" @click="refresh"><img class="icon" src="@/assets/images/refresh.png" />refresh result</p>
    </div>

    <!-- <el-drawer v-model="dialogVisible" title="" size="400">
      <img @click="dialogVisible = false" class="back" src="@/assets/images/back.png" />
      <FollowingList class="following" :user="userItem" />
    </el-drawer> -->
  </section>
</template>

<script setup>
  import FollowingList from './FollowingList.vue'
  import { searchUser } from '@/api/demo'

  const props = defineProps({
    country: {
      type: String,
      default: 'US'
    },
    nickname: {
      type: String,
      default: ''
    }
  })

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
      nickname: props.nickname,
      page: currentPage.value - 1,
      size: pageSize.value
    }
    isloading.value = true
    searchUser(param)
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

  let userItem = ref({})
  let dialogVisible = ref(false)
  const openFollowing = (item) => {
    userItem.value = item
    dialogVisible.value = true
  }

  watch(
    () => props.nickname,
    (newVal) => {
      currentPage.value = 1
      listLoad()
    }
  )

  const refresh = () => {
    currentPage.value = 1
    listLoad()
  }
</script>

<style scoped lang="scss">
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
    color: #fff;
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
      cursor: pointer;

      .p {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon {
        display: inline-block;
        height: 15px;
        width: 15px;
        margin-right: 10px;
      }
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
</style>
