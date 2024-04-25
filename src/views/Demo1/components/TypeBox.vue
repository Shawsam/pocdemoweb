<template>
  <div class="type-box">
    <div class="title-box">Tyрe</div>
    <div class="type-cate">
      <div class="flex-col-center cate-item" :class="{ active: item == 2 }" v-for="item in 4">
        <div class="cate-img">
          <img src="" />
        </div>
        <div class="cate-text multiple-ellipsis">username</div>
        <div class="sub-text">12.8%<br />（9999）</div>
      </div>
    </div>
    <div class="video-list">
      <div class="video-item" v-for="item in 12">
        <div class="videoImg">
          <img src="" />
          <img class="play-icon" src="@/assets/images/play-icon.png" />
        </div>
        <div class="hot-title multiple-ellipsis">五秒就上瘾，这部短剧大家都在看，真的好精彩！</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
  .type-box {
    width: 26%;
    height: 100%;
    background: #5f6c7a;
    border-radius: 10px;
    box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
    height: calc(100vh - 494px);
    color: #fff;
    .title-box {
      height: 42px;
      line-height: 42px;
      background: #3a424a;
      text-align: center;
      font-size: 16px;
      color: #fff;
      border-radius: 10px;
    }
    .type-cate {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .cate-item {
        margin: 10px 3px;
        font-size: 12px;
        width: 55px;
        .cate-img {
          width: 40px;
          height: 40px;
          background: #46474b;
          border-radius: 6px;
          border: 1px solid #46474b;
        }
        .cate-text {
          font-size: 12px;
          word-break: break-all;
          -webkit-line-clamp: 1;
        }
        .sub-text {
          font-size: 10px;
          word-break: break-all;
          text-align: center;
        }
        &.active {
          .cate-img {
            background: #293963;
            border: 1px solid #f4f4f4;
          }
        }
      }
    }
    .video-list {
      height: calc(100% - 156px);
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
          height: 160px;
          border-radius: 10px;
          box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          position: relative;
          .play-icon {
            width: 40px;
            height: 40px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -20px;
            margin-left: -20px;
          }
        }
        .hot-title {
          font-size: 12px;
          padding-top: 10px;
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  @media screen and (min-width: 768px) and (max-width: 1380px) {
    .type-box {
      width: 100%;
      height: 60vh;
      margin-top: 16px;
    }
  }
</style>
