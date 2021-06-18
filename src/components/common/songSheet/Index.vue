<template>
    <div class="container">
        <div class="sheet">
            <ul>
                <li v-for="item in sheetList" :key="item.id" @click="playDetail(item.id)">
                    <div class="playCount">
                        <el-icon class="el-icon-caret-right"></el-icon>
                        <span>{{ item.playCount | playCount(item.playCount) }}</span>
                    </div>
                    <img :src="item.picUrl" alt="" />
                    <span class="song-text">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        sheetList: {
            type: Array,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        // 跳转到歌单详情页面
        playDetail(id) {
            this.$router.push(`/playlistDetail?id=${id}`)
        },
    },
    filters: {
        playCount(count) {
            if (count > 100000) {
                return parseInt(count / 10000) + '万'
            }
            return count
        },
    },
}
</script>

<style lang="less" scoped>
.sheet {
    &:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        clear: both;
    }
    ul {
        li {
            margin: 0 15px 15px 0;
            position: relative;
            width: 120px;
            height: 170px;
            float: left;
            box-shadow: 5px -5px 5px #dcdfe6;
            &:nth-child(9n) {
                margin-right: 0;
            }
            img {
                width: 100%;
                border-radius: 5px;
                cursor: pointer;
            }
            .song-text {
                font-size: 13px;
                font-weight: bolder;
                letter-spacing: 1px;
                line-height: 20px;
                // 文字超出两行显示省略号
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .playCount {
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 2px;
                font-size: 10px;
                color: rgb(255, 255, 255);
                background-color: rgb(0, 0, 0);
                span {
                    margin-left: 2px;
                }
            }
        }
    }
}
</style>

