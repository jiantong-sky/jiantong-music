<template>
    <div class="isLog">
        <jt-header></jt-header>
        <router-view></router-view>
        <jt-footer></jt-footer>
        <player-bar v-if="$store.state.playStatus"></player-bar>
        <div><scroll></scroll></div>
    </div>
</template>

<script>
import JtHeader from '@/components/common/header/Index'
import JtFooter from '@/components/common/footer/Index'
import playerBar from '@/components/common/playerBar/Index'
import scroll from '@/components/common/scroll/Index'
export default {
    data() {
        return {}
    },
    // 生命周期函数
    created() {},
    methods: {},
    components: {
        JtHeader,
        JtFooter,
        playerBar,
        scroll,
    },
}
</script>

<style lang="less" scoped>
.isLog {
    min-width: 1200px;
}
</style>

