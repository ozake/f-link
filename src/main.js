import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Router from 'vue-router'
import routes from './routes'
// import VueAnalytics from 'vue-analytics'
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

/* Vue.use(VueAnalytics, {
  id: 'UA-120352121-1',
  router,
  checkDuplicatedScript: true
}) */

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
