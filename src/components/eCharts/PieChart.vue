<template>
  <div class="con comment">
    <el-empty
      class="pie-empty loading"
      v-if="isLoading"
      :image="loadImg"
      description="数据加载中..."
      :image-size="60"
    ></el-empty>
    <div v-show="!isLoading">
      <div class="chartBox" v-show="isShow">
        <div id="pieBox" class="chart"></div>
        <div class="lengbox">
          <div class="flex-left mb-20">
            <div class="box"></div>
            <span>Identified users</span>
          </div>
          <div class="flex-left">
            <div class="box black"></div>
            <span>Total users</span>
          </div>
        </div>
      </div>
      <el-empty class="pie-empty" v-show="!isShow" :image="emptyImg" description="暂无数据"></el-empty>
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import emptyImg from '@/assets/images/empty.png'
  import loadImg from '@/assets/images/loading.png'
  let pieChart = null
  const pieOptions = {
    series: {
      type: 'pie',
      radius: [65, 85],
      clockWise: false,
      silent: true,
      avoidLabelOverlap: true,
      center: ['25%', '50%'],
      data: [
        {
          value: 23.1,
          name: 'invisible',
          itemStyle: {
            color: '#222428'
          },
          label: {
            show: false
          }
        },
        {
          value: 76.9,
          label: {
            rich: {
              a: {
                color: '#fda416',
                align: 'center',
                fontSize: 25,
                fontWeight: 'bold'
              },
              b: {
                color: '#fda416',
                align: 'center',
                fontSize: 14,
                fontWeight: '600'
              },
              c: {
                fontSize: 14,
                color: '#fda416',
                fontWeight: '600'
              }
            },
            formatter: function (params) {
              params.value = '2226609'
              return '{a|' + params.value + '}' + '\n\n{b|' + '76.9' + '}' + '{c|%}'
            },
            position: 'center'
          },
          itemStyle: {
            color: '#fda416',
            borderWidth: 1,
            borderColor: '#222428'
          }
        }
      ]
    }
  }
  export default {
    name: 'VisitShow',
    props: ['chartId', 'list'],
    data() {
      return {
        MyChart: null,
        isShow: true,
        isLoading: true,
        emptyImg,
        loadImg
      }
    },
    methods: {
      init(val) {
        this.isLoading = false
        if (!val) {
          this.isShow = false
          return
        } else {
          this.isShow = true
          const chart = document.getElementById('pieBox')
          this.$nextTick(() => {
            pieChart = echarts.getInstanceByDom(chart)
            if (pieChart == null) {
              pieChart = echarts.init(chart)
            }
            this.setChart(val)
          })
        }
      },
      setChart(val) {
        pieOptions.series.data[0].value = val.prence_1
        pieOptions.series.data[1].value = val.prence_2
        pieChart.setOption(pieOptions)
        pieChart.hideLoading()
        window.addEventListener('resize', () => {
          pieChart?.resize()
        })
        document.getElementById('pieBox').setAttribute('_echarts_instance_', '')
      }
    }
  }
</script>
<style lang="scss">
  .pie-empty {
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
    height: 220px;
    color: #fff;
    .chartBox {
      position: relative;
      .lengbox {
        position: absolute;
        right: 5%;
        top: 35%;
        font-size: 13px;
        .box {
          width: 64px;
          height: 12px;
          margin-right: 15px;
          background: #fda416;
          &.black {
            background: #222428;
          }
        }
      }
      .mb-20 {
        margin-bottom: 20px;
      }
    }
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
      height: calc(45vh - 157.5px);
      .chart {
        height: calc(45vh - 167.5px);
      }
    }
  }
</style>
