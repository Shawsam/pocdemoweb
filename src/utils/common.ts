import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'
import 'element-plus/theme-chalk/el-message-box.css'
import Router from '@/router'
import { getResidualInterest } from '@/api/user.js'

export function parseBoolean(str: any) {
  if (str) {
    return str === 'true' || str === true
  } else {
    return false
  }
}

export const requireExpertIcon = (imgPath: any) => {
  try {
    import.meta.globEager('../assets/images/expert/*.png')
    // https://vitejs.cn/guide/assets.html#the-public-directory
    return new URL(`../assets/images/expert/${imgPath}`, import.meta.url).href
  } catch (error) {
    console.warn(error)
  }
}

export const requireIcon = (imgPath: any) => {
  try {
    import.meta.globEager('../assets/icons/*.png')
    // https://vitejs.cn/guide/assets.html#the-public-directory
    return new URL(`../assets/icons/${imgPath}`, import.meta.url).href
  } catch (error) {
    console.warn(error)
  }
}

export const require = (imgPath: any) => {
  try {
    import.meta.globEager('../assets/images/top/*.png')
    // https://vitejs.cn/guide/assets.html#the-public-directory
    return new URL(`../assets/images/top/${imgPath}`, import.meta.url).href
  } catch (error) {
    console.warn(error)
  }
}
export const getNeedArr = (array: any, size: any) => {
  //获取所需指定长度分割的数组;参数1为用于分割的总数组,参数2为分割数组后每个小数组的长度
  const length = array.length
  let result = []
  //判断不是数组，或者size没有设置，size小于1，就返回空数组
  if (!length || !size || size < 1) {
    return []
  }
  //核心部分
  let index = 0 //用来表示切割元素的范围start
  let resIndex = 0 //用来递增表示输出数组的下标

  //根据length和size算出输出数组的长度，并且创建它。
  result = new Array(Math.ceil(length / size))
  //进行循环
  while (index < length) {
    //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
    result[resIndex++] = array.slice(index, (index += size))
  }
  //输出新数组
  return result
}
export const transDateYMD = (timeStamp: any) => {
  const date = new Date(timeStamp)
  const Y = date.getFullYear() + '/'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  return Y + M + D
}

export const filterPhone = (tel: string) => {
  let result = ''
  if (tel) {
    result = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
  return result
}

// 秒数转时分秒格式
export function secondToTime(second: any, format: any) {
  const time = moment.duration(second, 'seconds') //得到一个对象，里面有对应的时分秒等时间对象值
  const hours = time.hours()
  const minutes = time.minutes()
  const seconds = time.seconds()
  const res = moment({ h: hours, m: minutes, s: seconds }).format(format)
  return res
}

//秒数转化为时分秒
export function formatSeconds(value: Number) {
  let theTime = Math.ceil(value / 1000) // 秒
  let theTime1 = 0 // 分
  let theTime2 = 0 // 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  let result = ''
  if (theTime1 > 0 || theTime1 <= 3) {
    result = '3分钟以内'
  }
  if (theTime1 > 3) {
    const minutes = (parseInt((theTime1 - 1) / 5) + 1) * 5
    result = +parseInt(minutes) + '分钟以内'
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2) + '时' + result
  }
  return result
}

export const getDuration = (second: any, precision: any) => {
  let duration = ''
  const days = Math.floor(second / 86400)
  const hours = Math.floor((second % 86400) / 3600)
  const minutes = Math.floor(((second % 86400) % 3600) / 60)
  const seconds = Math.floor(((second % 86400) % 3600) % 60)
  if (days > 0) duration = days + '天' + hours + '小时' + minutes + '分钟' + (precision ? seconds + '秒' : '')
  else if (hours > 0) duration = hours + '小时' + minutes + '分钟' + (precision && seconds > 0 ? seconds + '秒' : '')
  else if (minutes > 0) duration = minutes + '分钟' + (precision && seconds > 0 ? seconds + '秒' : '')
  else if (seconds > 0 && precision) duration = seconds + '秒'
  return duration
}

export const getDurationPub = (second: any, precision: any) => {
  let duration = ''
  const days = Math.floor(second / 86400)
  const hours = Math.floor((second % 86400) / 3600)
  const minutes = Math.floor(((second % 86400) % 3600) / 60)
  const seconds = Math.floor(((second % 86400) % 3600) % 60)
  if (days > 0) {
    duration = '24 小时前'
  } else {
    switch (true) {
      case hours == 0 && minutes <= 30:
        duration = '30 分钟内'
        break
      case hours > 0 && hours <= 1:
        duration = '1 小时内'
        break
      case hours > 1 && hours <= 2:
        duration = '2 小时内'
        break
      case hours > 2 && hours <= 6:
        duration = '6 小时内'
        break
      case hours > 6 && hours <= 12:
        duration = '12 小时内'
        break
      case hours > 12 && hours < 24:
        duration = '24 小时内'
        break
    }
  }
  return duration
}

