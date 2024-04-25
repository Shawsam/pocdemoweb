<!-- eslint-disable vue/no-deprecated-slot-attribute -->

<template>
  <!-- <div class="main">
    <div class="content">
      <div class="logo">
        <img src="@/assets/icons/btLogo.png" alt="" />
      </div>
      <div class="text">
        <div class="box">
          <div class="title">核心功能</div>
          <div class="info">
            <div class="cell focus" @click="router.push({ name: 'ThemeRank' })">题材大盘</div>
            <div class="cell focus" @click="router.push({ name: 'materialSearch' })">即时推</div>
            <div class="cell focus" @click="router.push({ name: 'materialSearch' })">素材热推</div>
          </div>
        </div>
        <div class="box">
          <div class="title">产品价格</div>
          <div class="info">
            <div class="cell focus" @click="router.push({ name: 'Buy', query: { level: 3001 } })">个人版</div>
            <div class="cell focus" @click="router.push({ name: 'Buy', query: { level: 3002 } })">专业版</div>
            <div class="cell focus" @click="router.push({ name: 'Buy', query: { level: 3003 } })">企业版</div>
            <div class="cell focus" @click="router.push({ name: 'Buy', query: { level: 3004 } })">定制版</div>
          </div>
        </div>
        <div class="box">
          <div class="title">其它</div>
          <div class="info">
            <div class="cell focus" @click="openNewWindow('privacyAgreement')">隐私条款</div>
            <div class="cell focus" @click="openNewWindow('userAgreement')">服务协议</div>
          </div>
        </div>
      </div>
      <div class="qrCode">
        <div class="pic">
          <img src="@/assets/images/gzh.png" alt="" />
          <div class="desc">公众号</div>
        </div>
        <div class="pic">
          <img src="@/assets/images/kefuqw.png" alt="" />
          <div class="desc">客服企业微信</div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="footer">
    <!-- <p>
      Copyright © 2023 星构网络科技（上海）有限公司<img src="@/assets/images/ba.png" /><a target="_blank"
        href="https://beian.miit.gov.cn/">沪ICP备2023032213号-1</a>
    </p> -->
  </div>
</template>

<script setup>
  import { openNewWindow } from '@/utils/common.ts'
  import { useRoute, useRouter } from 'vue-router'
</script>

<style lang="scss" scoped>
  .focus {
    cursor: pointer;
  }

  .main {
    z-index: 9;
    // background: #4A4A4AFF;
    background: #ededed;
    color: #646464;
    margin: 0 auto;
    padding: 15px 80px;
    width: 1360px;

    .logo {
      display: flex;
      // justify-content: space-between;
      align-items: start;
      // max-width: 1400px;
      // min-width: 1000px;
      // margin: 0 auto 20px;

      img {
        height: 45px;
      }
    }

    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      max-width: 1400px;
      min-width: 1000px;
      margin: 0 auto;

      .text {
        display: flex;
        // justify-content: space-between;
        padding-right: 100px;
        width: 56%;
      }

      .box {
        display: flex;
        flex: 1;
        // margin-right: 6vw;
        color: #646464;

        .title {
          font-size: 16px;
          font-family: Inter, Inter;
          font-weight: 800;
          line-height: 20px;
          margin-right: 20px;
        }

        .info {
          .cell {
            font-size: 14px;
            font-family: Inter, Inter;
            font-weight: 400;
            line-height: 20px;
            margin-bottom: 10px;
          }
        }
      }

      .qrCode {
        display: flex;
        // padding-right: 50px;

        .pic {
          display: flex;
          flex-direction: column;
          align-items: center;
          // justify-content: center;
          margin-right: 30px;

          img {
            width: 90px;
            height: 90px;
          }

          .desc {
            margin-top: 10px;
          }

          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }

  .footer {
    z-index: 9;
    background: #ededed;
    text-align: center;
    color: #646464;
    padding: 15px 0 15px;
    min-width: 1360px;

    p {
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        color: #646464;
      }

      img {
        width: 20px;
        margin: 0 5px 0 10px;
      }
    }
  }
</style>
