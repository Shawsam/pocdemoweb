<template>
  <div class="topic-box">
    <div class="title-box">Special Effect</div>
    <div class="topic-list">
      <div class="topic-item flex-left" v-for="(item, index) in list" :key="index">
        <div class="topic-img">
          <img :src="'data:image/png;base64,' + item.pic_base64" />
        </div>
        <div class="topic-right">
          <div class="topic-text multiple-ellipsis">
            {{ item.name }}
          </div>
          <div class="sub-text">{{ parseFloat(item.rate).toFixed(2) }}%（{{ Math.round(item.total) }}）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps(['list'])
</script>

<style scoped lang="scss">
  .topic-box {
    width: 25%;
    height: 100%;
    background: #5f6c7a;
    border-radius: 10px;
    box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
    margin-right: 15px;
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
    .topic-list {
      height: calc(100% - 42px);
      overflow: auto;
      padding-bottom: 15px;
      padding-top: 8px;
      .topic-item {
        padding: 8px 10px;
        padding-right: 5px;
        &:hover {
          background: #728292;
        }
        .topic-img {
          width: 60px;
          height: 60px;
          border-radius: 6px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .play-btn {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -10px;
            margin-left: -10px;
          }
        }
        .topic-right {
          flex: 1;
          margin-left: 8px;
          .topic-text {
            font-size: 15px;
            word-break: break-all;
            -webkit-line-clamp: 1;
          }
          .sub-text {
            margin-top: 2px;
            font-size: 12px;
            color: #c0bfbf;
          }
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  @media screen and (min-width: 768px) and (max-width: 1380px) {
    .topic-box {
      width: calc(50% - 8px);
      margin-right: 16px;
      height: 60vh;
      margin-top: 16px;
    }
  }
</style>
