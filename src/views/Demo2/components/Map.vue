<template>
  <div id="earthMap"></div>
</template>

<script setup>
  import { account } from '@/stores/account'
  const accountStore = account()
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
  const emits = defineEmits(['countrySelect'])

  import * as d3 from 'd3'
  import { formatNumberWithCommas } from '@/utils/common'
  let width = 800
  let height = 600
  const sphereStrokeWidth = 1
  const markerR = 5
  const markerSelectedR = 6
  let scale = 400
  let animationFrame, markers, tooltips, projection, path, svg, countries

  onMounted(() => {
    width = document.getElementById('earthMap').clientWidth
    height = document.getElementById('earthMap').clientHeight
    scale = d3.min([width, height]) / 2.5 - sphereStrokeWidth
    tooltips = d3
      .select('body')
      .append('div')
      .style('background-color', '#4c8086')
      .style('color', 'white')
      .style('dispaly', 'flex')
      .style('justify-content', 'center')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('top', '-1000px')

    svg = d3
      .select('#earthMap')
      .append('svg')
      .attr('class', 'globeSvg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('class', 'globe')
      .on('mouseenter', function (e, d) {
        cancelAnimationFrame(animationFrame)
      })
      .on('mouseleave', function (e, d) {
        animationFrame = requestAnimationFrame(rotateGlobe)
      })

    projection = d3
      .geoOrthographic()
      .scale(scale)
      .translate([width / 2, height / 2])
      .rotate([0, 0])

    path = d3.geoPath().projection(projection)

    // 滤镜
    var filter = svg.append('defs').append('filter').attr('id', 'glow')

    filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 3).attr('result', 'blur')

    filter
      .append('feColorMatrix')
      .attr('in', 'blur')
      .attr('mode', 'matrix')
      .attr('values', '0 0 0 0 0.57  0 0 0 0 0.86  0 0 0 0 0.93  0 0 0 1 0')
      .attr('result', 'glow')

    svg
      .append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'sphere')
      .attr('d', path)
      .attr('fill', 'rgba(0, 0, 0, 0)')
      .style('filter', 'url(#glow)')
      .attr('stroke-width', sphereStrokeWidth)
      .attr('stroke', '#00321e')

    const linear = d3.scaleLinear()
    const linearA = d3.scaleLinear()
    const pale = d3.rgb(222, 184, 135, 1)
    // const pale = d3.rgb(255, 220, 180)
    const dark = d3.rgb(139, 69, 19)
    const darkA = d3.rgb(97, 11, 0)
    const color = d3.interpolate(pale, dark)
    const colorA = d3.interpolate(dark, darkA)

    d3.json('https://toscdn.tarsocial.com/tarsocial/pocdemoweb/develop/world.json').then((data) => {
      data.features.forEach((item) => {
        let index = getCountryItem(item.properties.name)
        let temp = props.data[index]
        if (temp) {
          item.properties.val = props.data[index].userCount || 0
          item.properties.obj = props.data[index]
          item.properties.index = index
        } else {
          item.properties.val = 0
          item.properties.obj = {}
          item.properties.index = index
        }
      })

      const minVal = d3.min(data.features, (d) => d.properties.val)
      const maxVal = d3.max(data.features, (d) => d.properties.val)
      linear.domain([0, 7500000]).range([0, 1])
      linearA.domain([7500001, maxVal]).range([0, 1])
      countries = svg
        .append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        // .attr('opacity', '0.9')
        .attr('fill', (d, i) => {
          if (d.properties.val < 7500000) {
            return color(linear(d.properties.val))
          } else {
            return colorA(linearA(d.properties.val))
          }
        })
        .attr('stroke', '#219a96')
        .attr('stroke-width', 0.2)
        .attr('cursor', 'pointer')
        .on('mouseover', function (e, d) {
          d3.select(this).attr('fill', '#219a96')
          const countryName = d.properties.name
          const val = d.properties.val
          tooltips
            .html(
              `<div style="font-weight:bold">${countryName}</div>
               <div style="display:flex; align-items:center"><img style="height:20px; width:20px; margin-right:5px" class="icon" src="data:image/png;base64,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" />
                ${val ? formatNumberWithCommas(val) : 0}</div>
               <div style="display:flex; align-items:center"><img style="height:20px; width:20px; margin-right:5px" class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAhtJREFUeF7tmrFKBDEURe9rBEG0sPMDBAtFrLRTBAVBCzsRUUG0ckEttFMre/0BBb9Af2D/7GokK4PgJruT2X2ZvGnnzUzuyc2dzCSCwg8pXD8MgDmgcAI2BAo3gIVg9BAgeQLgGMC6ctd0AbyJyGtMO6MAkGTMzbTViEhQX7CA5CWAZ23iItvTEZGXfrUxAD4A7EY+UFvZp4js1QWQpf17okPDIMYBBkCbrwdpjzkg8CawIRCyU65zAAtBT8AywDKg/3TYQnCEIfgIYA3AVuiZKc9ryYCuiGw4YSTPAdwAmE8p9L97qQPgIUwDuPMgJpoEoRJATzDJJQ/ioCkIqgFUQLhPVucIlxFJjywAVEB0ANwCmEtFISsAPh9cJjwBuE4BITsAFTe4t4QDsV8HRLYAKiDcvMGBWBkGRPYAKiDeARwOCqFNAB6+51H3xQEg6f5Iu0AcakEmWweQXPbCjwbt9Wp9dgBIzgK48uIn64h312YFgOSFF57sQykLACR3vPDNuj3+93rVAEguerufphbeu59KACRnfI+7dJ9qSrzKDCB55sUvNClcmwNce9wvsVUA26MQrhHAKHX/PktLBoxFvKYMMADjImBDwJbGbGms7/KfrQ2Gwsk2SGS6SzTlTLD4jZJlb5X1qzVZbpYMTYJ+psqhEKz8ly93u3wspBzroh2Qo7iYNhuAGEptrjEHtLl3Y7SZA2IotbnmC67dJFCOtfA8AAAAAElFTkSuQmCC" />
                ${d.properties.obj.videoSumCount ? formatNumberWithCommas(d.properties.obj.videoSumCount) : 0}</div>`
            )
            .style('position', 'absolute')
            .style('left', `${e.clientX}px`)
            .style('top', `${e.clientY}px`)
            .style('opacity', 1)
        })
        .on('mouseleave', function (event, d) {
          d3.select(this).attr('fill', (d, i) => {
            if (d.properties.val < 7500000) {
              return color(linear(d.properties.val))
            } else {
              return colorA(linearA(d.properties.val))
            }
          })
          tooltips.style('opacity', 0).style('left', `0px`).style('top', `0px`)
        })
        .on('click', function (event, d) {
          emits('countrySelect', d.properties.index)
        })

      rotateGlobe()

      // 添加标注点
      markers = [
        { name: 'New York', coordinates: [-74.006, 40.7128] },
        { name: 'Beijing', coordinates: [116.4074, 39.9042] }
      ]
      // addMarker(markers)

      // 颜色差值展示
      const defs = svg.append('defs')
      const linearGr = defs
        .append('linearGradient')
        .attr('id', 'linearColor')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')

      linearGr.append('stop').attr('offset', '0%').style('stop-color', pale.toString())
      linearGr.append('stop').attr('offset', '50%').style('stop-color', dark.toString())
      linearGr.append('stop').attr('offset', '100%').style('stop-color', d3.rgb(97, 11, 0).toString())

      svg
        .append('rect')
        .attr('x', 20)
        .attr('y', height - 35)
        .attr('width', 120)
        .attr('height', 15)
        .style('fill', `url(#linearColor)`)

      svg
        .append('text')
        .text(minVal + '')
        .attr('fill', '#fff')
        .attr('x', 5)
        .attr('y', height)
        .attr('font-size', '12')

      svg
        .append('text')
        .text(maxVal + '')
        .attr('fill', '#fff')
        .attr('x', 120)
        .attr('y', height)
        .attr('font-size', '12')

      svg
        .append('text')
        .attr('class', 'title')
        .text('Total Accounts:' + formatNumberWithCommas(accountStore.totalNum))
        .attr('fill', '#fff')
        .attr('x', width / 2 - 70)
        .attr('y', 40)
        .attr('font-size', '15')
        .style('font-weight', 'bold')

      svg.call(
        d3.drag().on('drag', function (e) {
          const currentRotate = projection.rotate()
          projection.rotate([currentRotate[0] + e.dx])
          updateRender()
        })
      )
    })
  })

  // 地球旋转
  const rotateGlobe = () => {
    const rotationSpeed = 0.25 // 旋转速度
    const currentRotate = projection.rotate()
    projection.rotate([currentRotate[0] + rotationSpeed, currentRotate[1]])
    updateRender()
    animationFrame = requestAnimationFrame(rotateGlobe)
  }

  //更新渲染
  const updateRender = (markers) => {
    let _rotation = projection.rotate()[0]
    countries.attr('d', path)
    // 更新标注点位置
    svg
      .selectAll('.marker')
      .attr('cx', (d) => projection([d.coordinates[0], d.coordinates[1]])[0])
      .attr('cy', (d) => projection([d.coordinates[0], d.coordinates[1]])[1])
      .each(function (d) {
        let lon = d.coordinates[0]
        let visibility = false
        if (_rotation >= 270) {
          //350
          if ((lon > 0 && lon < 450 - _rotation) || (lon < 0 && lon > _rotation - 270)) visibility = true
        } else if (_rotation >= 180) {
          // 200
          if ((lon > 90 - _rotation + 180 && lon < 180) || (lon > -180 && lon < 90 - _rotation)) visibility = true
        } else if (_rotation >= 90) {
          // 110
          if ((lon > 270 - _rotation && lon < 180) || (lon > -180 && lon < 90 - _rotation)) visibility = true
        } else {
          // 60
          if (lon > -90 - _rotation && lon < 90 - _rotation) visibility = true
        }
        d3.select(this).attr('visibility', visibility ? 'visible' : 'hidden')
      })
  }

  const addMarker = () => {
    svg
      .selectAll('.marker')
      .data(markers)
      .enter()
      .append('circle')
      .attr('class', 'marker')
      .attr('cx', (d) => projection([d.coordinates[0], d.coordinates[1]])[0])
      .attr('cy', (d) => projection([d.coordinates[0], d.coordinates[1]])[1])
      .attr('r', markerR)
      .attr('fill', 'red')
      .attr('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('r', markerSelectedR).attr('stroke', 'orange').attr('stroke-width', '2px')
        tooltips.style('opacity', 1).html(d.name).style('left', `${event.clientX}px`).style('top', `${event.clientY}px`)
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('r', markerR).attr('stroke', 'none')
        tooltips.style('opacity', 0).style('left', `0px`).style('top', `0px`)
      })
      .on('click', function (event, d) {
        console.log(d.name)
      })
  }

  const getCountryItem = (name) => {
    const data = props.data
    let temp = ''
    data.map((item, index) => {
      if (item.regionEnName == name) {
        temp = index
      }
    })
    return temp
  }

  window.addEventListener('resize', () => {
    width = document.getElementById('earthMap').clientWidth
    height = document.getElementById('earthMap').clientHeight
    console.log(width, height)
    scale = d3.min([width, height]) / 2.3 - sphereStrokeWidth
    d3.selectAll('.globeSvg').attr('width', width).attr('height', height)
    d3.selectAll('.title').attr('x', width / 2 - 70)
    projection.scale(scale).translate([width / 2, height / 2])
    path = d3.geoPath().projection(projection)
    d3.selectAll('.sphere').attr('d', path)
    updateRender()
  })
</script>

<style scoped lang="scss">
  ::v-deep .el-loading-mask {
    background-color: rgba(0, 0, 0, 0) !important; /* 这里的透明度可以根据需要调整 */
  }
</style>
