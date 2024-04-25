<template>
  <div class="videos-left-box">
    <div class="title-box">Videos</div>
    <div class="video-list">
      <div class="video-item" v-for="(item, index) in list" :key="index">
        <a class="videoImg" :href="item?.share_url" target="_blank" rel="noreferrer">
          <img class="imgs" :src="'data:image/png;base64,' + item.video_cover_base64" />
          <img class="play-icon" src="@/assets/images/play-icon.png" />
        </a>
        <div class="hot-title multiple-ellipsis">
          {{ item.desc }}
        </div>
      </div>
    </div>
    <!-- <div class="pagination flex-center">
      <el-pagination layout="prev, pager, next" :total="30" @current-change="currentChange" />
    </div> -->
  </div>
</template>

<script setup>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps(['list'])
  // const currentChange = (curPage) => {
  //   console.log('currentChange', curPage)
  //   emit('curPageChange', curPage)
  // }
</script>

<style scoped lang="scss">
  .videos-left-box {
    width: 20%;
    height: calc(100vh - 204px);
    background: #525e6a;
    border-radius: 10px;
    box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
    overflow: hidden;
    position: relative;
    z-index: 10;
    .title-box {
      height: 42px;
      line-height: 42px;
      background: #3a424a;
      text-align: center;
      font-size: 16px;
      border-radius: 10px;
    }
    .video-list {
      margin-top: 20px;
      margin-bottom: 10px;
      height: calc(100% - 82px);
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      .video-item {
        width: 50%;
        padding: 0 20px;
        border-radius: 10px;
        margin: 5px 0;
        .videoImg {
          background: #4c5e6f;
          width: 100%;
          min-height: 120px;
          height: calc(30vh - 142px);
          border-radius: 10px;
          box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          display: block;
          position: relative;
          .imgs {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .play-icon {
            width: 40px;
            height: 40px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -20px;
            margin-left: -20px;
            z-index: 1;
          }
        }
        .hot-title {
          font-size: 13px;
          padding-top: 10px;
        }
      }
    }
  }
  :deep(.el-pagination) {
    background: #525e6a;
    .el-pager li {
      background: #525e6a;
      color: #fff;
      min-width: 30px;
      height: 30px;
      line-height: 30px;
      margin: 0 4px;
    }
    .el-pager li.is-active {
      background: #525e6a;
      border: 1px solid #7b9fb5;
      color: #7b9fb5;
      font-weight: 500;
    }
    button {
      background-color: #525e6a;
      color: #fff;
    }
    .btn-next .el-icon,
    .btn-prev .el-icon {
      font-size: 14px;
    }
    button.is-disabled,
    button:disabled {
      background-color: #525e6a;
      color: #999;
    }
  }
</style>
