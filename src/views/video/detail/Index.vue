<template>
    <div class="mv-detail main container">
        <el-card class="left" shadow="always">
            <div class="play-box">
                <video class="mv-play" :src="videoUrl.url" controls="controls" autoplay="autoplay"></video>
            </div>
            <div class="mv-info">
                <h2><span class="iconfont icon-MV"></span>{{ videoDetail.title }}</h2>
                <div class="mv-videoGroup">
                    <span v-for="item in videoDetail.videoGroup" :key="item.id">#{{ item.name }}</span>
                </div>
                <div class="mv-artists">
                    <span class="mv-artistName">发布者：{{ creator.nickname }}</span>
                    <span class="mv-publishTime">
                        发布时间：{{ utils.dateFormat(videoDetail.publishTime, 'YYYY-MM-DD') }}
                    </span>
                    <span class="mv-playCount">播放次数：{{ utils.tranNumber(videoDetail.playTime, 1) }}</span>
                </div>
                <div class="mv-count">
                    <span class="mv-likedCount">
                        <span class="iconfont icon-shoucang2"></span>
                        {{ likedCount }}
                    </span>
                    <span class="mv-subCount">
                        <span class="iconfont icon-shoucang1"></span>
                        {{ subCount }}
                    </span>
                    <span class="mv-shareCount">
                        <span class="iconfont icon-fenxiang"></span>
                        {{ shareCount }}
                    </span>
                </div>
            </div>
            <div class="mv-comment">
                <div class="comment-count">
                    <el-icon class="icon el-icon-chat-dot-round"></el-icon>
                    <span>评论 | {{ commentCount }} 条评论</span>
                </div>
                <div class="split-line"></div>
                <div class="comment-main">
                    <div class="user-comments">
                        <img class="user-avatar" v-show="userInfo != ''" key="avatar" :src="user.avatarUrl" />
                        <img class="user-avatar" v-show="userInfo == ''" key="newAvatar" :src="avatarUrl" />
                        <el-input
                            ref="inputRef"
                            @focus="focus"
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 3 }"
                            placeholder="请输入内容"
                            v-model="textarea"
                        >
                        </el-input>
                        <el-button type="primary" round @click="getComment">评论</el-button>
                    </div>
                    <div class="comment-area">
                        <h3>精彩评论</h3>
                        <comment-list @commentLike="commentLike" :commentList="hotComments"></comment-list>
                        <h3>最新评论</h3>
                        <comment-list @commentLike="commentLike" :commentList="comments"></comment-list>
                    </div>
                    <div class="pageination">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="limit"
                            layout="total, prev, pager, next"
                            :total="commentCount"
                            background
                            prev-text="上一页"
                            next-text="下一页"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-card>
        <div class="right">
            <el-card class="right-top" shadow="always">
                <div class="header">
                    <span>视频简介</span>
                </div>
                <div class="mv-desc" v-if="videoDetail.description != null">{{ videoDetail.description }}</div>
                <div class="mv-desc" v-else>视频暂无简介</div>
            </el-card>
            <el-card class="right-bottom" shadow="always">
                <div class="header">
                    <span>相关推荐</span>
                </div>
                <div class="relevant">
                    <relevant :relevant="relatedVideo" @toMvDetail="toMvDetail"></relevant>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import commentList from '@/components/common/commentList/Index'
