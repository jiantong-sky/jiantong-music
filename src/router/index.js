import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/Index'

Vue.use(VueRouter)

// 解决重复路由不报错
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

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
			},
			{
				path: '/albumDetail',
				component: () => import('@/views/album/Index'),
				meta: {
					title: '专辑'
				}
			},
			{
				path: '/mvDetail',
				component: () => import('@/views/mv/detail/Index'),
				meta: {
					title: 'MV详情'
				}
			},
			{
				path: '/videoDetail',
				component: () => import('@/views/video/detail/Index'),
				meta: {
					title: '视频详情'
				}
			}
		]
	},

]

const router = new VueRouter({
	routes,
	// 解决路由跳转后页面不显示在首行
	scrollBehavior() {
		return { x: 0, y: 0 }
	}
})

export default router
