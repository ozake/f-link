import Vue from 'vue'
import App from './App.vue'
import Main from './Main.vue'
import axios from 'axios'
import Router from 'vue-router'
import routes from './routes'
//import 'babel-polyfill'
require('es6-promise').polyfill();


Vue.prototype.$EventBus = new Vue()

Vue.prototype.$http = axios

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes,
  linkActiveClass: "",
})

//Vue.prototype.$route = router

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
