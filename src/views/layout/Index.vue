<template>
    <div class="isLog">
        <jt-header></jt-header>
        <vue-lazy-component :timeout="1000">
            <router-view></router-view>
        </vue-lazy-component>
        <jt-footer></jt-footer>
        <player-bar v-if="$store.state.playStatus"></player-bar>
        <div><back-top></back-top></div>
    </div>
</template>

<script>
import JtHeader from '@/components/common/header/Index'
import JtFooter from '@/components/common/footer/Index'
import playerBar from '@/components/common/playerBar/Index'
import backTop from '@/components/common/backTop/Index'
// 页面懒加载
import { component as VueLazyComponent } from '@xunlei/vue-lazy-component'

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
        backTop,
        'vue-lazy-component': VueLazyComponent,
    },
}
</script>

<style lang="less" scoped>
.isLog {
    min-width: 1200px;
    // height: 721px;
}
</style>

