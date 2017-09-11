// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import './assets/lib/css/bootstrap.css'

// axios.defaults.baseURL = ' http:// servicedir.yc-yunpass.com:8080/services_list';
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(iView);
window.eventBus=new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
