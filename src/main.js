// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.withCredentials = true // 设置携带cookie
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios
Vue.use(VueCookies)
Vue.use(require('vue-wechat-title'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
