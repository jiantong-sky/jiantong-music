<template>
    <div class="container main">
        <div class="singer-box">
            <div class="item">
                <ul>
                    <li
                        :class="lang == item.id ? 'active' : ''"
                        v-for="item in area"
                        :key="item.id"
                        @click="chooseType('lang', item.id)"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul>
                    <li
                        :class="classify == item.id ? 'active' : ''"
                        @click="chooseType('classify', item.id)"
                        v-for="item in type"
                        :key="item.id"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul>
                    <li
                        :class="en == item.id ? 'active' : ''"
                        @click="chooseType('en', item.id)"
                        class="ens"
                        v-for="item in ens"
                        :key="item.id"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="split-line"></div>
        <div class="singer-item" v-loading="loading">
            <ul v-infinite-scroll="load" :infinite-scroll-distance="100" v-loading="loading2">
                <singer-item :item="item" v-for="(item, index) in artistList" :key="index"></singer-item>
            </ul>
        </div>
        <div class="split-line"></div>
    </div>
</template>

<script>
import singerItem from '@/components/common/singerItem/Index'
export default {
    data() {
        return {
            loaging: false,
            loading2: false,
            page: 1,
            classify: -1,
            type: [
                {
                    id: -1,
                    label: '全部',
                },
                {
                    id: 1,
                    label: '男歌手',
                },
                {
                    id: 2,
                    label: '女歌手',
                },
                {
                    id: 3,
                    label: '乐队',
                },
            ],
            lang: -1,
            area: [
                {
                    id: -1,
                    label: '全部',
                },
                {
                    id: 7,
                    label: '华语',
                },
                {
                    id: 96,
                    label: '欧美',
                },
                {
                    id: 8,
                    label: '日本',
                },
                {
                    id: 16,
                    label: '韩国',
                },
                {
                    id: 0,
                    label: '其他',
                },
            ],
            en: -1,
            ens: [],
            // 请求参数
            params: {
                // 返回数量
                limit: 30,
                // 偏移数量
                offset: 0,
                // 分类
                type: -1,
                // 语种
                area: -1,
                // 字母A_Z
                initial: -1,
            },
            // 歌手列表
            artistList: [],
        }
    },
    // 生命周期函数
    created() {
        this.getEn()
        this.getArtistList()
    },
    methods: {
        // 获取筛选列表
        getEn() {
            let ens = []
            for (let i = 0; i < 26; i++) {
                ens.push({
                    id: String.fromCharCode(97 + i),
                    label: String.fromCharCode(65 + i),
                })
            }
            ens.unshift({
                id: -1,
                label: '热门',
            })
            ens.push({
                id: 0,
                label: '其他',
            })
            this.ens = ens
        },
        // 选择分类
        chooseType(type, id) {
            if (type == 'lang') {
                this.lang = id
                this.params.area = id
            }
            if (type == 'classify') {
                this.classify = id
                this.params.type = id
            }
            if (type == 'en') {
                this.en = id
                this.params.initial = id
            }
            this.getArtistList()
        },
        // 获取歌手数据
        async getArtistList() {
            this.loading = true
            this.page = 1
            this.params.offset = 0
            const data = await this.$http.getArtistList(this.params)
            if (data.code !== 200) return this.$message.error('获取歌手列表失败')
            this.artistList = data.artists
            this.loading = false
            // console.log(data)
        },
        async load() {
            this.loading2 = true
            this.page += 1
            this.params.offset = (this.page - 1) * this.params.limit
            // setTimeout(async () => {
            const data = await this.$http.getArtistList(this.params)
            if (data.code !== 200) return this.$message.error('获取歌手列表失败')
            for (let i = 0; i < data.artists.length; i++) {
                this.artistList.push(data.artists[i])
            }
            this.loading2 = false
            // }, 2000)
            // console.log(data)
        },
    },
    components: {
        singerItem,
    },
}
</script>

<style lang="less" scoped>
.singer-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 130px;
    .item {
        height: 28px;
        .active {
            background-color: #f56c6c;
            color: #fff !important;
        }
        ul {
            display: flex;
            li {
                margin: 0 6px;
                width: 56px;
                text-align: center;
                line-height: 28px;
                font-size: 13px;
                border-radius: 14px;
                color: #606266;
                cursor: pointer;
                &:hover {
                    color: red;
                }
            }
            .ens {
                width: 28px;
                &:first-child {
                    width: 56px;
                }
                &:last-child {
                    width: 56px;
                }
            }
        }
    }
}
.singer-item {
    ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        margin: 0px -15px 0;
        height: 331px;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
.split-line {
    margin: 30px 0;
    height: 2px;
    // background-color: red;
    background: -webkit-linear-gradient(left, red, pink, skyblue, orange);
    &:last-child {
        margin: 9px 0;
    }
}
</style>

