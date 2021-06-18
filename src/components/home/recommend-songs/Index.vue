<template>
    <div class="song">
        <h4>推荐歌单</h4>
        <song-sheet :sheetList="personalized"></song-sheet>
    </div>
</template>

<script>
import songSheet from '@/components/common/songSheet/Index'
export default {
    data() {
        return {
            // 存放推荐歌单数据
            personalized: null,
            // 获取歌单的数量
            limit: 27,
        }
    },
    // 生命周期函数
    created() {
        this.getSongList()
    },
    methods: {
        async getSongList() {
            const data = await this.$http.getRecommendSong({ limit: this.limit })
            if (data.code === 200) {
                this.personalized = data.result
                // console.log(this.personalized)
            }
        },
    },
    components: {
        songSheet,
    },
}
</script>

<style lang="less" scoped>
.song {
    margin: 20px 0 10px;
    h4 {
        font-weight: normal;
    }
}
</style>

