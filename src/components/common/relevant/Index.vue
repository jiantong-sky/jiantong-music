<template>
    <ul>
        <li v-for="(item, index) in relevant" :key="index">
            <div class="mv-img" @click="toMvDetail(item.id ? item.id : item.vid)">
                <img :src="item.cover ? item.cover : item.coverUrl" alt="" style="height: 100%; width: 100%" />
                <div class="mv-play">
                    <span class="iconfont icon-yinle-gongnengkongzhi-zantingxxhdpi"></span>
                </div>
            </div>
            <h2><span class="iconfont icon-MV"></span>{{ item.name ? item.name : item.title }}</h2>
            <span class="artists" v-show="item.artists">By. {{ item.artists | artistName1 }}</span>
            <span class="artists" v-show="item.creator">By. {{ item.creator | artistName2 }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        relevant: {
            type: Array,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        toMvDetail(id) {
            this.$emit('toMvDetail', id)
        },
    },
    filters: {
        artistName1(name) {
            if (!name) return ''
            if (name.length == 1) return name[0].name
            var newName = name[0].name
            var artistName = ''
            for (let i = 1; i < name.length; i++) {
                artistName = ' / ' + name[i].name
            }
            return newName + artistName
        },
        artistName2(name) {
            if (!name) return ''
            if (name.length == 1) return name[0].userName
            var newName = name[0].userName
            var artistName = ''
            for (let i = 1; i < name.length; i++) {
                artistName = ' / ' + name[i].userName
            }
            return newName + artistName
        },
    },
}
</script>

<style lang="less" scoped>
ul {
    li {
        margin-bottom: 30px;
        &:last-child {
            margin: 0;
        }
        .mv-img {
            position: relative;
            width: 100%;
            height: 180px;
            cursor: pointer;
            &:hover {
                .mv-play {
                    display: block;
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
        h2 {
            margin: 10px 0 3px 0;
            font-size: 14px;
            font-weight: 400;
            color: #303133;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            .iconfont {
                margin-right: 5px;
                font-size: 24px;
                color: red;
                vertical-align: middle;
            }
        }
        .artists {
            font-size: 12px;
            color: #a5a5c1;
        }
    }
}
</style>

