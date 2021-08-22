<template>
    <div class="container main">
        <div class="filter">
            <div class="title" @click="openFilter">
                {{ currentCat }}
                <el-icon class="el-icon-arrow-down"></el-icon>
            </div>
            <div class="hot">
                <span>分类：</span>
                <div class="sort">
                    <ul>
                        <li
                            :class="currentCat == item.name ? 'active' : ''"
                            v-for="item in videoCategoryList"
                            :key="item.id"
                            @click="chooseCat(item.name, item.id)"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <transition name="el-zoom-in-top">
            <div class="filter-box" v-show="showFilter">
                <div class="item">
                    <!-- <h2>{{ item.name }}</h2> -->
                    <ul>
                        <li
                            :class="currentCat == item.name ? 'active' : ''"
                            v-for="(item, index) in videoGroupList"
                            :key="index"
                            @click="chooseCat(item.name, item.id)"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <div class="playlist">
            <mv-list :mvs="videoList | filterVideoList" v-loading="loading"></mv-list>
        </div>
        <div class="page-wrap">
            <el-pagination
                @current-change="handleCurrentChange"
                background
                :current-page.sync="currentPage"
                layout="prev, next"
                prev-text="上一页"
                next-text="下一页"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import MvList from '@/components/common/mvList/Index'
export default {
    data() {
        return {
            // 视频标签id
            id: '',
            // 视频标签
            videoGroupList: [],
            // 视频分类
            videoCategoryList: [],
            videoList: [],
            currentCat: '全部',
            showFilter: false,
            currentPage: 1,
            offset: 0,
            loading: false,
        }
    },
    // 生命周期函数
    created() {
        this.initiailze()
    },
    methods: {
        // 初始化
        initiailze() {
            let token = localStorage.getItem('token')
            console.log()
            if (token == '') {
                this.$message.error('请先登录！')
                this.$router.push('/login')
                return
            }
            this.getVideoGroupList()
            this.getVideoCategoryList()
            this.getVideoTimelineAll()
        },
        // 获取视频标签列表
        async getVideoGroupList() {
            const data = await this.$http.getVideoGroupList()
            if (data.code !== 200) return this.$message.error('获取视频标签失败!')
            this.videoGroupList = data.data
            // console.log(data)
        },
        // 获取视频分类列表
        async getVideoCategoryList() {
            let timestamp = new Date().getTime()
            const data = await this.$http.getVideoCategoryList({ timestamp })
            if (data.code !== 200) return this.$message.error('获取视频分类失败!')
            this.videoCategoryList = data.data
            // console.log(data)
        },
        // 获取全部视频列表
        async getVideoTimelineAll() {
            const data = await this.$http.getVideoTimelineAll({ offset: this.offset })
            if (data.code !== 200) return this.$message.error('获取视频列表失败!')
            this.videoList = data.datas
            // console.log(data.datas)
        },
        // 获取视频 标签 / 分类 下的视频
        async getVideoGroup(id) {
            this.loading = true
            let params = {
                id,
                offset: this.offset,
            }
            const data = await this.$http.getVideoGroup(params)
            if (data.code !== 200) return this.$message.error('获取视频列表失败!')
            this.videoList = data.datas
            this.loading = false
            // console.log(data)
        },
        chooseCat(cat, id) {
            this.showFilter = false
            this.currentCat = cat
            this.currentPage = 1
            this.id = id
            this.getVideoGroup(id)
        },
        openFilter() {
            this.showFilter = !this.showFilter
        },
        handleCurrentChange(page) {
            this.currentPage = page
            this.offset = (page - 1) * 8
            if (this.currentCat == '全部') {
                this.getVideoTimelineAll()
            } else {
                this.getVideoGroup(this.id)
            }
        },
    },
    filters: {
        filterVideoList(list) {
            if (list == '') return
            let arr = []
            list.map(item => {
                arr.push(item.data)
            })
            // console.log(arr)
            return arr
        },
    },
    components: {
        MvList,
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
        padding: 0 20px;
        // width: 100px;
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

