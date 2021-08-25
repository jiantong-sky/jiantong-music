<template>
    <div class="container main">
        <banner></banner>
        <recommend-songs></recommend-songs>
        <recommend-music></recommend-music>
        <vue-lazy-component :timeout="1000">
            <recommend-singer></recommend-singer>
        </vue-lazy-component>
    </div>
</template>

<script>
import banner from '@/components/home/banner/Index'
import recommendSongs from '@/components/home/recommend-songs/Index'
import recommendMusic from '@/components/home/recommend-music/Index'
import recommendSinger from '@/components/home/recommend-singer/Index'
// 页面懒加载
import { component as VueLazyComponent } from '@xunlei/vue-lazy-component'

export default {
    data() {
        return {}
    },
    // 生命周期函数
    created() {
        window.localStorage.setItem('token', '')
        window.localStorage.setItem('cookie', '')
        window.localStorage.setItem('userInfo', '')
    },
    methods: {},
    components: {
        banner,
        recommendSongs,
        recommendMusic,
        recommendSinger,
        'vue-lazy-component': VueLazyComponent,
    },
}
</script>

<style lang="less" scoped>
</style>

