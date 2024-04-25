import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'

export const user = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || null)
  const setToken = (value: any) => {
    token.value = value
  }

  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  const setUserInfo = () => {
    getUserInfo().then((res: any) => {
      userInfo.value = res
      localStorage.setItem('userInfo', JSON.stringify(res))
    })
  }

  const userImg = ref(localStorage.getItem('userImg') || '')
  const setUserImg = (value: any) => {
    userImg.value = value
    localStorage.setItem('userImg', value)
  }
  return { token, setToken, userInfo, setUserInfo, userImg, setUserImg }
})
