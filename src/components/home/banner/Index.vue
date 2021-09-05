<template>
    <div class="banner">
        <el-carousel :interval="4000" type="card" height="200px" trigger="click">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                <img :src="item.imageUrl + '?param=600y200'" alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bannerList: null,
        }
    },
    // 生命周期函数
    created() {
        this.getBannerList()
    },
    methods: {
        async getBannerList() {
            const data = await this.$http.getBannerList()
            if (data.code !== 200) return this.$message.error('轮播图图片不见啦！')
            // console.log(data.banners)
            this.bannerList = data.banners
        },
    },
}
</script>

<style lang="less" scoped>
.banner {
    width: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>

