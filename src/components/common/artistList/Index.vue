<template>
    <div class="artist-box">
        <div class="artist-head">
            <div class="play-all item" @click="playAll">
                <el-icon class="el-icon-caret-right"></el-icon>
                <span>播放全部</span>
            </div>
            <!-- <div class="collection item">
                <el-icon class="el-icon-star-off"></el-icon>
                <el-icon class="el-icon-star-on" style="font-size: 17px" v-show="false"></el-icon>
                <span>收藏</span>
            </div> -->
        </div>
        <div class="artist-main">
            <el-table
                :data="songs"
                stripe
                @cell-mouse-enter="show"
                @cell-mouse-leave="hidden"
                @row-click="playMusic"
                lazy
            >
                <el-table-column type="index" label="序号" class-name="item-index" width="50px">
                    <template slot-scope="scope">
                        <span v-show="scope.row.state1">{{ scope.row.index | playIndex(scope.row.index) }}</span>
                        <span
                            class="iconfont icon-yinle-gongnengkongzhi-zantingxxhdpi"
                            v-show="scope.row.state2"
                        ></span>
                        <span class="iconfont icon-yinle-gongnengkongzhi-bofangxxhdpi" v-show="scope.row.state3"></span>
                    </template>
                </el-table-column>
                <el-table-column label="歌曲" width="260px" class-name="item-song">
                    <template slot-scope="scope">
                        <div class="item-song-box" :class="{ isColor: isColor(scope.row.index) }">
                            <el-image :src="scope.row.al.picUrl + '?param=40y40'" fit="fill">
                                <div slot="placeholder" class="image-slot">
                                    <el-icon class="el-icon-loading"></el-icon>
                                </div>
                            </el-image>
                            <div class="item-song-box-text">{{ scope.row.name }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="歌手" class-name="item-singer">
                    <template slot-scope="scope">
                        <div class="item-singer-name" :class="{ isColor: isColor(scope.row.index) }">
                            {{ scope.row.ar | singer(scope.row.ar) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="专辑" class-name="item-collection">
                    <template slot-scope="scope">
                        <span :class="{ isColor: isColor(scope.row.index) }">{{ scope.row.al.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="时长" width="80px">
                    <template slot-scope="scope">
                        <span :class="{ isColor: isColor(scope.row.index) }">
                            {{ utils.formatSecondTime(scope.row.dt / 1000) }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            // 歌曲索引
            musicIndex: null,
            // 当前播放项
            playItem: {},
        }
    },
    props: {
        // 歌曲列表详情数据
        songs: {
            type: Array,
        },
        // 播放列表
        playList: {
            type: Array,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        // 移入歌曲显示播放按钮
        show(row) {
            if (!row.state3) {
                row.state1 = false
                row.state2 = true
            }
            this.$emit('modifyInfo', row)
        },
        // 移出歌曲隐藏播放按钮
        hidden(row) {
            if (!row.state3) {
                if (this.musicIndex == row.index) {
                    row.state1 = false
                    row.state2 = true
                    row.state3 = false
                } else {
                    row.state1 = true
                    row.state2 = false
                    row.state3 = false
                }
                this.$emit('modifyInfo', row)
                return
            }
            this.$emit('modifyInfo', row)
        },
        // 点击播放音乐
        playMusic(row) {
            this.musicIndex = row.index
            this.$store.commit('setPlayIndex', row.index)
            if (row.state2) {
                // 播放音乐
                row.state2 = false
                row.state3 = true
                this.$store.commit('setIsPlay', true)
                this.$store.commit('setPlayStatus', true)
                this.$store.commit('setPlayList', this.playList)
                this.$store.commit('setPlayIndex', row.index)
            } else {
                // 暂停音乐
                row.state2 = true
                row.state3 = false
                this.$store.commit('setIsPlay', false)
            }
            // console.log(row)
        },
        // 改变当前播放行字体颜色
        isColor(index) {
            if (index == this.musicIndex) {
                return true
            } else {
                return false
            }
        },
        // 播放全部
        playAll() {
            const item = this.songs[0]
            item.state1 = false
            item.state2 = false
            item.state3 = true
            this.$emit('modifyInfo', item)
            this.$store.commit('setIsPlay', true)
            this.$store.commit('setPlayStatus', true)
            this.$store.commit('setPlayList', this.playList)
            this.$store.commit('setPlayIndex', 0)
        },
    },
    computeed: {},
    watch: {
        '$store.state.playIndex'(newIndex, oldIndex) {
            this.musicIndex = newIndex
            var item
            const isPlay = this.$store.state.isPlay
            if (oldIndex === -1) {
                item = this.songs[newIndex]
                return
            } else {
                item = this.songs[oldIndex]
                item.state1 = true
                item.state2 = false
                item.state3 = false
                this.$emit('modifyInfo', item)
            }
            item = this.songs[newIndex]
            item.state1 = false
            item.state2 = !isPlay
            item.state3 = isPlay
            this.$emit('modifyInfo', item)
        },
        '$store.state.isPlay'(newState) {
            var item = this.songs[this.musicIndex]
            item.state2 = !newState
            item.state3 = newState
            this.$emit('modifyInfo', item)
        },
    },
    filters: {
        playIndex(index) {
            if (index < 9) {
                return '0' + (index + 1)
            } else {
                return index + 1
            }
        },
        singer(info) {
            if (info.length < 1) {
                return info[0].name
            } else {
                const name = []
                info.map(item => {
                    name.push(item.name)
                })
                return name.join('/')
            }
        },
    },
}
</script>

<style lang="less" scoped>
.artist-box {
    .artist-head {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
        height: 40px;
        // background-color: pink;
        .item {
            padding: 0 12px 0 10px;
            height: 100%;
            border-radius: 40px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            span {
                margin-left: 5px;
            }
        }
        .play-all {
            background-color: #f56c6c;
        }
        .collection {
            margin-left: 15px;
            color: #606266;
            background-color: #dcdfe6;
        }
    }
    .artist-main {
        cursor: pointer;
        .item-index {
            .iconfont {
                color: #f56c6c;
                font-size: 15px;
            }
        }
        .item-song {
            .item-song-box {
                display: flex;
                .el-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                    .image-slot {
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        line-height: 40px;
                    }
                }
                .item-song-box-text {
                    width: 200px;
                    padding-left: 10px;
                    line-height: 40px;
                    // 文字超出一行显示省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .item-singer {
            .item-singer-name {
                // 文字超出一行显示省略号
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
        .item-collection {
            span {
                // 文字超出一行显示省略号
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
    .isColor {
        color: #f56c6c;
    }
}
</style>

