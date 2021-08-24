<template>
    <div class="container main">
        <div class="search">
            <el-input placeholder="请输入内容" ref="searchRef" v-model="content" @keyup.enter.native="search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
        <div class="tab">
            <h2>搜索结果</h2>
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="单曲" name="1">
                    <div class="empty" v-if="songs == null"></div>
                    <artist-list
                        v-else
                        :songs="songs"
                        :playList="playList"
                        @modifyInfo="modifyInfo($event)"
                    ></artist-list>
                </el-tab-pane>
                <el-tab-pane label="歌手" name="100">
                    <div class="empty" v-if="artists == null"></div>
                    <ul class="singer" v-else>
                        <singer-item :item="item" v-for="item in artists" :key="item.id"></singer-item>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="专辑" name="10">
                    <div class="empty" v-if="albums == null"></div>
                    <album-list v-else :hotAlbums="albums"></album-list>
                </el-tab-pane>
                <el-tab-pane label="视频" name="1014">
                    <div class="empty" v-if="videos == null"></div>
                    <mv-list v-else :mvs="videos"></mv-list>
                </el-tab-pane>
                <el-tab-pane label="歌单" name="1000">
                    <div class="empty" v-if="playlists == null"></div>
                    <song-sheet v-else :sheetList="playlists"></song-sheet>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import artistList from '@/components/common/artistList/Index'
import singerItem from '@/components/common/singerItem/Index'
import albumList from '@/components/common/albumList/Index'
import mvList from '@/components/common/mvList/Index'
import songSheet from '@/components/common/songSheet/Index'
import { createSong } from '@/model/song.js'
export default {
    data() {
        return {
            content: '',
            activeName: '1',
            isEmpty: true,
            playList: [],
            songs: null,
            artists: null,
            albums: null,
            videos: null,
            playlists: null,
        }
    },
    // 生命周期函数
    created() {
        this.initialize()
    },
    methods: {
        // 初始化
        initialize() {
            let keywords = this.$route.query.keywords
            this.content = keywords
            this.getSearch(keywords)
        },
        // 搜索
        async getSearch(keywords) {
            if (keywords.trim() === '') return
            let params = {
                keywords,
                type: this.activeName,
            }
            const data = await this.$http.getSearch(params)
            if (data.code !== 200) return this.$message.error('搜索失败')
            // console.log(data.result)
            if (params.type === '1') this.handleSong(data.result)
            if (params.type === '100') this.artists = data.result.artists
            if (params.type === '10') this.albums = data.result.albums
            if (params.type === '1014') this.videos = data.result.videos
            if (params.type === '1000') this.playlists = data.result.playlists
        },
        // 单曲处理
        handleSong(data) {
            data.songs.map((item, index) => {
                item.state1 = true
                item.state2 = false
                item.state3 = false
                item.index = index
            })
            // console.log(data)
            this.songs = data.songs
            this.playList = this.proSongData(data.songs)
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
        // 点击搜索
        search() {
            if (this.content.trim() === '') return
            this.$router.push({
                path: '/search',
                query: {
                    keywords: this.content,
                },
            })
            this.$refs.searchRef.blur()
        },
        handleClick() {
            if (this.content == '') this.content = this.$route.query.keywords
            this.getSearch(this.content)
            // console.log(this.activeName)
        },
    },
    watch: {
        $route() {
            this.initialize()
        },
    },
    components: {
        artistList,
        singerItem,
        albumList,
        mvList,
        songSheet,
    },
}
</script>

<style lang="less" scoped>
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1200px;
    height: 250px;
    background: url(../../assets/img/灰原2.jpg) no-repeat center center;
    background-size: 100% auto;
    -moz-background-size: 100% auto;
    /deep/ .el-input-group {
        width: 500px;
        box-shadow: 0 0 5px 5px #f2f6fc;
    }
    /deep/ .el-input__inner {
        width: 500px;
        height: 50px;
        border: 0;
        outline: none;
        border-radius: 0;
    }
    /deep/ .el-input-group__append {
        border: 0;
        border-radius: 0;
        background-color: #fff;
    }
}
.tab {
    margin-top: 30px;
    h2 {
        margin-bottom: 15px;
    }
    .empty {
        margin-top: 10px;
        width: 100%;
        height: 500px;
        background: url(../../assets/img/empty.jpg) no-repeat top center;
        background-size: 800px 600px;
    }
    .singer {
        margin-top: 30px;
        li {
            float: left;
        }
    }
}
</style>

