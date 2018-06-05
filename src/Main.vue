<template>
  <!-- 콘텐츠 -->
  <div id="content">
    <!-- 메인이미지 영역-->
    <div class="mcontent" >
      <h2>더 나은 내일을 만들어 줄 <br><span>나의 프랜차이즈를 찾아보세요</span></h2>
      <MainSearch></MainSearch>
    </div>
    <!-- //메인이미지 영역-->
  </div>
  <!-- //콘텐츠 -->
</template>
<script>
import MainSearch from "./component/MainSearch.vue"
export default {
  name: 'Main',
  components:{
    MainSearch
  },
  /* computed: {
    styles: function() {
      let height = window.innerHeight - 243

      return {
        height: height + 'px'
      }
    }
  }, */
  created(){
    this.$EventBus.$emit('HeaderActive', '')
    /* function mobRf(){
  		var rf = new EN();
		  rf.setSSL(true);
  		rf.sendRf();
	  } */
  }
}
</script>
<style>
#content .mcontent h2 {
  padding: 175px 0 68px 0;
}
</style>

