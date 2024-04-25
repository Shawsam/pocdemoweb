import http from '@/utils/request'
//数据统计
export const userVisit = (data) => {
  return http({
    url: `/statistics/visit`,
    method: 'post',
    data
  })
}

// 信息
export const getWxUserInfo = (data) => {
  return http({
    url: `/user/wechat/info`,
    method: 'post',
    data
  })
}

// 信息
export const getUserInfo = () => {
  return http({
    url: `/user/info`,
    method: 'get'
  })
}

// 修改密码
export const setPwd = (data) => {
  return http({
    url: `/user/pwd`,
    method: 'post',
    data
  })
}

// 绑定手机号
export const bondingPhone = (params) => {
  return http({
    url: `/user/bonding/phone`,
    method: 'get',
    params
  })
}

// 绑定微信
export const bondingWechat = (data) => {
  return http({
    url: `/user/bonding/wechat`,
    method: 'post',
    data
  })
}

// 用户信息修改
export const userInfoEdit = (data) => {
  return http({
    url: `/user/edit`,
    method: 'post',
    data
  })
}

// 用户头像
export const getUserImg = (params) => {
  return http({
    url: `/user/img`,
    method: 'get',
    params
  })
}

// 剩余权益
export const userAuth = () => {
  return http({
    url: `/user/getUserAuth`,
    method: 'get',
  })
}
// 权益变更记录
export const queryLog = (params) => {
  return http({
    url: `/monitor/live/pageQueryLog`,
    method: 'post',
    params
  })
}

// 取消订单
export const cancelOrder = (orderId) => {
  return http({
    url: `/order/cancel?orderId=${orderId}`,
    method: 'post',
  })
}

// 产品列表
export const productList = () => {
  return http({
    url: `/product/list`,
    method: 'get',
  })
}
// 权益列表展示
export const allAuth = () => {
  return http({
    url: `/product/auth/list`,
    method: 'get',
  })
}

// 订单
export const order = (params) => {
  return http({
    url: `/order/getOrderPage`,
    method: 'post',
    params
  })
}

// 支付宝支付
export const alipayReq = (params) => {
  return http({
    url: `/pay/alipay/pay-order`,
    params
  })
}

// 支付宝支付Url
export const aliPayUrl = (token, productId, orderId = '') => {
  return `/api/pay/alipay/qr-code?token=${token}&productId=${productId}&orderId=${orderId}`
}

// 微信支付
export const wchartPayReq = (params) => {
  return http({
    url: `/pay/wechat/pay-order`,
    params
  })
}

// 微信支付
export const wechatPayUrl = (token, productId, orderId = '') => {
  return `/api/pay/wechat/qr-code?token=${token}&productId=${productId}&orderId=${orderId}`
}

// 剩余权益
export const getResidualInterest = (module, subModule) => {
  return http({
    url: `/user/auth/info?module=${module}&subModule=${subModule}`,
    method: 'get'
  })
}

// 剩余权益金额
export const getAuthmoney = (params) => {
  return http({
    url: `/user/auth/residue/money`,
    method: 'get',
    params
  })
}

// 升级会员
export const getAuthUpgrade = (params) => {
  return http({
    url: `/user/auth/upgrade`,
    method: 'get',
    params
  })
}