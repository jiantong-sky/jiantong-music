<template>
    <div class="songList">
        <div class="item" v-for="(item, index) in songList" :key="item.id">
            <transition name="el-fade-in-linear">
                <div class="icon" @click="showAplayer(item, index)">
                    <el-icon class="el-icon-video-play"></el-icon>
                </div>
            </transition>
            <el-image :src="item.image" style="width: 70px; height: 70px"></el-image>
            <div class="item-singer">
                <p>{{ item.name }}</p>
                <p>{{ item.singer }}</p>
            </div>
            <span>{{ utils.formatSecondTime(item.duration) }}</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    props: {
        songList: {
            type: Array,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        showAplayer(item, index) {
            this.$store.commit('setPlayStatus', true)
            this.$store.commit('setPlayList', this.songList)
            this.$store.commit('setPlayIndex', index)
            // this.songList.map(item => {
            //     if (item.id === playId) {
            //         window.localStorage.setItem('current', JSON.stringify(item))
            //     }
            // })
        },
    },
    computed: {
        ...mapState(['playStatus']),
    },
}
</script>

<style lang="less" scoped>
.songList {
    display: flex;
    flex-wrap: wrap;
    .item {
        flex: 50%;
        margin-bottom: 20px;
        max-height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        &:hover {
            .icon {
                display: block;
                animation: anim 0.3s;
            }
            @keyframes anim {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
        }
        .el-image {
            flex: 40%;
            max-width: 70px;
            border-radius: 3px;
            cursor: pointer;
        }
        span {
            flex: 20%;
            padding-right: 40px;
            font-size: 15px;
            text-align: right;
        }
        .item-singer {
            flex: 40%;
            padding-left: 30px;
            font-size: 12px;
            p:first-child {
                font-size: 15px;
                font-weight: bold;
            }
        }
        .icon {
            position: absolute;
            top: 4px;
            left: 0;
            right: 0;
            display: none;
            width: 70px;
            height: 70px;
            z-index: 998;
            text-align: center;
            line-height: 70px;
            color: red;
            font-size: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 3px;
            cursor: pointer;
        }
    }
}
</style>

