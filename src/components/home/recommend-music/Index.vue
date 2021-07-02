<template>
    <div class="music">
        <h4>推荐新歌曲</h4>
        <song-list :songList="songdetails"></song-list>
    </div>
</template>

<script>
import songList from '@/components/common/songList/Index'
import { createSong } from '@/model/song.js'
export default {
    data() {
        return {
            // 新音乐数据
            newMusicList: [],
            // 获取的新音乐的详情数据
            songdetails: [],
        }
    },
    // 生命周期函数
    created() {
        this.getNewMusic()
    },
    mounted() {},
    methods: {
        // 获取推荐新音乐
        async getNewMusic() {
            const data = await this.$http.getRecommendMusic()
            if (data.code === 200) {
                let list = []
                this.newMusicList = data.result
                data.result.map(item => {
                    list.push(item.id)
                })
                this.getSongDetail(list)
            }
            // console.log(data)
        },
        // 获取歌曲列表详情信息
        async getSongDetail(ids) {
            ids = ids.join(',')
            const data = await this.$http.getSongDetail({ ids })
            // console.log(data)
            this.songdetails = this.proSongData(data.songs)
            // console.log(this.songdetails)
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
    },
    components: {
        songList,
    },
}
</script>

<style lang="less" scoped>
.music {
    margin: 20px 0 10px;
    h4 {
        font-weight: normal;
        margin: 20px 0;
    }
}
</style>

