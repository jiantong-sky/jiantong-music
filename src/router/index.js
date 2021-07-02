import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/Index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: () => import('@/views/login/Index'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/',
		redirect: '/home',
		component: Layout,
		children: [
			{
				path: '/home',
				component: () => import('@/views/home/Index'),
				meta: {
					title: '首页'
				}
			},
			{
				path: '/rank',
				component: () => import('@/views/rank/Index'),
				meta: {
					title: '排行榜'
				}
			},
			{
				path: '/playlist',
				component: () => import('@/views/playlist/Index'),
				meta: {
					title: '歌单'
				}
			},
			{
				path: '/singer',
				component: () => import('@/views/singer/Index'),
				meta: {
					title: '歌手'
				}
			},
			{
				path: '/video',
				component: () => import('@/views/video/Index'),
				meta: {
					title: '视频'
				}
			},
			{
				path: '/mv',
				component: () => import('@/views/mv/Index'),
				meta: {
					title: 'mv'
				}
			},
			{
				path: '/playlistDetail',
				// name: '/playlistDetail',
				component: () => import('@/views/playlist/detail/Index'),
				meta: {
					title: '推荐歌单列表'
				}
			},
			{
				path: '/singerDetail',
				component: () => import('@/views/singer/detail/Index.vue'),
				meta: {
					title: '歌手详情'
				}
			}
		]
	},

]

const router = new VueRouter({
	routes
})

export default router
