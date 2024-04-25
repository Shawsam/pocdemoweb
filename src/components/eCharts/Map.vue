<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content">
    <div class="title">{{ props.opts.title }}</div>
    <div class="chart" :id="props.opts.id" :style="props.opts.style"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import china from '@/utils/china'

const props = defineProps(['opts'])

let ChartDom = ref()
let MyChart = ref()

const draw = () => {
  // console.log('draw')
  const { option } = props.opts
  option && MyChart.value.setOption(option, true)
}
onMounted(() => {
  echarts.registerMap('china', china, {})
  ChartDom.value = document.getElementById(props.opts.id)
  MyChart.value = markRaw(echarts.init(ChartDom.value))
  draw()
})
watch(
  props,
  (val) => {
    // console.log('chartsProps', val)
    const { option } = props.opts
    option && MyChart.value?.setOption(option, true)
  },
  { immediate: true, deep: true }
)
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
  }
}
</style>
