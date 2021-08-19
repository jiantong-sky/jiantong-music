<template>
    <div class="main container">
        <div class="singer-box" v-loading.body="loading" element-loading-background="rgba(255, 255, 255, 1)">
            <div class="singer-bg"></div>
            <div class="singer-cover">
                <img :src="singerInfo.cover" alt="" />
                <h2>{{ singerInfo.name }}</h2>
            </div>
            <div class="singer-info">
                <h4>{{ singerInfo.briefDesc }}</h4>
            </div>
            <div class="singer-att">
                <ul>
                    <li>
                        <span>{{ singerInfo.musicSize }}</span>
                        <p>单曲数</p>
                    </li>
                    <li>
                        <span>{{ singerInfo.albumSize }}</span>
                        <p>专辑数</p>
                    </li>
                    <li>
                        <span>{{ singerInfo.mvSize }}</span>
                        <p>MV数</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="singer-tab">
            <el-tabs value="works" stretch @tab-click="handleClick">
                <el-tab-pane label="作品" name="works">
                    <artist-list :songs="hotSongs" :playList="playList" @modifyInfo="modifyInfo($event)"></artist-list>
                </el-tab-pane>
                <el-tab-pane label="专辑" name="album">
                    <album-list
                        :hotAlbums="hotAlbums"
                        v-loading="alLoad"
                        element-loading-background="rgba(255, 255, 255, 1)"
                    ></album-list>
                </el-tab-pane>
                <el-tab-pane label="MV" name="mv">
                    <mv-list :mvs="mvs"></mv-list>
                </el-tab-pane>
                <el-tab-pane label="歌手详情" name="singerInfo">
                    <div class="singer-info">
                        <h2>{{ singerInfo.name }}简介</h2>
                        <div class="sever"></div>
                        <p>{{ singerInfo.briefDesc }}</p>
                        <ul>
                            <li v-for="(item, index) in introduction" :key="index">
                                <h3>{{ item.ti }}</h3>
                                <p>{{ item.txt }}</p>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="相似歌手" name="reSinger">
                    <ul class="singer-item">
                        <singer-item v-for="(item, index) in artists" :key="index" :item="item"></singer-item>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { createSong } from '@/model/song.js'
import ArtistList from '@/components/common/artistList/Index'
import SingerItem from '@/components/common/singerItem/Index'
import AlbumList from '@/components/common/albumList/Index'
import MvList from '@/components/common/mvList/Index'