export const secondTransTime = (second = 0) => {
  let duration = ''
  const days = Math.floor(second / 86400000)
  const hours = Math.floor((second % 86400000) / 3600000)
  const minutes = Math.floor(((second % 86400000) % 3600000) / 60000)
  const seconds = Math.floor((((second % 86400000) % 3600000) % 60000) / 1000)
  if (days > 0) duration = days + '天 ' + hours + '小时 ' + minutes + "' " + seconds + '" '
  else if (hours > 0) duration = hours + 'h ' + minutes + 'min'
  else if (minutes > 0) duration = minutes + "' " + seconds + '" '
  else if (seconds > 0) duration = seconds + '" '
  return duration
}

// 权限提示框
export const buyVipTips = (
  tips = '',
  confirmText = '立即升级',
  cancelText = '我再想想',
  callBack = () => {
    Router.push({ name: 'Buy' })
  },
  cancelCall = () => {}
) => {
  ElMessageBox.confirm(
    `<img src="data:image/png;base64,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" style="width: 80px"/>
    <div>${tips}</div>`,
    // '提示',
    {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonClass: 'confirmButtonClass',
      cancelButtonClass: 'cancelButtonClass',
      center: true,
      dangerouslyUseHTMLString: true
      // type: 'warning'
    }
  )
    .then(() => {
      console.log('confirm')
      localStorage.setItem('hasShowPop', '0')
      callBack()
      // Router.push({ name: 'userInterests' })
      // this.$message({
      //   type: 'success',
      //   message: '删除成功!'
      // });
    })
    .catch(() => {
      cancelCall()
      localStorage.setItem('hasShowPop', '0')
      // this.$message({
      //   type: 'info',
      //   message: '已取消删除'
      // });
    })
    .finally(() => {
      localStorage.setItem('hasShowPop', '0')
    })
}

// 剩余权限
export const residualInterestTips = (module: string, subModule: string, title = '', offset = 60, duration = 3000) => {
  getResidualInterest(module, subModule)
    .then((res: any) => {
      console.log('getResidualInterest', res)
      if (res.userCount > 5 || res.userCount < 0) return // 少于等于5次才提醒
      ElNotification({
        title: title,
        dangerouslyUseHTMLString: true,
        message:
          res.userLevelDesc == '普通会员' && module !== 'material'
            ? `<div style='dispaly: flex; align-items: center;'>您当前为<span style='color: rgb(228,183,70)'>${res.userLevelDesc}</span>，
        需查看更多请<span style='cursor: pointer; color:' onclick="close">升级版本</span></div>`
            : res.userLevelDesc == '普通会员' && module == 'material'
            ? `<div style='dispaly: flex; '>您当前为<span style='color: rgb(228,183,70)'>${res.userLevelDesc}</span>，
        可${subModule == 'search' ? '搜索' : '查看'}<span style='color: rgb(228,183,70)'>${res.authCount}</span>次/天${
                subModule == 'search' ? '，' : '详情，'
              }
        当前还剩<span style='color: rgb(228,183,70)'>${
          res.userCount
        }</span>次，需查看更多请<span style='cursor: pointer; color:' onclick="close">升级版本</span></div>`
            : `<div style='dispaly: flex; '>您当前为<span style='color: rgb(228,183,70)'>${res.userLevelDesc}</span>，
        可${subModule == 'search' ? '搜索' : '查看'}<span style='color: rgb(228,183,70)'>${res.authCount}</span>次/天${
                subModule == 'search' ? '，' : '详情，'
              }
        当前还剩<span style='color: rgb(228,183,70)'>${
          res.userCount
        }</span>次，需查看更多请<span style='cursor: pointer; color:' onclick="close">升级版本</span></div>`,
        offset: offset,
        duration: duration
      })
    })
    .catch((err: any) => {
      console.log('err', err)
    })
}

// 驼峰转下划线
export const hump2Line = (str: string) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 替换特殊字符
export function validForbid(str) {
  return str.replace(/[^\w\u4E00-\u9FA5]/g, '')
  // return str.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
}

// 跳转到对应页面并打开新窗口
export const openNewWindow = (routerName: string, query: any) => {
  const routeData = Router.resolve({ name: routerName, query: query })
  const winRef = window.open('url', '_blank')
  winRef.location = routeData.href
}

