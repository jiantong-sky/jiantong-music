import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getApi from '@/network/index'
import './plugins/element.js'
import utils from '@/utils/utils'

Vue.config.productionTip = false

Vue.prototype.$http = getApi
Vue.prototype.utils = utils


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
