import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getApi from '@/network/index'
import './plugins/element.js'
import utils from '@/utils/utils'
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

Vue.config.productionTip = false

Vue.prototype.$http = getApi
Vue.prototype.utils = utils


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
