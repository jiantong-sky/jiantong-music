<template>
    <div class="main container">
        <div class="flex">
            <el-card class="play">
                <div class="play-top">
                    <div class="play-img">
                        <img :src="album.blurPicUrl + '?param=200y200'" />
                    </div>
                    <div class="play-info">
                        <h2>{{ album.name }}</h2>
                        <div class="play-author">
                            <el-avatar :size="30" :src="artist.picUrl + '?param=30y30'">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                            </el-avatar>
                            <span>{{ artist.name }}</span>
                            <span>{{ utils.dateFormat(album.publishTime, 'YYYY-MM-DD') }} 创建</span>
                        </div>
                        <div class="play-company">
                            <p>发行公司：{{ album.company }}</p>
                        </div>
                        <div class="play-content">
                            <p ref="content">{{ album.description }}</p>
                            <span v-if="contenLength(album.description) > 64" @click="whole"> 全部 > </span>
                        </div>
                    </div>
                </div>
                <artist-list :songs="songs" :playList="playList" @modifyInfo="modifyInfo($event)"></artist-list>
            </el-card>
            <div class="right">
                <el-card>
                    <div class="header">
                        <span>其他专辑</span>
                    </div>
                    <div class="related">
                        <div class="related-item" v-for="(item, index) in hotAlbums" :key="index">
                            <el-image :src="item.blurPicUrl"></el-image>
                            <div class="item-1">
                                <h4 class="ellipsis" @click="jump(item.id)">{{ item.name }}</h4>
                                <span>{{ item.artist.name }}</span>
                            </div>
                        </div>
                    </div>
                </el-card>
                <el-card>
                    <div class="header">
                        <span>精彩评论</span>
                    </div>
                    <div class="comments">
                        <ul>
                            <li class="item" v-for="(item, index) in hotComments" :key="index">
                                <el-avatar :size="45" :src="item.user.avatarUrl + '?param=45y45'">
                                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                                </el-avatar>
                                <div class="item-right">
                                    <h2>
                                        {{ item.user.nickname }}<small> · {{ utils.formatMsgTime(item.time) }}</small>
                                    </h2>
                                    <div class="item-right-bottom">{{ item.content }}</div>
                                </div>
                            </li>
                        </ul>
                        <p class="isComment" v-if="commentLength(hotComments) === 0">还没有评论哦！</p>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import ArtistList from '@/components/common/artistList/Index'
