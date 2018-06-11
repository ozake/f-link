<template>
  <!-- 콘텐츠 -->
  <div id="content">
    <!-- 메인이미지 영역-->
    <div class="mcontent" >
      <h2>더 나은 내일을 만들어 줄 <br><span>나의 프랜차이즈를 찾아보세요</span></h2>
      <MainSearch></MainSearch>
    </div>
    <!-- //메인이미지 영역-->
    <!-- <popup-ad v-if="popupFlag"></popup-ad> -->
  </div>
  <!-- //콘텐츠 -->
</template>
<script>
import MainSearch from "./component/MainSearch.vue"
// import PopupAd from "./component/popupAd.vue"
export default {
  name: 'Main',
  components:{
    MainSearch
    // PopupAd
  },
  data () {
    return {
      popupFlag: true
    }
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
    /* if(localStorage.getItem('noPopup')){
        let noPopup = localStorage.getItem('noPopup')
        if(noPopup){
          this.popupFlag = false
        }
      }
    this.$EventBus.$on('popupOpen', (val)=>{
      this.popupFlag = val
    }) */
  }
}
</script>
<style>
#content .mcontent h2 {
  padding: 175px 0 68px 0;
}
</style>

