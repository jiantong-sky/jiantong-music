<template>
    <div class="container">
        <div class="sheet">
            <ul>
                <li v-for="item in sheetList" :key="item.id" @click="playDetail(item.id)">
                    <div class="playCount">
                        <el-icon class="el-icon-caret-right"></el-icon>
                        <span>{{ item.playCount | playCount(item.playCount) }}</span>
                    </div>
                    <el-image lazy :src="item.picUrl" v-if="item.picUrl">
                        <div slot="placeholder" class="loading flex-row">
                            <el-icon class="el-icon-loading"></el-icon>
                        </div>
                    </el-image>
                    <el-image lazy :src="item.coverImgUrl" v-else>
                        <div slot="placeholder" class="loading flex-row">
                            <el-icon class="el-icon-loading"></el-icon>
                        </div>
                    </el-image>
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
            this.$router.push({
                path: '/playlistDetail',
                query: { id },
            })
        },
    },
    filters: {
        playCount(count) {
            if (count > 100000000) {
                return parseInt(count / 100000000) + '亿'
            } else if (count > 100000) {
                return parseInt(count / 10000) + '万'
            } else {
                return count
            }
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
            border-radius: 5px;
            box-shadow: 4px -4px 5px #dcdfe6;
            &:nth-child(9n) {
                margin-right: 0;
            }
            .el-image {
                width: 100%;
                border-radius: 5px;
                cursor: pointer;
                .loading {
                    width: 120px;
                    height: 120px;
                    font-size: 30px;
                }
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
                z-index: 1;
                span {
                    margin-left: 2px;
                }
            }
        }
    }
}
</style>

