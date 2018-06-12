import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Router from 'vue-router'
import routes from './routes'
// import VueAnalytics from 'vue-analytics'
// import Autocomplete from 'v-autocomplete'
// import ApiModel from './model/apiModel'; 
/* import ChartJs from 'chart.js';
import VueCharts from 'hchs-vue-charts' */
/* import 'chart.js'
import 'hchs-vue-charts' */
//import 'babel-polyfill'
require('es6-promise').polyfill();


Vue.prototype.$EventBus = new Vue()

Vue.prototype.$http = axios

Vue.use(Router)

// Vue.use(Autocomplete)
/* Vue.use(window.VueCharts) */

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

/* router.beforeEach((to, from, next) => {
  // ...
  //myStorage = window.localStorage;
  //console.log(sessionStorage)
  next()
}) */

//Vue.prototype.$route = router

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