export default {
    data() {
        return {
            // 歌手ID
            singerId: null,
            // 歌手详情
            singerInfo: {},
            // 歌手描述
            introduction: [],
            // 歌手单曲
            hotSongs: [],
            // 歌手专辑
            hotAlbums: [],
            // 歌手MV
            mvs: [],
            // 相似歌手
            artists: [],
            // 播放列表
            playList: [],
            loading: false,
            alLoad: false,
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
            this.singerId = id
            this.getArtistDetail(id)
            this.getArtistDesc(id)
            this.getArtists(id)
            this.getSimiArtist(id)
            setTimeout(() => {
                this.getArtistAlbum(id)
                this.getArtistMv(id)
            }, 500)
        },
        // 获取歌手详情
        async getArtistDetail(id) {
            const data = await this.$http.getArtistDetail({ id })
            if (data.code !== 200) return this.$message.error('获取歌手信息失败')
            this.singerInfo = data.data.artist
            this.albumSize = this.singerInfo.albumSize
            // console.log(this.singerInfo)
            // console.log(data)
        },
        // 获取歌手描述
        async getArtistDesc(id) {
            const data = await this.$http.getArtistDesc({ id })
            if (data.code !== 200) return this.$message.error('获取歌手描述失败')
            this.introduction = data.introduction
            // console.log(data)
        },
        // 获取歌手单曲
        async getArtists(id) {
            const data = await this.$http.getArtists({ id })
            if (data.code !== 200) return this.$message.error('获取歌手单曲失败')
            data.hotSongs.map((item, index) => {
                item.state1 = true
                item.state2 = false
                item.state3 = false
                item.index = index
            })
            this.hotSongs = data.hotSongs
            this.playList = this.proSongData(data.hotSongs)
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
            this.hotSongs.map(item => {
                if (item.index === e.index) {
                    item = e
                }
            })
        },
        // 获取歌手专辑
        async getArtistAlbum(id) {
            let params = {
                id,
                limit: this.singerInfo.albumSize,
            }
            const data = await this.$http.getArtistAlbum(params)
            if (data.code !== 200) return this.$message.error('获取歌手专辑失败')
            this.hotAlbums = data.hotAlbums
            // console.log(data)
        },
        // 获取歌手MV
        async getArtistMv(id) {
            let params = {
                id,
                limit: this.singerInfo.mvSize,
            }
            const data = await this.$http.getArtistMv(params)
            if (data.code !== 200) return this.$message.error('获取歌手MV失败')
            this.mvs = data.mvs
            // console.log(data)
        },
        // 获取相似歌手
        async getSimiArtist(id) {
            const data = await this.$http.getSimiArtist({ id })
            if (data.code !== 200) return this.$message.error('获取相似歌手失败')
            this.artists = data.artists
            // console.log(data)
        },
        handleClick(ref) {
            if (ref.name == 'album') {
                this.alLoad = true
                setTimeout(() => {
                    this.alLoad = false
                }, 500)
            }
            // console.log(val)
        },
    },
    computed: {},
    watch: {
        $route() {
            this.loading = true
            this.initialize()
            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
    },
    components: {
        ArtistList,
        SingerItem,
        AlbumList,
        MvList,
    },
}
</script>

<style lang="less" scoped>
.singer-box {
    position: relative;
    height: 550px;
    .singer-bg {
        height: 550px;
        background: url(../../../assets/img/music.jpg) center center;
        background-size: 100% 100%;
        border-radius: 20px;
    }
    .singer-cover {
        width: 120px;
        // height: 160px;
        position: absolute;
        top: 70px;
        left: 50%;
        transform: translate(-50%);
        z-index: 2;
        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 0 4px 4px #fff;
        }
        h2 {
            margin-top: 2px;
            text-align: center;
            color: #fff;
        }
    }
    .singer-info {
        position: absolute;
        bottom: 170px;
        left: 50%;
        transform: translate(-50%);
        padding-left: 5px;
        width: 600px;
        background-color: rgba(32, 32, 32, 0.2);
        border-radius: 10px;
        z-index: 2;
        h4 {
            color: rgba(255, 255, 255, 0.8);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
    .singer-att {
        position: absolute;
        bottom: 65px;
        left: 50%;
        transform: translate(-50%);
        width: 600px;
        ul {
            display: flex;
            li {
                flex: 1;
                color: #fff;
                text-align: center;
                span {
                    font-size: 20px;
                }
                p {
                    font-size: 14px;
                    color: #dcdfe6;
                }
            }
        }
    }
}
.singer-tab {
    margin-top: 20px;
    .singer-info {
        padding-top: 30px;
        h2 {
            color: #303133;
            text-align: center;
            font-size: 18px;
        }
        .sever {
            margin-left: 50%;
            margin-top: 5px;
            transform: translate(-50%);
            width: 150px;
            height: 2px;
            background: -webkit-linear-gradient(left, red, pink, skyblue, orange);
        }
        p {
            margin-top: 20px;
            color: #606266;
            text-indent: 2em;
            letter-spacing: 1px;
            font-size: 14px;
        }
        h3 {
            margin-top: 30px;
            color: #606266;
            font-size: 16px;
        }
    }
    .singer-item {
        margin-top: 30px;
        li {
            margin-top: 5px;
            float: left;
        }
    }
}
</style>

