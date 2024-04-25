<template>
  <section class="section">
    <div class="title">Keywords Popularity</div>
    <div class="list">
      <div class="item" v-for="item in keywordsList" :key="item">
        <p class="tit">{{ item.word }}</p>
        <div>
          <span class="tag">Popularity {{ item.rate * 100 }}%</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import * as keywords from '@/utils/keywords.json'

  const props = defineProps({
    word: {
      type: String,
      default: 'makeup'
    },
    account: {
      type: String,
      default: 'jsjj.hshsq'
    }
  })

  const keywordsList = ref([])
  watch(
    () => [props.account, props.word],
    (val) => {
      keywordsList.value = keywords.default[val[0]][val[1]]
    },
    { immediate: true }
  )
</script>

<style lang="scss" scoped>
  .section {
    background: #4a5968;
    border-radius: 10px;
    .title {
      text-align: center;
      background: #000;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
    }
    .list {
      height: calc(100% - 50px);
      overflow-y: scroll;
      box-sizing: border-box;
      padding: 10px 20px;
      .item {
        margin-bottom: 15px;
        .tit {
          font-size: 18px;
          margin-bottom: 4px;
        }
        .tag {
          display: inline-block;
          padding: 3px 10px;
          background: #8f939b;
          color: #fff;
          border-radius: 5px;
          &:hover {
            transform: scale(1.05);
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
