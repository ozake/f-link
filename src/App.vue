<template>
  <div id="wrap">
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="footerFlag"></Footer>
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
  data() {
    return {
      footerFlag : true
    }
  },
  created(){
    if(this.$route.path === '/store'){
      this.footerFlag = false
    }
  },
  watch: {
    $route : function(){
      if(this.$route.path === '/store'){
        this.footerFlag = false
      } 
    }
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
