<template>
    <div class="mv-box">
        <ul>
            <li v-for="(item, index) in mvs" :key="index" @click="toMvDetail(item.id ? item.id : item.vid)">
                <div class="mv-header">
                    <img v-if="item.imgurl" :src="item.imgurl" alt="" />
                    <img v-if="item.cover" :src="item.cover" alt="" />
                    <img v-if="item.coverUrl" :src="item.coverUrl" alt="" />
                    <span class="mv-count" v-if="item.playCount">
                        <el-icon class="el-icon-caret-right"></el-icon>
                        {{ utils.tranNumber(item.playCount, 0) }}
                    </span>
                    <span class="mv-count" v-if="item.praisedCount">
                        <el-icon class="el-icon-caret-right"></el-icon>
                        {{ utils.tranNumber(item.praisedCount, 0) }}
                    </span>
                    <div class="mv-mask">
                        <span class="mv-artist">{{ item.artistName }}</span>
                        <span class="mv-tiem" v-if="item.duration">{{ utils.formatTime(item.duration) }}</span>
                        <span class="mv-tiem" v-else-if="item.playTime">{{ utils.formatTime(item.playTime) }}</span>
                    </div>
                    <div class="mv-play">
                        <span class="iconfont icon-yinle-gongnengkongzhi-zantingxxhdpi"></span>
                    </div>
                </div>
                <div class="mv-bottom" v-if="item.name">{{ item.name }}</div>
                <div class="mv-bottom" v-else-if="item.title">{{ item.title }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        mvs: {
            type: Array,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        toMvDetail(id) {
            // console.log(this.mvs)
            if (this.mvs[0].playCount) {
                this.$router.push({
                    path: '/mvDetail',
                    query: {
                        id,
                    },
                })
            } else {
                this.$router.push({
                    path: '/videoDetail',
                    query: {
                        id,
                    },
                })
            }
        },
    },
}
</script>

<style lang="less" scoped>
.mv-box {
    margin-top: 30px;
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            // flex: 25%;
            padding: 0 10px 40px;
            width: 300px;

            .mv-header {
                position: relative;
                width: 100%;
                height: 160px;
                cursor: pointer;
                &:hover {
                    .mv-play {
                        display: block;
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                }
                .mv-count {
                    position: absolute;
                    top: 5px;
                    right: 11px;
                    padding: 2px 8px 2px 5px;
                    background-color: #000;
                    color: #fff;
                    border-radius: 5px;
                    font-size: 8px;
                }
                .mv-mask {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 40px;
                    background-color: rgba(0, 0, 0, 0.5);
                    .mv-artist {
                        position: absolute;
                        top: 50%;
                        left: 15px;
                        transform: translate(0, -50%);
                        color: #fff;
                    }
                    .mv-tiem {
                        position: absolute;
                        top: 50%;
                        right: 15px;
                        transform: translate(0, -50%);
                        color: #fff;
                    }
                }
                .mv-play {
                    display: none;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background-color: red;
                    .iconfont {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: #fff;
                        font-size: 12px;
                    }
                }
            }
            .mv-bottom {
                margin-top: 10px;
                font-size: 14px;
                color: #606266;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>

