import http from '@/utils/request'

// 国家统计
export const getRegionData = () => {
  return http({
    url: `/user/region`,
    method: 'get'
  })
}

// 单个国家数据
export const getOverview = (params) => {
  return http({
    url: `user/list`,
    method: 'get',
    params
  })
}

export const getFollowing = (params) => {
  return http({
    url: `user/following`,
    method: 'get',
    params
  })
}

export const searchUser = (params) => {
  return http({
    url: `user/query`,
    method: 'get',
    params
  })
}

export const getTotalCount = (params) => {
  return http({
    url: `user/count`,
    method: 'get',
    params
  })
}
