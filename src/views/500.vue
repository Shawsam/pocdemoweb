<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="error">
    <img src="@/assets/images/500.png" alt="">
    <div class="btn-box">
      <h2>抱歉！<span>出错了。</span></h2>
      <div class="back mt20" @click="router.push('/')">返回首页</div>
      <div class="back mt15" @click="goBack">返回上一页</div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

const goBack = () => {
  window.history.state.back ? router.go(-1) : router.push('/')
}
</script>

<style scoped lang='scss'>
.error {
  margin: 20px auto 20px;
  padding: 20px;
  width: 1360px;
  height: calc(100vh - 300px);
  border-radius: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 350px;
    margin-right: 50px;
  }

  .btn-box {
    font-weight: 800;
    color: #5E72F8;

    h2 {
      font-weight: 700;

      span {
        font-weight: 700;
        font-size: 14px;
      }
    }

    .back {
      cursor: pointer;
      width: 120px;
      line-height: 32px;
      border: 2px solid #9BBEFF;
      border-radius: 4px;
      background: #FFFFFF;
      font-weight: 700;
      color: #5E72F8;
      text-align: center;
    }
  }
}
</style>