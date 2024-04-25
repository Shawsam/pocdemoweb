<template>
  <div class="wrapper">
    <div class="header">
      <div class="title-name">User analysis</div>
      <div class="sub-title">acne skincare</div>
    </div>
    <div class="main flex-left">
      <Videos :list="video"></Videos>
      <div class="main-right-box">
        <div class="flex-left chart-wrapper">
          <div class="word-box">
            <div class="title-box">Comment Word Cloud</div>
            <div class="word-content">
              <HotCloud ref="wordCloudOne" :list="hotWord"></HotCloud>
            </div>
          </div>
          <div class="chart-box">
            <div class="title-box">User Recognition</div>
            <pie-chart-box chartId="pieId" ref="pieChart"></pie-chart-box>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-left height-bottom">
      <Following :list="following"></Following>
      <Topic :list="topic"></Topic>
      <special-effect :list="specialList"></special-effect>
      <Music :list="music"></Music>
      <!-- <type-box></type-box> -->
    </div>
  </div>
</template>

<script setup>
  import HotCloud from '@/components/eCharts/HotCloud.vue'
  import PieChartBox from '@/components/eCharts/PieChart.vue'
  import Videos from './components/Videos.vue'
  import Following from './components/Following.vue'
  import Topic from './components/Topic.vue'
  import SpecialEffect from './components/SpecialEffect.vue'
  import Music from './components/Music.vue'
  // import TypeBox from './components/TypeBox.vue'
  import { hotWordData, TopicList, EffectList, MusicList, FollowList, videoList } from '@/utils/json/mock.js'
  const pieChart = ref()
  const hotWord = ref()
  const topic = ref([])
  const specialList = ref([])
  const music = ref([])
  const following = ref([])
  const video = ref([])
  const wordCloudOne = ref(null)
  const pieData = ref({
    total_1: 2895461,
    prence_1: 23.1,
    total_2: 2226609,
    prence_2: 76.9
  })
  onMounted(() => {
    pieChart.value?.init(pieData.value)
    hotWord.value = hotWordData
    topic.value = TopicList
    specialList.value = EffectList
    music.value = MusicList
    following.value = FollowList
    video.value = videoList
    wordCloudOne.value?.init(hotWord.value)
  })
</script>

<style scoped lang="scss">
  .wrapper {
    margin: 0 auto;
    padding: 20px 30px;
    min-width: 768px;
    background: linear-gradient(to bottom, #7bada0, rgba(32, 40, 115, 1) 56%, #234d6a);
    overflow: auto;
    position: relative;
    .header {
      color: #fff;
      padding: 0 20px;
      .title-name {
        font-size: 20px;
        font-weight: 600;
      }
      .sub-title {
        font-size: 16px;
      }
    }
    .height-bottom {
      margin-bottom: 40px;
      padding-left: calc(20% + 110px);
      position: absolute;
      bottom: 0;
      right: 50px;
      width: 100%;
    }
  }
  .main {
    padding: 20px;
    color: #fff;
    align-items: flex-start;
    .title-box {
      height: 42px;
      line-height: 42px;
      background: #3a424a;
      text-align: center;
      font-size: 16px;
      border-radius: 10px;
    }
    .main-right-box {
      margin-left: 30px;
      height: calc(100vh - 204px);
      flex: 1;
      .word-box {
        width: 58%;
        background: #5f6c7a;
        height: 260px;
        border-radius: 10px;
        box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
      }
      .chart-box {
        margin-left: 30px;
        width: 42%;
        background: #5f6c7a;
        height: 260px;
        border-radius: 10px;
        box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.35);
      }
    }
  }
</style>
<style scoped lang="scss">
  @media screen and (min-width: 768px) and (max-width: 1380px) {
    .wrapper {
      padding: 20px 15px;
      .videos-left-box {
        width: 40%;
      }
      .main-right-box {
        margin-left: 20px;
      }
      .chart-wrapper {
        flex-wrap: wrap;
        .word-box {
          width: 100%;
          height: calc(55vh - 115.5px);
        }
        .chart-box {
          width: 100%;
          margin-left: 0;
          margin-top: 25px;
          height: calc(45vh - 115.5px);
        }
      }
      .height-bottom {
        margin-bottom: 0;
        padding-left: 0;
        position: static;
        padding: 10px 20px;
        flex-wrap: wrap;
      }
    }
  }
</style>
