<template>
    <div class="container main" v-loading.body="loading">
        <div class="module">
            <h2 class="title">云音乐特色榜</h2>
            <song-sheet :sheetList="featureList"></song-sheet>
        </div>
        <div class="module">
            <h2 class="title">全球媒体榜</h2>
            <song-sheet :sheetList="globalList"></song-sheet>
        </div>
    </div>
</template>

<script>
import songSheet from '@/components/common/songSheet/Index'
export default {
    data() {
        return {
            ranks: [],
            loading: false,
        }
    },
    // 生命周期函数
    created() {
        this.getTopList()
    },
    methods: {
        async getTopList() {
            this.loading = true
            const data = await this.$http.getTopList()
            // console.log(data)
            if (data.code === 200) {
                this.ranks = data.list
                this.loading = false
                // console.log(this.ranks)
            } else {
                this.$message.error('加载失败')
            }
        },
    },
    computed: {
        featureList() {
            const list = this.ranks.slice(0, 4)
            list.map(item => {
                item.picUrl = item.coverImgUrl
            })
            return list
        },
        globalList: function () {
            const list = this.ranks.slice(4, this.ranks.length)
            list.map(item => {
                item.picUrl = item.coverImgUrl
            })
            return list
        },
    },
    components: {
        songSheet,
    },
}
</script>

<style lang="less" scoped>
.module {
    .title {
        position: relative;
        padding-left: 15px;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 400;
        &::before {
            content: '';
            width: 3px;
            height: 20px;
            background: #f56c6c;
            position: absolute;
            left: 0;
            top: 1px;
        }
    }
}
</style>

