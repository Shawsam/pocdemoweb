<template>
  <div class="topic-box">
    <div class="title-box">Following</div>
    <div class="user-list">
      <div class="user-item flex-left" v-for="(item, index) in list" :key="index">
        <div class="user-left">
          <div class="user-avatar">
            <img :src="'data:image/png;base64,' + item.pic_base64" />
            <!-- <img class="sex-icon" v-if="item < 6" src="@/assets/images/man.png" />
            <img class="sex-icon" v-else src="@/assets/images/woman.png" /> -->
          </div>
          <span class="user-name text-ellipsis">{{ item.name }}</span>
        </div>
        <div class="sub-text">{{ parseFloat(item.rate).toFixed(2) }}%（{{ Math.round(item.total) }}）</div>
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
      border-radius: 10px;
      color: #fff;
    }
    .user-list {
      height: calc(100% - 42px);
      overflow: auto;
      .user-item {
        height: 68px;
        padding: 5px 10px;
        padding-right: 2px;
        &:nth-child(2n) {
          background: #728292;
        }
        .user-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 90px;
          flex: none;
          .user-avatar {
            width: 40px;
            height: 40px;
            background: #46474b;
            border-radius: 50%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            .sex-icon {
              position: absolute;
              top: -2px;
              right: -6px;
              width: 16px;
              height: 16px;
            }
          }
          .user-name {
            line-height: 1;
            font-size: 12px;
            width: 90px;
            text-align: center;
          }
        }
        .follow-text {
          flex: 1;
          font-size: 13px;
          margin-left: 30px;
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
    }
  }
</style>
