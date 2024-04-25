<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content">
    <div class="title">{{ props.opts.title }}</div>
    <div v-if="show" class="chart" :id="props.opts.id" :style="props.opts.style"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { nextTick } from 'vue'
const props = defineProps(['opts'])
let ChartDom = ref()
let MyChart = ref()
const show = ref(true)
const draw = () => {
  // console.log('draw')
  const { option } = props.opts
  option && MyChart.value.setOption(option, true)
}

onMounted(() => {
  ChartDom.value = document.getElementById(props.opts.id)
  MyChart.value = markRaw(echarts.init(ChartDom.value))
  // console.log('MyChart.value',MyChart.value);
  draw()
})
watch(
  props,
  (val) => {
    // console.log('chartsProps', val)
    const { option } = props.opts
    if(MyChart.value){
      MyChart.value.showLoading()
    }
    nextTick(() => {
      MyChart.value?.resize()
      MyChart.value.hideLoading()
      MyChart.value?.setOption(option, true)
      window.addEventListener('resize', () => {
        MyChart.value.resize()
      })
    })
  },
  { immediate: true, deep: true }
)
defineExpose({
  draw,
  MyChart
})
</script>
<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;

  .title {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    // color: #ffffff;
  }

  .chart {
    width: 100%;
  }
}
</style>