export const getWeek = (type: String, dates: Number) => {
  const now = new Date()
  const nowTime = now.getTime()
  const day = now.getDay()
  const longTime = 24 * 60 * 60 * 1000
  const n = longTime * 7 * (dates || 0)
  let dd
  if (type == 's') {
    dd = nowTime - (day - 1) * longTime + n
  }
  if (type == 'e') {
    dd = nowTime + (7 - day) * longTime + n
  }
  dd = new Date(dd)
  const y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}

export const getMonth = (type: String, months: Any) => {
  const d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  }
  if (months != 0) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    }
  }
  month = month < 10 ? '0' + month : month
  const date = d.getDate()
  const firstday = year + '-' + month + '-' + '01'
  let lastday = ''
  if (
    month == '01' ||
    month == '03' ||
    month == '05' ||
    month == '07' ||
    month == '08' ||
    month == '10' ||
    month == '12'
  ) {
    lastday = year + '-' + month + '-' + 31
  } else if (month == '02') {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + '-' + month + '-' + 29
    } else {
      lastday = year + '-' + month + '-' + 28
    }
  } else {
    lastday = year + '-' + month + '-' + 30
  }
  let day = ''
  if (type == 's') {
    day = firstday
  } else {
    day = lastday
  }
  return day
}
export const transNum = (value: any) => {
  let val = '--'
  if (value == 0) val = '0'
  return value ? value : val
}

export const transNum2 = (value: any, tofixed = 1) => {
  let val = '--'
  if (value >= 10000 && value < 100000000) {
    val = Math.round((value / 10000) * Math.pow(10, tofixed)) / Math.pow(10, tofixed) + '万+'
  } else if (value >= 100000000) {
    val = Math.round((value / 100000000) * Math.pow(10, tofixed)) / Math.pow(10, tofixed) + '亿+'
  } else if (value < 10000) {
    val = Math.round(value * Math.pow(10, tofixed)) / Math.pow(10, tofixed)
  } else {
    val = '--'
  }
  return val
}

export const transNumToFixed2 = (value: any, tofixed = 2) => {
  let val = '--'
  if (value >= 10000 && value < 100000000) {
    val = Math.round((value / 10000) * Math.pow(10, tofixed)) / Math.pow(10, tofixed) + '万'
  } else if (value >= 100000000) {
    val = Math.round((value / 100000000) * Math.pow(10, tofixed)) / Math.pow(10, tofixed) + '亿'
  } else if (1 <= value < 10000) {
    val = Math.round(+value * Math.pow(10, tofixed)) / Math.pow(10, tofixed)
  } else {
    val = '--'
  }
  return val
}

export const transPercent = (value: any, tofixed = 2) => {
  if (value || value === 0) {
    return Math.floor(value * 100 * Math.pow(10, tofixed)) / Math.pow(10, tofixed) + '%'
  } else {
    return '--'
  }
}

export const arrChunk = (arr: any, num: number) => {
  if (!arr || arr.length == 0) return []
  let j = 0,
    o = j
  const newArray = []
  while (j < arr.length) {
    j += num
    newArray.push([arr.slice(o, j)])
    o = j
  }
  return newArray
}

export const trimSpace = (arr: any) => {
  const r = arr.filter(function (s: any) {
    return s && s.trim()
  })
  return r
}

export const eacapeReg = (val: string) => {
  return val
    .replace(/[～*~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '')
    .replace(/\s/g, '')
    .replace(
      /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
      ''
    )
    .replace(/\s/g, '')
  // return val
  //   .replace(/\\/g, '\\\\')
  //   .replace(/\(/g, '\\(')
  //   .replace(/\)/g, '\\)')
  //   .replace(/\./g, '\\.')
  //   .replace(/\+/g, '\\+')
  //   .replace(/\*/g, '\\*')
  //   .replace(/\$/g, '\\$')
  //   .replace(/\[/g, '\\[')
  //   .replace(/\]/g, '\\]')
  //   .replace(/\^/g, '\\^')
  //   .replace(/\|/g, '\\|')
  //   .replace(/\-/g, '\\-')
  //   .replace(/\{/g, '\\{')
  //   .replace(/\}/g, '\\}')
  //   .replace(/\?/g, '\\?')
  //   .replace(/\!/g, '\\!')
  //   .replace(/\,/g, '\\,')
}

export const getElementPosition = (element: any) => {
  //计算x坐标
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  //计算y坐标
  let actualTop = element.offsetTop
  current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop
    current = current.offsetParent
  }
  //返回结果
  return { x: actualLeft, y: actualTop }
}

export const generateRandomString = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}

export const formatNumberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
