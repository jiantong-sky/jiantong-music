<template>
    <div class="footer">
        <div>
            <span>JianTong © 2019-2021</span>
            <span>学习使我快乐</span>
            <span>
                <a href="https://gitee.com/lxhcool">UI参照 lxhcool</a>
            </span>
        </div>
    </div>
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
.footer {
    // display: flex;
    // justify-content: center;
    margin: 50px 0 20px 0;
    width: 100%;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            font-size: 10px;
            color: #909399;
            margin-right: 15px;
            a {
                color: #909399;
            }
        }
    }
}
</style>

