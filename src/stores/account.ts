import { defineStore } from 'pinia'
import { getTotalCount } from '@/api/demo.js'

export const account = defineStore('account', () => {
  const totalNum = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  const setTotalNum = () => {
    getTotalCount().then((res: any) => {
      totalNum.value = res.count
      localStorage.setItem('total', JSON.stringify(res.count))
    })
  }
  return { totalNum, setTotalNum }
})
