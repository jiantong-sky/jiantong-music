<template>
    <div class="container main">
        <div class="filter">
            <div class="title" @click="openFilter">
                {{ currentCat }}
                <el-icon class="el-icon-arrow-down"></el-icon>
            </div>
            <div class="hot">
                <span>热门标签：</span>
                <div class="sort">
                    <ul>
                        <li
                            :class="currentCat == item.name ? 'active' : ''"
                            v-for="item in playListHot"
                            :key="item.id"
                            @click="chooseCat(item.name)"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <transition name="el-zoom-in-top">
            <div class="filter-box" v-show="showFilter">
                <div class="item" v-for="(item, index) in tags" :key="index">
                    <h2>{{ item.name }}</h2>
                    <ul>
                        <li
                            :class="currentCat == sub.name ? 'active' : ''"
                            v-for="(sub, index1) in item.category"
                            :key="index1"
                            @click="chooseCat(sub.name)"
                        >
                            {{ sub.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </transition>

        <div class="playlist">
            <song-sheet :sheetList="playList" v-loading="loading"></song-sheet>
        </div>
        <div class="page-wrap">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :page-size="limit"
                :current-page.sync="currentPage"
                layout="total, prev, pager, next"
                :total="pageTotal"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import songSheet from '@/components/common/songSheet/Index'
export default {
    data() {
        return {
            loading: false,
            // 歌单
            playList: [],
            // 歌单总数
            pageTotal: 0,
            currentPage: 1,
            limit: 45,
            offset: 0,
            // 歌单标签
            playListTag: [],
            // 标签分类
            tagClass: {},
            // 热门歌单分类
            playListHot: [],
            // 分组后的歌单标签
            tags: [],
            currentCat: '全部',
            showFilter: false,
        }
    },
    // 生命周期函数
    created() {
        this.getPlaylistCatlist()
        this.getPlaylistHot()
        this.getPlayList()
    },
    methods: {
        // 获取歌单分类
        async getPlaylistCatlist() {
            const data = await this.$http.getPlaylistCatlist()
            if (data.code !== 200) return this.$message.error('获取歌单分类失败')
            this.tagClass = data.categories
            this.playListTag == data.sub
            this.tags = this.tagGrouping(data.sub, data.categories)
            // console.log(this.tags)
        },
        // 获取热门歌单分类
        async getPlaylistHot() {
            const data = await this.$http.getPlaylistHot()
            if (data.code !== 200) return this.$message.error('获取热门歌单分类失败')
            this.playListHot = data.tags
            // console.log(data)
        },
        // 对歌单分类进行分组
        tagGrouping(tag, value) {
            let att = []
            let length = Object.keys(value).length
            for (let i = 0; i < length; i++) {
                let obj = {}
                let category = tag.filter(item => item.category == i)
                obj.name = value[i]
                obj.category = category
                att.push(obj)
            }
            return att
        },
        // 获取歌单（默认全部）
        async getPlayList() {
            let params = {
                limit: this.limit,
                cat: this.currentCat,
                offset: this.offset,
            }
            this.loading = true
            const data = await this.$http.getPlayList(params)
            if (data.code !== 200) return this.$message.error('获取歌单失败')
            this.playList = data.playlists
            this.pageTotal = data.total
            this.loading = false
            // console.log(data)
        },
        chooseCat(cat) {
            this.showFilter = false
            this.currentCat = cat
            this.currentPage = 1
            this.getPlayList()
        },
        handleSizeChange(val) {
            this.limit = val
            this.offset = this.limit * this.currentPage
            this.getPlayList()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.offset = (val - 1) * this.limit
            this.getPlayList()
        },
        openFilter() {
            this.showFilter = !this.showFilter
        },
    },
    components: {
        songSheet,
    },
}
</script>

<style lang="less" scoped>
.filter {
    position: relative;
    display: flex;
    height: 40px;
    border-radius: 5px;
    background-color: #f2f6fc;
    overflow: hidden;
    .title {
        margin-right: 20px;
        width: 100px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        background-color: #f56c6c;
        cursor: pointer;
    }
    .hot {
        display: flex;
        span {
            line-height: 40px;
            color: #606266;
        }
        .sort ul {
            display: flex;
            .active {
                color: #f56c6c !important;
            }
            li {
                margin: 0 15px;
                line-height: 40px;
                color: #909399;
                cursor: pointer;
            }
            li:hover {
                color: #303133;
            }
        }
    }
}
.filter-box {
    margin-top: 10px;
    padding: 20px;
    position: absolute;
    width: 500px;
    height: 400px;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    z-index: 998;
    overflow: auto;
    .item {
        margin-bottom: 10px;
        h2 {
            color: #303133;
            font-weight: 400;
            font-size: 18px;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            .active {
                color: #f56c6c !important;
            }
            li {
                // float: left;
                margin: 20px 10px 10px;
                padding: 0 20px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                border-radius: 15px;
                color: #909399;
                background-color: #f7f7f7;
                cursor: pointer;
                &:hover {
                    color: #f56c6c;
                }
            }
        }
    }
}
.playlist {
    margin-top: 20px;
}
.page-wrap {
    margin-top: 20px;
    text-align: center;
}
</style>

