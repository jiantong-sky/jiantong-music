<template>
    <div class="footer">
        <div>
            <span>JianTong © 2019-2021</span>
            <span>学习使我快乐</span>
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
    margin: 50px 0 20px 0;
    width: 100%;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        color: #909399;
        :nth-child(1) {
            margin-right: 15px;
        }
    }
}
</style>

