import http from '@/utils/request'

// 退出登录
export const logout = () => {
  return http({
    url: `/login/logout`,
    method: 'post'
  })
}

// 账号密码登录
export const accountLogin = (data) => {
  return http({
    url: `/login/account`,
    method: 'post',
    data
  })
}

// 短信验证码登录
export const smsLogin = (data) => {
  return http({
    url: `/login/sms`,
    method: 'post',
    data
  })
}

// 短信验证码验证
export const checkSmsLogin = (params) => {
  return http({
    url: `/login/sms/check`,
    method: 'get',
    params
  })
}

// 获取短信验证码
export const getSmsCode = (data) => {
  return http({
    url: `/login/sms-code`,
    method: 'post',
    data
  })
}

// 获取图形验证码
export const getCodeUrl = (userName) => {
  return `${import.meta.env.VITE_BASE_API}/login/code?userName=${userName}&time=${new Date().getTime()}`
}