import relevant from '@/components/common/relevant/Index'
export default {
    data() {
        return {
            id: '',
            // 视频信息
            videoDetail: {},
            // 发布者信息
            creator: {},
            // 视频地址
            videoUrl: {},
            // 视频评论数
            commentCount: 0,
            // 点赞数
            likedCount: 0,
            // 转发数
            shareCount: 0,
            // 收藏数
            subCount: 0,
            // 相似mv
            relatedVideo: [],
            // 用户评论
            textarea: '',
            // 热门评论
            hotComments: [],
            // 最新评论
            comments: [],
            currentPage: 1,
            limit: 20,
            offset: 0,
            userInfo: '',
            user: {},
            avatarUrl: require('../../../assets/img/avatar.jpg'),
        }
    },
    // 生命周期函数
    created() {
        this.initiailze()
    },
    methods: {
        // 初始化
        initiailze() {
            let id = this.$route.query.id
            let userInfo = localStorage.getItem('userInfo')
            if (userInfo !== '') {
                this.userInfo = userInfo
                this.user = JSON.parse(userInfo)
            }
            this.id = id
            this.getVideoDetail(id)
            this.getVideoUrl(id)
            this.getVideoDetailInfo(id)
            this.getRelatedAllVideo(id)
            this.getCommentVideo(id)
        },
        // 获取视频信息
        async getVideoDetail(id) {
            const data = await this.$http.getVideoDetail({ id })
            if (data.code !== 200) return this.$message.error('获取视频信息失败')
            this.videoDetail = data.data
            this.subCount = data.data.subscribeCount
            this.creator = data.data.creator
            // console.log(data)
        },
        // 获取视频地址
        async getVideoUrl(id) {
            const data = await this.$http.getVideoUrl({ id })
            if (data.code !== 200) return this.$message.error('播放失败')
            this.videoUrl = data.urls[0]
            // console.log(data)
        },
        // 获取评论转发数等数据
        async getVideoDetailInfo(id) {
            let timestamp = new Date().getTime()
            const data = await this.$http.getVideoDetailInfo({ vid: id, timestamp })
            if (data.code !== 200) return this.$message.error('获取视频信息失败')
            this.commentCount = data.commentCount
            this.likedCount = data.likedCount
            this.shareCount = data.shareCount
            // console.log(data)
        },
        // 获取相似mv
        async getRelatedAllVideo(id) {
            const data = await this.$http.getRelatedAllVideo({ id })
            if (data.code !== 200) return this.$message.error('获取相似MV失败')
            this.relatedVideo = data.data
            // console.log(data)
        },
        // 获取mv评论
        async getCommentVideo(id) {
            let timestamp = new Date().getTime()
            let params = {
                id,
                limit: this.limit,
                offset: this.offset,
                timestamp,
            }
            const data = await this.$http.getCommentVideo(params)
            if (data.code !== 200) return this.$message.error('获取MV评论失败')
            this.hotComments = data.hotComments
            this.comments = data.comments
            // console.log(data)
        },
        // 给评论点赞
        async commentLike(item) {
            let timestamp = new Date().getTime()
            // let id = this.$route.query.id
            let params = {
                id: this.id,
                cid: item.commentId,
                t: item.liked ? 0 : 1,
                type: 5,
                timestamp,
            }
            const data = await this.$http.getCommentLike(params)
            if (!data) return
            if (data.code != 200) return this.$message.error('点赞失败！')
            if (params.t == 1) {
                this.$message.success('点赞成功！')
            }
            setTimeout(() => {
                this.getCommentVideo(this.id)
            }, 500)
        },
        // 发送评论
        async getComment() {
            if (this.textarea === '') return
            let timestamp = new Date().getTime()
            let params = {
                id: this.id,
                type: 5,
                t: 1,
                content: this.textarea,
                timestamp,
            }
            const data = await this.$http.getComment(params)
            if (data.code != 200) return this.$message.error('评论失败！')
            this.$message.success('评论成功')
            // console.log(data)
            this.textarea = ''
            setTimeout(() => {
                this.getCommentVideo(this.id)
            }, 500)
        },
        // 分页
        handleCurrentChange(newPage) {
            this.currentPage = newPage
            this.offset = (newPage - 1) * this.limit
            let id = this.$route.query.id
            this.getCommentVideo(id)
        },
        // 跳转路由
        toMvDetail(id) {
            this.$router.push({
                path: '/videoDetail',
                query: {
                    id,
                },
            })
        },
        focus() {
            let token = localStorage.getItem('token')
            if (token == '') {
                this.$message.error('请先登录！')
                this.$refs.inputRef.blur()
            }
        },
    },
    filters: {
        artistName(name) {
            if (!name) return ''
            if (name.length == 1) return name[0].name
            var newName = name[0].name
            var artistName = ''
            for (let i = 1; i < name.length; i++) {
                artistName = ' / ' + name[i].name
            }
            return newName + artistName
        },
    },
    watch: {
        $route() {
            this.initiailze()
        },
    },
    components: {
        commentList,
        relevant,
    },
}
</script>

<style lang="less" scoped>
.mv-detail {
    display: flex;
    justify-content: space-between;
    .left {
        width: 830px;
        .play-box {
            position: relative;
            width: 100%;
            height: 450px;
            .mv-play {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
        .mv-info {
            margin-top: 10px;
            position: relative;
            h2 {
                font-size: 16px;
                font-weight: 400;
                .iconfont {
                    margin-right: 3px;
                    font-size: 24px;
                    color: red;
                    vertical-align: middle;
                }
            }
            .mv-videoGroup {
                margin-top: 20px;
                font-size: 12px;
                color: red;
                span {
                    margin-right: 10px;
                }
            }
            .mv-artists {
                margin-top: 10px;
                .mv-artistName {
                    display: block;
                }
                .mv-artistName,
                .mv-publishTime,
                .mv-playCount {
                    margin: 0 20px 5px 0;
                    color: #606266;
                    font-size: 12px;
                }
            }
            .mv-count {
                position: absolute;
                bottom: 5px;
                right: 10px;
                font-size: 14px;
                color: #606266;
                .mv-likedCount,
                .mv-subCount,
                .mv-shareCount {
                    padding: 10px;
                    background-color: rgba(242, 242, 242, 0.5);
                    border-radius: 20px;
                    cursor: pointer;
                    .iconfont {
                        color: red;
                    }
                }
                .mv-subCount {
                    margin: 0 10px;
                }
            }
        }
        .mv-comment {
            margin-top: 50px;
            .comment-count {
                font-size: 14px;
                color: #606266;
                .icon {
                    margin-right: 5px;
                    font-size: 20px;
                    vertical-align: bottom;
                }
            }
            .split-line {
                margin: 20px 0;
                width: 100%;
                height: 1px;
                background-color: #f1f1f1;
            }
            .comment-main {
                .user-comments {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 40px;
                    .user-avatar {
                        margin-right: 20px;
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                    }
                    .el-button {
                        transform: translate(0, 50%);
                        margin-left: 20px;
                        height: 40px;
                    }
                }
                .comment-area {
                    h3 {
                        margin: 20px 0;
                        font-size: 16px;
                    }
                }
                .pageination {
                    margin-top: 30px;
                    text-align: center;
                }
            }
        }
    }
    .right {
        display: flex;
        flex-direction: column;
        width: 350px;
        .right-top {
            margin-bottom: 20px;
            .mv-desc {
                color: #606266;
                font-size: 14px;
            }
        }
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            font-size: 14px;
            font-weight: 800;
            &::before {
                content: '';
                margin-right: 20px;
                display: inline-block;
                width: 3px;
                height: 22px;
                background-color: red;
            }
        }
        // .right-bottom {
        //     .relevant {
        //     }
        // }
    }
}
</style>

