import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userVisit } from '@/api/user'
import { generateRandomString } from '@/utils/common'
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/Case1',
      meta: {
        title: 'Case1'
      }
    },
    {
      path: '/Case1',
      name: 'Case1',
      meta: { title: 'Case1', group: 'Case1' },
      component: () => import('@/views/Demo1/index.vue')
    },
    {
      path: '/Case2',
      name: 'Case2',
      meta: { title: 'Case2', group: 'Case2' },
      component: () => import('@/views/Demo2/index.vue')
    },
    {
      path: '/Case3',
      name: 'Case3',
      meta: { title: 'Case3', group: 'Case3' },
      component: () => import('@/views/Demo3/index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: '登录', whetherLogin: true, isHideHeader: true },
      component: () => import('@/views/Login/index.vue')
    }
    // {
    //   path: '/error',
    //   name: 'error',
    //   meta: { title: '500' },
    //   component: () => import('@/views/500.vue')
    // },
    // {
    //   path: '/:pathMatch(.*)',
    //   meta: { title: '404' },
    //   component: () => import('@/views/404.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  next()
  // const token = localStorage.getItem('token')
  // if (token) {
  //   const params = {
  //     visitId: generateRandomString(20),
  //     type: 'view',
  //     target: to.fullPath,
  //     source: 'PC'
  //   }
  //   userVisit(params).then((res) => {
  //     console.log(res)
  //   })
  // }
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  // if (!token && !to.meta.whetherLogin) {
  //   next('/login')
  //   ElMessage({
  //     offset: -20,
  //     duration: 1500,
  //     type: 'warning',
  //     message: '请登录！'
  //   })
  // } else {
  //   next()
  // }
})

export default router
