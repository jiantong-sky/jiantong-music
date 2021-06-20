<template>
    <transition name="slide-fade">
        <div class="aplayer" v-show="playStatus">
            <div class="audio container">
                <div class="play">
                    <i class="flex-row iconfont icon-yinle-gongnengkongzhi-shangyishouxxhdpi" @click="lastSong"></i>
                    <div
                        class="flex-row iconfont icon-yinle-gongnengkongzhi-bofangxxhdpi"
                        @click="musicPause"
                        v-if="isPlay"
                    ></div>
                    <div
                        class="flex-row iconfont icon-yinle-gongnengkongzhi-zantingxxhdpi"
                        v-else
                        @click="musicPlay"
                    ></div>
                    <i class="flex-row iconfont icon-yinle-gongnengkongzhi-xiayishouxxhdpi" @click="nextSong"></i>
                </div>
                <div class="progress">
                    <div class="cover flex-row">
                        <img :src="playInfo.image" />
                    </div>
                    <!-- <div class="audio">
                        <h2>
                            {{ playInfo.name }}<span>{{ playInfo.singer }}</span>
                        </h2> -->
                    <audio
                        autoplay="autoplay"
                        ref="audio"
                        :src="playInfo.url"
                        @ended="audioEnd"
                        @pause="audioPaused"
                        @playing="audioReady"
                        @timeupdate="updateTime"
                        @error="error"
                        @waiting="waiting"
                    ></audio>
                    <!-- </div> -->

                    <div class="info">
                        <div class="top">
                            <h2>
                                {{ playInfo.name }}<span>{{ playInfo.singer }}</span>
                            </h2>
                            <span v-if="playInfo.duration">
                                {{ formatTime(currentTime) }} /
                                {{ formatTime(playInfo.duration) }}
                            </span>
                            <span v-else> 00:00 / 00:00 </span>
                        </div>
                        <div class="bottom">
                            <el-slider
                                v-model="value1"
                                :format-tooltip="formatTooltip"
                                @change="musicPace"
                                @input="dragProgress"
                                :step="progressStep"
                            ></el-slider>
                        </div>
                    </div>
                </div>

                <div class="operation">
                    <div class="voice">
                        <span class="iconfont icon-sound-filling" v-if="!isMuted" @click="audioMute"></span>
                        <span class="iconfont icon-sound-Mute" v-else @click="audioOpen"></span>
                        <div>
                            <el-slider v-model="volume"></el-slider>
                        </div>
                    </div>
                    <div class="seting flex-row">
                        <span class="iconfont icon-ttpodicon" v-show="isOrder" @click="orderPlay"></span>
                        <span class="iconfont icon-xunhuanbofang" v-show="isLoop" @click="loopPlay"></span>
                        <span class="iconfont icon-ttpodicon1" v-show="isRandom" @click="randomPlay"></span>
                        <span class="iconfont icon-bofangliebiao"></span>
                        <span class="iconfont icon-geci"></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            // 控制进度条(音乐进度)
            value1: 0,
            value2: 0,
            // 音量进度(默认音量)
            volume: 50,
            // 当前音乐播放时的时长
            currentTime: 0,
            // 拖动进度条后的播放时长
            afterCurrentTime: 0,
            // 当前要播放的歌曲
            currentSong: {},
            // 控制播放和暂停图标
            isPlay: true,
            // 进度条步长
            progressStep: 1,
            // 控制显示否静音的图标( true 为静音)
            isMuted: false,
            // 控制音乐，顺序、循环、随机播放
            isOrder: true,
            isLoop: false,
            isRandom: false,
        }
    },
    // 生命周期函数
    created() {},
    mounted() {},
    methods: {
        ...mapMutations(['setPlayIndex']),
        // 格式化时间
        formatTime(interval) {
            interval = interval | 0
            const m = (interval / 60) | 0
            const s = interval % 60
            return `${this.utils.formatZero(m, 2)}:${this.utils.formatZero(s, 2)}`
        },
        // 点击暂停播放
        musicPause() {
            this.$refs.audio.pause()
            this.isPlay = !this.isPlay
        },
        // 点击播放
        musicPlay() {
            this.$refs.audio.play()
            this.isPlay = !this.isPlay
        },
        // 点击下一曲
        nextSong() {
            const index = this.changePlay('nextSong')
            this.setPlayIndex(index)
        },
        // 点击上一曲
        lastSong() {
            const index = this.changePlay('lastSong')
            this.setPlayIndex(index)
        },
        // 音频播放完毕后触发
        audioEnd() {
            const playPromise = this.$refs.audio.play()
            if (playPromise) {
                playPromise
                    .then(() => {
                        this.nextSong()
                        // 当播完音乐播完自动播放下一曲时将进度条清零
                        this.value1 = 0
                        this.value2 = 0
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        // 暂停播放时触发
        audioPaused() {
            this.isPlay = false
        },
        // 开始播放时触发
        audioReady() {
            this.isPlay = true
        },
        // 音频文件就绪后开始播放时触发
        updateTime() {
            this.$nextTick(() => {
                this.$refs.audio.volume = this.volume / 100
                this.currentTime = this.$refs.audio.currentTime
                // 设置音乐进度条处于哪个位置
                if (this.value1 == this.value2) {
                    this.value1 = this.currentTime * this.progressStep
                    this.value2 = this.currentTime * this.progressStep
                }
                // console.log(this.$refs.audio.currentTime)
                // 设置步长
                const time = this.playInfo.duration
                this.step(time)
                // console.log(this.$refs.audio.volume)

                if (this.currentTime == this.playInfo.duration) {
                    this.nextSong()
                }
            })
        },
        // 设置音乐进度条步长
        step(time) {
            this.progressStep = 100 / time
            // console.log(this.progressStep)
        },
        // 进度条显示时长
        formatTooltip() {
            const time = this.formatTime(this.afterCurrentTime)
            return time
        },
        // 改变进度条显示时长(拖动进度条时触发)
        dragProgress(val) {
            this.afterCurrentTime = val / this.progressStep
        },
        // 改变进度条停止后触发
        musicPace(val) {
            this.value2 = this.value1
            this.$refs.audio.currentTime = this.afterCurrentTime
        },
        // 音频加载失败时触发
        error() {
            this.$refs.audio.pause()
            this.isPlay = !this.isPlay
            this.$message.error('加载异常')
        },
        // 缓存下一帧停止时触发
        waiting() {
            const isPaused = this.$refs.audio.paused
            if (isPaused) {
                this.$message.info('正在加载音频......')
            }
        },
        // 点击静音
        audioMute() {
            this.isMuted = true
            this.$refs.audio.muted = true
        },
        // 点击开启声音
        audioOpen() {
            this.isMuted = false
            this.$refs.audio.muted = false
        },
        // 点击切换为循环播放
        orderPlay() {
            this.isOrder = false
            this.isLoop = true
        },
        // 点击切换为随机播放
        loopPlay() {
            this.isLoop = false
            this.isRandom = true
        },
        // 点击切换为顺序播放
        randomPlay() {
            this.isRandom = false
            this.isOrder = true
        },
        // 改变歌曲播放顺序
        changePlay(text) {
            const len = this.playList.length
            let last = this.playIndex > 0 ? this.playIndex - 1 : len - 1
            let next = this.playIndex < len - 1 ? this.playIndex + 1 : 0
            let index = 0
            // 顺序播放
            if (this.isOrder) {
                switch (text) {
                    case 'lastSong':
                        index = last
                        break
                    case 'nextSong':
                        index = next
                        break
                }
            }
            // 循环播放
            if (this.isLoop) {
                index = this.playIndex
            }
            // 随机播放
            if (this.isRandom) {
                index = this.utils.getRandomInt(0, len - 1)
            }
            return index
        },
    },
    computed: {
        ...mapState(['playStatus', 'playIndex']),
        ...mapGetters(['playList', 'selectPlay']),
        // 处理当前音乐
        playInfo() {
            this.currentSong = this.selectPlay
            return this.currentSong
        },
    },
    watch: {
        // 监听当前播放歌曲是否改变
        currentSong(data) {
            // 重新播放音频
            this.$refs.audio.play()
            this.isPlay = true
            // console.log(data)
            // console.log(this.$refs.audio.src)
        },
        volume(val) {
            val === 0 ? (this.isMuted = true) : (this.isMuted = false)
        },
    },
}
</script>

<style lang="less" scoped>
.aplayer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    width: 100%;
    height: 70px;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 999;
    .audio {
        display: flex;
        .play {
            height: 100%;
            flex: 15%;
            display: flex;
            .iconfont {
                font-size: 25px;
                color: #409eff;
                cursor: pointer;
            }
            i {
                flex: 20%;
            }
            div {
                flex: 60%;
            }
        }
        .progress {
            height: 100%;
            flex: 60%;
            display: flex;
            margin-left: 20px;
            .cover {
                flex: 10%;
                padding: 10px;
                img {
                    width: 60px;
                    // height: 100%;
                    border-radius: 5px;
                }
            }
            .audio {
                flex: 90%;
                padding: 0 30px 0 0;
                display: flex;
                align-items: center;
                h2 {
                    font-size: 14px;
                    flex: 30%;
                    span {
                        margin-left: 20px;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }
                audio {
                    flex: 70%;
                    border-radius: 0;
                }
            }
            .info {
                padding: 10px 20px 10px 20px;
                flex: 90%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .top {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 5px;
                    h2 {
                        font-size: 14px;
                        span {
                            margin-left: 20px;
                            font-size: 12px;
                            font-weight: 400;
                        }
                    }
                }
            }
        }
        .operation {
            height: 100%;
            flex: 25%;
            display: flex;
            .voice {
                flex: 55%;
                padding: 26px 20px 20px 50px;
                position: relative;
                span {
                    position: absolute;
                    top: 27px;
                    left: 12px;
                    font-size: 24px;
                    cursor: pointer;
                    color: #409eff;
                }
            }
            .seting {
                flex: 45%;
                span {
                    margin: 0 10px;
                    font-size: 25px;
                    cursor: pointer;
                    color: #409eff;
                }
            }
        }
    }
}
</style>