import { createSong } from '@/model/song.js'
export default {
    data() {
        return {
            // 专辑信息
            album: {},
            // 专辑歌曲
            songs: [],
            // 歌手信息
            artist: {},
            // 播放列表
            playList: [],
            // 歌手专辑
            hotAlbums: [],
            // 评论
            hotComments: [],
        }
    },
    // 生命周期函数
    created() {
        this.initialize()
    },
    methods: {
        // 初始化
        initialize() {
            let id = this.$route.query.id
            this.getAlbum(id)
            this.getCommentAlbum(id)
        },
        // 获取专辑评论
        async getCommentAlbum(id) {
            let params = {
                id,
            }
            const data = await this.$http.getCommentAlbum(params)
            if (data.code !== 200) return this.$message.error('获取专辑评论失败')
            this.hotComments = data.hotComments
            // console.log(data)
        },
        // 获取歌手专辑
        async getArtistAlbum() {
            let id = this.artist.id
            let params = {
                id,
                limit: 5,
            }
            const data = await this.$http.getArtistAlbum(params)
            if (data.code !== 200) return this.$message.error('获取歌手专辑失败')
            this.hotAlbums = data.hotAlbums
            // console.log(data)
        },
        // 获取专辑信息
        async getAlbum(id) {
            const data = await this.$http.getAlbum({ id })
            if (data.code !== 200) return this.$message.error('获取专辑信息失败')
            data.songs.map((item, index) => {
                item.state1 = true
                item.state2 = false
                item.state3 = false
                item.index = index
            })
            this.album = data.album
            this.songs = data.songs
            this.artist = data.album.artist
            this.playList = this.proSongData(data.songs)
            this.getArtistAlbum()
            // console.log(data)
        },
        // 处理歌曲数据
        proSongData(list) {
            let data = []
            list.map(item => {
                if (item.id) {
                    data.push(createSong(item))
                }
            })
            return data
        },
        modifyInfo(e) {
            this.songs.map(item => {
                if (item.index === e.index) {
                    item = e
                }
            })
        },
        whole() {
            this.$alert(this.album.description, this.album.name, {
                showConfirmButton: false,
                closeOnClickModal: true,
                customClass: 'descBox',
                dangerouslyUseHTMLString: true,
            }).catch(err => err)
        },
        // 点击相关推荐跳转歌单
        jump(id) {
            this.$router.push({
                path: '/albumDetail',
                query: { id },
            })
            // console.log(id)
        },
    },
    computed: {
        contenLength() {
            return function (txt) {
                if (txt) {
                    return txt.length
                }
            }
        },
        tagLength() {
            return function (tags) {
                if (tags) {
                    return tags.length
                }
            }
        },
        commentLength() {
            return function (comment) {
                if (comment) {
                    return comment.length
                }
            }
        },
    },
    watch: {
        $route() {
            this.initialize()
        },
    },
    components: {
        ArtistList,
    },
}
</script>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: space-between;
    .play {
        width: 850px;
        .play-top {
            display: flex;
            .play-img {
                flex: 30%;
                img {
                    width: 200px;
                    height: 200px;
                    border-radius: 10px;
                    box-shadow: 6px 6px 6px #dcdfe6;
                }
            }
            .play-info {
                flex: 80%;
                display: flex;
                flex-direction: column;
                padding: 10px 20px 0;
                width: 400px;
                height: 200px;
                h2 {
                    font-size: 24px;
                }
                .play-author {
                    margin: 15px 0;
                    display: flex;
                    align-items: center;
                    span {
                        margin: 0 10px 0 20px;
                        font-size: 14px;
                    }
                    span:first-child {
                        margin: 0;
                    }
                }
                .play-company {
                    margin-bottom: 15px;
                    font-size: 14px;
                }
                .play-content {
                    p {
                        // 文字超出两行显示省略号
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    span {
                        font-size: 13px;
                        cursor: pointer;
                        color: #f56c6c;
                    }
                }
            }
        }
    }
    .right {
        margin-left: 20px;
        width: 350px;
        .el-card {
            margin-bottom: 30px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            font-size: 14px;
            font-weight: 800;
            &::before {
                content: '';
                margin-right: 20px;
                display: inline-block;
                width: 3px;
                height: 22px;
                background-color: red;
            }
        }
        .related {
            display: flex;
            flex-wrap: wrap;
            .related-item {
                display: flex;
                margin-bottom: 20px;
                .el-image {
                    flex: 18%;
                    border-radius: 5px;
                }
                .item-1 {
                    flex: 82%;
                    display: flex;
                    flex-direction: column;
                    // flex-wrap: wrap;
                    // justify-content: space-between;
                    padding-left: 10px;
                    cursor: pointer;
                    .ellipsis {
                        padding-top: 5px;
                        font-weight: normal;
                        font-size: 14px;
                        // 文字超出一行显示省略号
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        &:hover {
                            color: #f56c6c;
                        }
                    }
                    span {
                        padding-top: 5px;
                        font-size: 12px;
                        color: #909399;
                    }
                }
            }
        }
        .comments {
            .item {
                display: flex;
                margin: 10px 0;
                .el-avatar {
                    margin-right: 10px;
                }
                .item-right {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    h2 {
                        padding: 10px 0;
                        font-size: 15px;
                        font-weight: 400;
                        small {
                            font-size: 12px;
                            color: #909399;
                        }
                    }
                    .item-right-bottom {
                        width: 230px;
                        padding: 10px;
                        font-size: 12px;
                        color: #909399;
                        background-color: #f2f6fc;
                    }
                }
            }
            .isComment {
                margin: 30px auto;
                text-align: center;
                color: #606266;
                font-size: 18px;
            }
        }
    }
}
</style>

