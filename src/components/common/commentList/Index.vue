<template>
    <ul>
        <li v-for="item in hotComments" :key="item.id">
            <div class="avatar">
                <img :src="item.user.avatarUrl" alt="" />
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
    // 生命周期函数
    created() {},
    methods: {},
}
</script>

<style lang="less" scoped>
</style>

