import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getApi from '@/network/index'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.prototype.$http = getApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
