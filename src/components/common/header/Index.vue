<template>
    <div class="header">
        <div class="container flex-row">
            <div class="logo">
                <router-link to="/home"></router-link>
                <span>Hello World</span>
            </div>
            <ul class="nav">
                <li>
                    <router-link to="/home">首页发现</router-link>
                </li>
                <li>
                    <router-link to="/rank">排行榜</router-link>
                </li>
                <li>
                    <router-link to="/playlist">歌单</router-link>
                </li>
                <li>
                    <router-link to="/singer">歌手</router-link>
                </li>
                <li>
                    <router-link to="/video">视频</router-link>
                </li>
                <li>
                    <router-link to="/mv">MV</router-link>
                </li>
            </ul>
            <div class="search">
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="login">
                <div class="is-login" v-if="isLogin">
                    <span class="avatar">
                        <el-avatar icon="el-icon-user-solid" :src="avatarURL"></el-avatar>
                    </span>
                    <span>
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span>
                                {{ userName }}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人主页</el-dropdown-item>
                                <el-dropdown-item>我的等级</el-dropdown-item>
                                <el-dropdown-item>个人设置</el-dropdown-item>
                                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
                <div class="no-login" v-else>
                    <el-button plain @click="login">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: '',
            avatarURL: '',
        }
    },
    // 生命周期函数
    created() {
        sessionStorage.setItem('newPath', this.$route.fullPath)
        this.getUserInfo()
    },
    methods: {
        login() {
            // console.log(this.$route)
            this.$router.push('/login')
        },
        // 在头部区域显示头像等信息
        getUserInfo() {
            if (!window.localStorage.getItem('userInfo')) return
            const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
            this.userName = userInfo.nickname
            this.avatarURL = userInfo.avatarUrl
            // console.log(this.userName)
            // console.log(this.avatarURL)
            // console.log(userInfo)
        },
        // 退出登录
        async handleCommand(command) {
            switch (command) {
                case 'logout':
                    const data = await this.$http.logout()
                    if (data.code === 200) {
                        this.$message.success('退出登录成功')
                        window.localStorage.setItem('token', '')
                        window.localStorage.setItem('userInfo', '')
                        window.localStorage.setItem('loginStatus', false)
                        this.$router.push('/login')
                    }
            }
            // console.log(command)
        },
    },
    computed: {
        isLogin() {
            // console.log(window.localStorage.getItem('loginStatus'))
            return JSON.parse(window.localStorage.getItem('loginStatus'))
        },
    },
    watch: {
        $route(newPath, oldPath) {
            sessionStorage.setItem('newPath', newPath.fullPath)
            sessionStorage.setItem('oldPath', oldPath.fullPath)
            // console.log(newPath)
            // console.log(oldPath)
        },
    },
}
</script>

<style lang="less" scoped>
.header {
    // min-width: 1200px;
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    .logo {
        flex: 20%;
        display: flex;
        justify-content: center;
        a {
            display: inline-block;
            margin-right: 10px;
            width: 35px;
            height: 35px;
            background-repeat: no-repeat;
            background-position: 0px center;
            background-size: 35px 35px;
            background-image: url('../../../assets/img/logo.png');
        }
        span {
            font-size: 24px;
            color: skyblue;
        }
    }
    .nav {
        flex: 40%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        li {
            flex: 1;
            float: left;
            font-size: 14px;
            text-align: center;
            .router-link-active {
                color: red;
            }
        }
    }
    .search {
        flex: 25%;
    }
    .login {
        flex: 15%;
        margin-left: 10px;
        width: 50px;
        height: 100%;
        .no-login {
            text-align: center;
            line-height: 64px;
        }
        .is-login {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding-top: 10px;
            cursor: pointer;
            .avatar {
                margin-right: 10px;
            }
        }
    }
}
</style>

