import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$EventBus = new Vue()

Vue.prototype.$http = axios

new Vue({
  el: '#app',
  render: h => h(App)
})
