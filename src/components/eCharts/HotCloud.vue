<template>
  <div class="con comment">
    <el-empty
      class="word-empty"
      v-if="isLoading"
      :image="loadImg"
      description="数据加载中..."
      :image-size="60"
    ></el-empty>
    <div v-show="!isLoading">
      <div id="wordBox" class="chart" v-show="isShow"></div>
      <el-empty class="word-empty" v-show="!isShow" :image="emptyImg" description="暂无词云"></el-empty>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import 'echarts-wordcloud'
  import emptyImg from '@/assets/images/empty.png'
  import loadImg from '@/assets/images/loading.png'
  let chart = null
  // var getRandomColor = function () {
  //   return '#' + ('e99d22' + ((Math.random() * 0x1000000) << 0.95).toString(16)).substr(-6)
  // }
  const chartOption = {
    tooltip: {
      trigger: 'item'
      // formatter: function (params) {
      //   return "弹幕词占比:" + (params.value * 100).toFixed(2)+'%';
      // }
    },
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      max: 100,
      show: false
    },
    series: [
      {
        type: 'wordCloud',
        sizeRange: [10, 60],
        rotationRange: [0, 0],
        textPadding: 20,
        rotationStep: 35,
        textRotation: [0, 16],
        gridSize: 15,
        shape: 'line',
        width: '96%',
        height: '98%',
        left: 'center',
        top: 'center',
        right: null,
        bottom: null,
        drawOutOfBound: false,
        autoSize: {
          enable: true,
          minSize: 14
        },
        textStyle: {
          color: '#e99d22',
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: []
      }
    ]
  }
  export default {
    name: 'VisitShow',
    props: ['chartId', 'list'],
    data() {
      return {
        isShow: true,
        isLoading: true,
        emptyImg,
        loadImg
      }
    },
    methods: {
      init(val) {
        this.isLoading = false
        if (!val.length) {
          this.isShow = false
          return
        } else {
          this.isShow = true
          const MyChart = document.getElementById('wordBox')
          this.$nextTick(() => {
            chart = echarts.getInstanceByDom(MyChart)
            if (chart == null) {
              chart = echarts.init(MyChart)
            }
            this.setChart(val)
          })
        }
      },
      setChart(data) {
        chartOption.series[0].data = data
        chart.setOption(chartOption)
        chart.hideLoading()
        window.addEventListener('resize', () => {
          chart?.resize()
        })
      }
    }
  }
</script>
<style lang="scss">
  .word-empty {
    img {
      height: 80px;
    }
    .el-empty__description p {
      color: #f8f8f8 !important;
    }
  }
</style>
<style scoped lang="scss">
  .con {
    position: relative;
    background: #5f6c7a;
    border-radius: 8px;
    width: 100%;
    color: #fff;
    .chart {
      width: 100%;
      height: 210px;
    }
  }

  .empty-text {
    margin-top: 12px;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
  }
</style>
<style scoped lang="scss">
  @media screen and (min-width: 768px) and (max-width: 1380px) {
    .con {
      height: calc(55vh - 157.5px);
      .chart {
        height: calc(55vh - 167.5px);
      }
    }
  }
</style>
