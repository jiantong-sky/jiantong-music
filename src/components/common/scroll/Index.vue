<template>
    <el-backtop :bottom="100" :right="80">
        <div class="up">
            <el-icon class="el-icon-caret-top"></el-icon>
        </div>
    </el-backtop>
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
.up {
    position: fixed;
    background-color: #fff;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 5;
}
</style>

