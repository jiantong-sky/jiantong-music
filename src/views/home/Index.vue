<template>
    <div class="container main">
        <banner></banner>
        <recommend-songs></recommend-songs>
        <recommend-music></recommend-music>
        <recommend-singer></recommend-singer>
    </div>
</template>

<script>
import banner from '@/components/home/banner/Index'
import recommendSongs from '@/components/home/recommend-songs/Index'
import recommendMusic from '@/components/home/recommend-music/Index'
import recommendSinger from '@/components/home/recommend-singer/Index'
export default {
    data() {
        return {}
    },
    // 生命周期函数
    created() {},
    methods: {},
    components: {
        banner,
        recommendSongs,
        recommendMusic,
        recommendSinger,
    },
}
</script>

<style lang="less" scoped>
</style>

