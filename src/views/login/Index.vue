<template>
    <div class="login">
        <el-card shadow="always">
            <div class="sign-in">
                <div class="logo">
                    <kinesis-container>
                        <kinesis-element :strength="25">
                            <img src="@/assets/img/logo.png" alt="" />
                        </kinesis-element>
                    </kinesis-container>
                </div>
                <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                    <el-form-item prop="phone">
                        <el-input
                            placeholder="请输入网易云手机号"
                            prefix-icon="el-icon-mobile-phone"
                            v-model="loginForm.phone"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            placeholder="请输入密码"
                            show-password
                            prefix-icon="el-icon-lock"
                            v-model="loginForm.password"
                        >
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
                <router-link to="/home">暂时先不登陆</router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
// import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import Vue from 'vue'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
export default {
    data() {
        return {
            loginForm: {
                phone: '18816487448',
                password: '',
            },
            loginFormRules: {
                phone: [{ required: true, message: '输入手机号！', trigger: 'blur' }],
                password: [{ required: true, message: '输入密码！', trigger: 'blur' }],
            },
            loginLoading: false,
        }
    },
    // 生命周期函数
    created() {},
    methods: {
        // 登录的操作
        login() {
            this.loginLoading = false
            this.$refs.loginFormRef.validate(valid => {
                if (valid) {
                    this.loginLoading = true
                    this.loginAsync(this.loginForm)
                } else {
                    this.loginLoading = false
                }
            })
        },
        // 请求登录接口
        async loginAsync(params) {
            const data = await this.$http.login(params)
            // console.log(data)
            if (data.code === 200) {
                this.getUserInfo(data.profile.userId)
                window.localStorage.setItem('token', data.token)
                window.localStorage.setItem('cookie', data.cookie)
                window.localStorage.setItem('loginStatus', true)
                this.$store.commit('loginStatus', true)
            } else if (data.code === 502) {
                this.$message.error(data.msg)
            } else if (data.code === 400) {
                this.$message.error('似乎出了什么问题')
                setTimeout(() => {
                    this.loginLoading = false
                }, 1000)
            }
        },
        // 获取个人信息
        async getUserInfo(uid) {
            const data = await this.$http.getUserInfo({ uid })
            if (data.code === 200) {
                let userInfo = data.profile
                userInfo.listenSongs = data.listenSongs
                userInfo.createTime = data.createTime
                userInfo.createDays = data.createDays
                window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                this.$store.commit('setUserInfo', userInfo)
                setTimeout(() => {
                    this.loginLoading = false
                    this.$message.success('登录成功')
                    this.$router.push('/home')
                }, 1000)
            }
        },
    },
    components: {
        KinesisContainer,
        KinesisElement,
    },
}
</script>

<style lang="less" scoped>
.login {
    min-width: 1200px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background: url('../../assets/img/灰原2.jpg') no-repeat center center;
    background-attachment: fixed;
    .el-card {
        width: 300px;
        // height: 400px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(255, 255, 255);
        .sign-in {
            display: flex;
            flex-direction: column;
            align-items: center;
            .logo {
                margin-top: 10px;
                width: 70px;
                height: 70px;
                img {
                    width: 100%;
                }
            }
            .el-input {
                margin: 20px auto;
            }
            .el-button {
                margin: 20px 0 5px 0;
                width: 100%;
                background-color: skyblue;
                font-size: 18px;
                color: rgb(255, 255, 255);
            }
            a {
                color: #c0c4cc;
                font-size: 12px;
                font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
                    '微软雅黑', Arial, sans-serif;
            }
        }
    }
}
</style>

