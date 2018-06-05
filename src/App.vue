<template>
  <div id="wrap">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./component/Header.vue"
import Footer from "./component/Footer.vue"
export default {
  name: 'app',
  components:{
    Header,
    Footer
  },
  created(){
    
  }
  /* beforeDestroy() {
    alert('beforeDestroy')
  },
  destroyed() {
    alert('Destroyed')
    //console.log('Destroyed')
  } */
  
}
</script>
