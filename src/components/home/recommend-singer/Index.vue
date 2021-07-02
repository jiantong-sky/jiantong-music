<template>
    <div class="singer">
        <h4>推荐歌手</h4>
        <ul>
            <singer-item :item="item" v-for="item in singers" :key="item.id"></singer-item>
        </ul>
    </div>
</template>

<script>
import singerItem from '@/components/common/singerItem/Index'
export default {
    data() {
        return {
            singers: [],
        }
    },
    // 生命周期函数
    created() {
        this.getHotSinger()
    },
    methods: {
        // 获取热门歌手列表
        async getHotSinger() {
            const data = await this.$http.getHotSinger()
            this.singers = data.artists
            // console.log(this.singers)
        },
    },
    components: {
        singerItem,
    },
}
</script>

<style lang="less" scoped>
.singer {
    margin: 20px 0 10px;
    h4 {
        font-weight: normal;
        margin: 20px 0;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        margin: 0px -15px 0;
    }
}
</style>

