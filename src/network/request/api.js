import { request } from './request'

export const getList = (params) => request({
  type: 'get',
  url: '/search/suggest',
  params
})

//  登录接口
export const login = (params) => request({
  type: 'get',
  url: '/login/cellphone',
  params
})

// 获取个人信息
export const getUserInfo = (params) => request({
  type: 'get',
  url: '/user/detail',
  params
})

// 退出登录
export const logout = () => request({
  type: 'get',
  url: '/logout'
})

// 获取轮播图数据
export const getBannerList = () => request({
  type: 'get',
  url: '/banner'
})

// 获取推荐歌单
export const getRecommendSong = params => request({
  type: 'get',
  url: '/personalized',
  params
})

// 获取推荐新音乐
export const getRecommendMusic = params => request({
  type: 'get',
  url: '/personalized/newsong',
  params
})

// 获取歌曲详情
export const getSongDetail = params => request({
  type: 'get',
  url: '/song/detail',
  params
})

// 获取热门歌手
export const getHotSinger = () => request({
  type: 'get',
  url: `/top/artists?offset=0&limit=30`
})

// 获取排行榜内容
export const getTopList = () => request({
  type: 'get',
  url: '/toplist'
})

// 获取歌单详情内容
export const getPlayListInfo = params => request({
  type: 'get',
  url: '/playlist/detail',
  params
})

// 获取歌单收藏者
export const getPlayListSubscribers = params => request({
  type: 'get',
  url: '/playlist/subscribers',
  params
})

// 获取歌单相关推荐
export const getRelatedPlayList = params => request({
  type: 'get',
  url: '/related/playlist',
  params
})

// 获取歌单相关评论
export const getCommentPlayList = params => request({
  type: 'get',
  url: '/comment/playlist',
  params
})
