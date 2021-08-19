<template>
    <div class="album-box">
        <ul>
            <li v-for="item in hotAlbums" :key="item.id" @click="toAlbum(item.id)">
                <img :src="item.picUrl" alt="" />
                <div class="album-info">
                    <h3 class="album-name">{{ item.name }}</h3>
                    <h4 class="album-author">{{ item.artist.name }}</h4>
                    <div class="album-tiem">{{ utils.dateFormat(item.publishTime, 'YYYY-MM-DD') }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        hotAlbums: {
            type: Array,
        },
    },
    // 生命周期函数
    created() {},
    methods: {
        toAlbum(id) {
            this.$router.push({
                path: '/albumDetail',
                query: {
                    id,
                },
            })
        },
    },
}
</script>

<style lang="less" scoped>
.album-box {
    margin-top: 20px;
    ul {
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px;
        li {
            width: 200px;
            height: 300px;
            text-align: center;
            cursor: pointer;
            img {
                width: 160px;
                height: 160px;
                box-shadow: 5px -5px 5px 2px #dcdfe6;
            }
            .album-info {
                display: flex;
                flex-direction: column;
                margin-top: 15px;
                padding-left: 20px;
                text-align: left;
                .album-name {
                    font-size: 14px;
                    color: #303133;
                }
                .album-author,
                .album-tiem {
                    margin-top: 5px;
                    font-weight: 400;
                    font-size: 12px;
                    color: #606266;
                }
            }
        }
    }
}
</style>

