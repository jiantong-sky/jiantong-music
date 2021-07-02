<template>
    <div class="main container" v-loading.fullscreen.lock="loading">
        <div class="flex">
            <el-card class="play">
                <div class="play-top">
                    <div class="play-img">
                        <el-image :src="playListDetail.img"></el-image>
                    </div>
                    <div class="play-info">
                        <h2>{{ playListDetail.name }}</h2>
                        <div class="play-author">
                            <el-avatar :size="30" :src="author.avatarUrl">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                            </el-avatar>
                            <span>{{ author.nickname }}</span>
                            <span>{{ utils.dateFormat(playListDetail.createTime, 'YYYY-MM-DD') }} 创建</span>
                        </div>
                        <div class="play-tag" v-if="tagLength(playListDetail.tags) > 0">
                            <span>标签: </span>
                            <el-tag
                                type="danger"
                                effect="dark"
                                size="small"
                                v-for="(item, index) in playListDetail.tags"
                                :key="index"
                            >
                                {{ item }}
                            </el-tag>
                        </div>
                        <div class="play-content">
                            <p ref="content">{{ playListDetail.description }}</p>
                            <span v-if="contenLength(playListDetail.description) > 64" @click="whole"> 全部 > </span>
                        </div>
                    </div>
                </div>
                <artist-list
                    :songs="songs"
                    :playList="playList"
                    @modifyInfo="modifyInfo($event)"
                    v-loading.body="loading1"
                ></artist-list>
            </el-card>
            <div class="right">
                <el-card>
                    <div class="header">
                        <span>喜欢这个歌单的人</span>
                    </div>
                    <div class="userProfile">
                        <el-avatar
                            shape="square"
                            :size="40"
                            :src="item.avatarUrl"
                            v-for="(item, index) in subscribers"
                            :key="index"
                        >
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                    </div>
                </el-card>
                <el-card>
                    <div class="header">
                        <span>相关歌单推荐</span>
                    </div>
                    <div class="related">
                        <div class="related-item" v-for="(item, index) in relatedPlayList" :key="index">
                            <el-image :src="item.coverImgUrl"></el-image>
                            <div class="item-1">
                                <h4 class="ellipsis" @click="jump(item.id)">{{ item.name }}</h4>
                                <span>{{ item.creator.nickname }}</span>
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
                            <li class="item" v-for="(item, index) in commentPlayList" :key="index">
                                <el-avatar :size="45" :src="item.user.avatarUrl">
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
                        <p class="isComment" v-if="commentLength(commentPlayList) === 0">还没有评论哦！</p>
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
            loading: false,
            loading1: false,
            // 播放列表
            playList: [],
            // 歌单id
            playListId: '',
            // 歌单所有信息
            playListInfo: [],
            // 歌单信息
            playListDetail: {},
            // 歌单作者信息
            author: {},
            // 收藏这个歌单的人数
            s: 32,
            // 收藏这个歌单的人
            subscribers: [],
            // 相关歌单推荐
            relatedPlayList: [],
            // 歌单评论
            commentPlayList: [],
            // 歌曲列表
            songs: [],
        }
    },
    // 生命周期函数
    created() {
        // 歌单id
        const id = this.$route.query.id
        this.playListId = id
        this.initialize(id)
    },
    methods: {
        // 初始化
        initialize(id) {
            this.getPlayListInfo(id)
            this.getPlayListSubscribers(id)
            this.getRelatedPlayList(id)
            this.getCommentPlayList(id)
        },
        async getPlayListInfo(id) {
            // 开启页面加载
            this.loading = true
            // 收藏这个歌单的人数
            const s = this.s
            const data = await this.$http.getPlayListInfo({ id, s })
            if (data.code !== 200) return this.$message.error('加载失败')
            this.playListInfo = data.playlist
            // 截取歌单信息
            this.getPlayListDetail(data.playlist)
            // 截取歌单作者信息
            this.getPlayListAuthor(data.playlist.creator)
            // 截取歌曲id
            const ids = []
            this.getSongDetail(data.playlist.trackIds)
            // 关闭页面加载
            this.loading = false
            // console.log(data)
        },
        // 截取歌单信息
        getPlayListDetail(detail) {
            const info = {}
            info.img = detail.coverImgUrl
            info.name = detail.name
            info.author = detail.creator
            info.createTime = detail.createTime
            info.tags = detail.tags
            info.description = detail.description
            this.playListDetail = info
            // console.log(this.playListDetail)
        },
        // 截取歌单作者信息
        getPlayListAuthor(author) {
            this.author = author
        },
        // 获取歌单收藏者
        async getPlayListSubscribers(id) {
            const data = await this.$http.getPlayListSubscribers({
                id,
                limit: 28,
            })
            if (data.code !== 200) return this.$message.error('获取歌单收藏者失败')
            this.subscribers = data.subscribers
            // console.log(data)
        },
        // 获取歌单相关推荐
        async getRelatedPlayList(id) {
            const data = await this.$http.getRelatedPlayList({ id })
            if (data.code !== 200) return this.$message.error('获取相关推荐失败')
            this.relatedPlayList = data.playlists
            // console.log(data)
        },
        // 获取歌单评论
        async getCommentPlayList(id) {
            const data = await this.$http.getCommentPlayList({ id, limit: 28 })
            if (data.code !== 200) return this.$message.error('获取评论失败')
            this.commentPlayList = data.comments
            // console.log(data)
        },
        // 获取歌曲详情
        async getSongDetail(trackIds) {
            this.loading1 = true
            let ids = []
            trackIds.map(item => {
                ids.push(item.id)
            })
            const data = await this.$http.getSongDetail({ ids: ids.join(',') })
            if (data.code !== 200) return this.$message.error('获取歌单歌曲失败')
            data.songs.map((item, index) => {
                item.state1 = true
                item.state2 = false
                item.state3 = false
                item.index = index
            })
            this.songs = data.songs
            this.playList = this.proSongData(data.songs)
            this.loading1 = false
            // console.log(this.songs)
            // console.log(this.playList)
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
        // 点击相关推荐跳转歌单
        jump(id) {
            this.$router.push({
                path: '/playlistDetail',
                query: { id },
            })
            // console.log(id)
        },
        whole() {
            this.$alert(this.playListDetail.description, this.playListDetail.name, {
                showConfirmButton: false,
            }).catch(err => err)
        },
        modifyInfo(e) {
            this.songs.map(item => {
                if (item.index === e.index) {
                    item = e
                }
            })
        },
    },
    watch: {
        $route(newId, oldId) {
            // console.log(newId, oldId)
            let id = this.$route.query.id || newId.query.id
            if (id) {
                this.initialize(id)
            }
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
                .el-image {
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
                .play-tag {
                    font-size: 14px;
                    margin: 5px 0 15px;
                    .el-tag {
                        margin: 0 10px 0 15px;
                        cursor: pointer;
                    }
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
        .userProfile {
            .el-avatar {
                margin-right: 3px;
            }
            .el-avatar:nth-child(7n) {
                margin: 0;
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
                    flex-wrap: wrap;
                    justify-content: space-between;
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

