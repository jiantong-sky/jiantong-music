<template>
    <transition name="slide-fade">
        <div class="aplayer">
            <div class="audio container">
                <div class="play">
                    <i class="flex-row iconfont icon-yinle-gongnengkongzhi-shangyishouxxhdpi"></i>
                    <div class="flex-row iconfont icon-yinle-gongnengkongzhi-bofangxxhdpi"></div>
                    <div class="flex-row iconfont .icon-yinle-gongnengkongzhi-zantingxxhdpi" v-show="false"></div>
                    <i class="flex-row iconfont icon-yinle-gongnengkongzhi-xiayishouxxhdpi"></i>
                </div>
                <div class="progress">
                    <div class="cover flex-row">
                        <el-image src=""></el-image>
                    </div>
                    <div class="info">
                        <div class="top">
                            <h2>123 <span>234</span></h2>
                            <span>123</span>
                        </div>
                        <div class="bottom">
                            <el-slider :show-tooltip="false" v-model="value1"></el-slider>
                        </div>
                    </div>
                </div>
                <audio src=""></audio>
                <div class="operation">
                    <div class="voice">
                        <span class="iconfont icon-sound-filling"></span>
                        <span class="iconfont icon-sound-Mute" v-show="false"></span>
                        <div>
                            <el-slider :show-tooltip="false" :max="140" v-model="value2"></el-slider>
                        </div>
                    </div>
                    <div class="seting flex-row">
                        <span class="iconfont icon-ttpodicon"></span>
                        <span class="iconfont icon-ttpodicon1" v-show="false"></span>
                        <span class="iconfont icon-xunhuanbofang" v-show="false"></span>
                        <span class="iconfont icon-bofangliebiao"></span>
                        <span class="iconfont icon-geci"></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            value1: 0,
            value2: 0,
        }
    },
    // 生命周期函数
    created() {},
    methods: {},
    computed: {},
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
                .el-image {
                    width: 70px;
                    height: 70px;
                }
            }
            .info {
                padding: 0 20px 10px 20px;
                flex: 90%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .top {
                    display: flex;
                    justify-content: space-between;
                    h2 {
                        font-size: 16px;
                        span {
                            margin-left: 10px;
                            font-size: 14px;
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
                padding: 20px 20px 20px 50px;
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

