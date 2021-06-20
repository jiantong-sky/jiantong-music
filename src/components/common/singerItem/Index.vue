<template>
    <li @click="toSinger(item)">
        <div class="img">
            <el-image :src="item.img1v1Url" lazy>
                <div slot="placeholder" class="loading flex-row">
                    <el-icon class="el-icon-loading"></el-icon>
                </div>
            </el-image>
        </div>
        <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="count" v-if="item.musicSize">单曲数 {{ item.musicSize }}</p>
        </div>
    </li>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        item: {
            type: Object,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        // 点击跳转到歌手详情页面
        toSinger(item) {
            this.$router.push(`/singerDetail?id=${item.id}`)
            this.$store.commit('setSinger', item)
        },
    },
}
</script>

<style lang="less" scoped>
li {
    padding: 0 15px 30px;
    flex: 0 0 10%;
    max-width: 10%;
    .img {
        width: 93px;
        height: 93px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        .loading {
            width: 93px;
            height: 93px;
            font-size: 30px;
        }
    }
    .info {
        text-align: center;
        .name {
            font-size: 14px;
            font-weight: 700;
            font-family: PingFang SC, Arial, Microsoft YaHei, sans-serif;
        }
        .count {
            color: red;
            font-size: 12px;
        }
    }
}
</style>

