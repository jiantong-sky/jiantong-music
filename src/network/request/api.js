import { request } from './request'

export const getList = (params) => request({
  type: 'get',
  url: '/search/suggest',
  params
})
