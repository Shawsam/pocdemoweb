// 本地存储
export class localStore {
  constructor() {}
  // 设置
  set(name: string, value: any, day: number) {
    const d = new Date()
    let time = 0
    day = typeof day === 'undefined' || !day ? 1 : day // 时间,默认存储1天
    time = d.setHours(d.getHours() + 24 * day) // 毫秒
    localStorage.setItem(
      name,
      JSON.stringify({
        data: value,
        time: time
      })
    )
  }
  // 获取
  get(name: string) {
    const data = localStorage.getItem(name)
    if (!data) {
      return null
    }
    const obj = JSON.parse(data)
    if (new Date().getTime() > obj.time) {
      // 过期
      localStorage.removeItem(name)
      return null
    } else {
      return obj.data
    }
  }
  // 清空
  clear(name: string) {
    if (name) {
      // 删除指定项
      localStorage.removeItem(name)
    } else {
      // 清空全部
      localStorage.clear()
    }
  }
}
