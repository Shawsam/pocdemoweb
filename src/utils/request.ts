import axios from 'axios'
import router from '@/router'
import route from '@/router'
import { ElLoading, ElMessage } from 'element-plus'
import { buyVipTips } from '@/utils/common'

/**
 * 直接数据请求的方法
 * @param  {[object]} options  [ajax 的各种入参]
 * @return {[promise]}         [返回promise链式操作]
 */

let msgInstance: any
let loadingInstance: any
const loadingHide = true

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000
})
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (!loadingHide)
      loadingInstance = ElLoading.service({
        fullscreen: true,
        target: '.layout',
        text: '加载中...'
      })
    if (localStorage.getItem('token')) {
      ;(config.headers['token'] = localStorage.getItem('token')), (config.headers['If-Modified-Since'] = '0')
      config.headers['Cache-Control'] = 'no-cache'
    }
    return config
  },
  function (error: any) {
    console.log(error)
    // 处理请求错误
    if (!loadingHide) {
      loadingInstance.clear()
    }
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: any) => {
    // 在2xx范围内的任何状态代码都会触发此功能
    // 处理响应数据
    if (!loadingHide) {
      loadingInstance.close()
    }
    if (response.data.success == true) {
      const data = response.data
      return data.data
    } else {
      ElMessage.error(response.data.message)
      return Promise.reject(response.data)
    }
  },
  function (error: any) {
    // 任何超出2xx范围的状态代码都会触发此功能
    // 处理响应错误
    loadingInstance?.close()
    if (error.response) {
      switch (error.response.status) {
        case 401: //token无效
          if (msgInstance) {
            console.log(msgInstance)
          } else {
            msgInstance = ElMessage.error('登录过期，请重新登录')
          }
          localStorage.clear()
          router.push({ name: 'Login' })
          break
        case 403:
          console.log('权限受限', error)
          if (error.response.data.result.subModule == 'contact' && error.response.data.result.module == 'talent') {
            return Promise.reject(error.response.data)
          }
          // console.log('router',router, route);
          if (
            route.currentRoute.value.path.includes('/detail') &&
            error.response.data.result.subModule !== 'list' &&
            error.response.data.result.subModule !== 'idea_list' &&
            error.response.data.result.subModule !== 'materials_list' &&
            error.response.data.result.module !== 'miniseries_type'
          ) {
            router.push({ name: 'noAuth', query: { type: route.currentRoute.value.meta.group as string } })
            // return
          }
          if (error.response.data.result.subModule == 'search') {
            if (error.response.data.result.module == 'talent' && error.response.data.result.userLevel == 0) {
              localStorage.getItem('hasShowPop') == '0' &&
                buyVipTips(
                  `您当前为${error.response.data.result.userLevelDesc}，需使用更多权益请升级版本` || '需操作请升级版本',
                  '立即升级',
                  '我再想想',
                  () => router.push({ name: 'Buy' }),
                  () => {
                    error.response.data.result.module == 'material' && router.push({ path: 'materialSearch' })
                  }
                )
              localStorage.setItem('hasShowPop', '1')
              return
            }
            if (error.response.data.result.module == 'talent' && error.response.data.result.userLevel == 3001) {
              localStorage.getItem('hasShowPop') == '0' &&
                buyVipTips(
                  `您当前为${error.response.data.result.userLevelDesc}，需使用更多权益请升级版本` || '需操作请升级版本',
                  '立即升级',
                  '我再想想',
                  () => router.push({ name: 'Buy' }),
                  () => {
                    error.response.data.result.module == 'material' && router.push({ path: 'materialSearch' })
                  }
                )
              localStorage.setItem('hasShowPop', '1')
              return
            }
            if (error.response.data.result.userLevel == 0) {
              localStorage.getItem('hasShowPop') == '0' &&
                buyVipTips(
                  `您当前为${error.response.data.result.userLevelDesc}，需使用更多权益请升级版本` || '需操作请升级版本',
                  '立即升级',
                  '我再想想',
                  () => router.push({ name: 'Buy' }),
                  () => {
                    error.response.data.result.module == 'material' && router.push({ path: 'materialSearch' })
                  }
                )
              localStorage.setItem('hasShowPop', '1')
              return
            }

            localStorage.getItem('hasShowPop') == '0' &&
              buyVipTips(
                `您当前为${error.response.data.result.userLevelDesc}，今日搜索次数已用尽，需查看更多请升级` ||
                  '需操作请升级版本',
                '立即升级',
                '我再想想',
                () => router.push({ name: 'Buy' }),
                () => {
                  error.response.data.result.module == 'material' && router.push({ path: 'materialSearch' })
                }
              )
            localStorage.setItem('hasShowPop', '1')
            // return
          }
          if (
            error.response.data.result.userCount <= 0 &&
            error.response.data.result.userLevelDesc !== '普通会员' &&
            error.response.data.result.subModule == 'info'
          ) {
            localStorage.getItem('hasShowPop') == '0' &&
              buyVipTips(`您当前为${error.response.data.result.userLevelDesc}，当前使用次数已用尽，需查看更多请“升级”`)
            localStorage.setItem('hasShowPop', '1')
          } else if (
            error.response.data.result.userCount <= 0 &&
            error.response.data.result.userLevelDesc == '普通会员'
          ) {
            localStorage.getItem('hasShowPop') == '0' && buyVipTips('您当前为普通会员，需使用更多权益请升级版本')
            localStorage.setItem('hasShowPop', '1')
          } else {
            localStorage.getItem('hasShowPop') == '0' &&
              buyVipTips(error.response.data.message || '免费版不支持筛选，需操作请升级版本')
            localStorage.setItem('hasShowPop', '1')
          }
          break
        case 400:
          ElMessage.error('参数错误')
          break
        case 404:
          ElMessage.error('接口地址不正确')
          break
        case 405:
          ElMessage.error('请求方式不正确')
          break
        case 429:
          if (msgInstance) {
            console.log(msgInstance)
          } else {
            msgInstance = ElMessage.error('您短时间内访问过于频繁，请稍后再试')
          }
          break
        default:
          ElMessage.error('网络异常，请稍后重试')
          // router.push({ name: 'error' })
          break
      }
      return Promise.reject(error.response.data)
    } else {
      ElMessage.error('加载超时，请稍后重试')
      return Promise.reject({ code: -100, message: '加载超时，请稍后重试' })
    }
  }
)

export default http
