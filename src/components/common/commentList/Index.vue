<template>
    <ul>
        <li v-for="item in commentList" :key="item.id">
            <div class="avatar">
                <img :src="item.user.avatarUrl + '?param=45y45'" alt="" />
            </div>
            <div class="info">
                <h2>
                    <span>
                        {{ item.user.nickname }}
                        <small> · {{ utils.formatMsgTime(item.time) }}</small>
                    </span>
                    <div class="tool">
                        <span
                            :class="{
                                iconfont: true,
                                'icon-dianzan': true,
                                likedColor: item.liked,
                            }"
                            @click="commentLike(item)"
                        ></span>
                        <span class="dz">( {{ item.likedCount }} )</span>
                        <span class="iconfont icon-duanxin"></span>
                    </div>
                </h2>
                <div class="content">
                    {{ item.content }}
                    <div class="beReplied" v-show="item.beReplied != ''">
                        <small>@{{ item.beReplied | beReplied('user') }}</small>
                        {{ item.beReplied | beReplied('content') }}
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        commentList: {
            type: Array,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        commentLike(item) {
            this.$emit('commentLike', item)
        },
    },
    filters: {
        beReplied(item, value) {
            if (item == '') return ''
            let beReplied = item[0]
            if (value == 'content') {
                return beReplied.content
            }
            if (value == 'user') {
                return beReplied.user.nickname
            }
            console.log(beReplied)
        },
    },
}
</script>

<style lang="less" scoped>
ul {
    li {
        padding: 10px 0;
        width: 100%;
        display: flex;
        .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .info {
            flex: 1;
            h2 {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                font-size: 15px;
                font-weight: 400;
                margin-right: 5px;
                margin-bottom: 10px;
                small {
                    font-size: 12px;
                    color: #a5a5c1;
                    font-weight: 200;
                }
                .tool {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .likedColor {
                        color: red;
                    }
                    .iconfont {
                        font-size: 20px;
                        font-weight: 100;
                        margin-left: 20px;
                        cursor: pointer;
                        &:last-child {
                            font-size: 28px;
                        }
                    }
                    .dz {
                        font-size: 12px;
                        margin-top: 2px;
                        color: #666;
                        font-weight: 200;
                        position: relative;
                        &::after {
                            content: '';
                            width: 1px;
                            height: 13px;
                            background: #4a4a4a;
                            opacity: 0.7;
                            position: absolute;
                            top: 2px;
                            right: -12px;
                        }
                    }
                }
            }
            .content {
                width: 100%;
                font-size: 12px;
                color: #4a4a4a;
                line-height: 1.6;
                padding: 8px 10px;
                background: #f5f5f5;
                margin-top: 5px;
                border-radius: 3px;
                .beReplied {
                    margin-top: 10px;
                    background: #fff;
                    padding: 8px 10px;
                    border-radius: 3px;
                    color: #666;
                    small {
                        color: #fa2800;
                    }
                }
            }
        }
    }
}
</style>

