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
    <div id='layerPop' style='position:absolute; top:0px; left:0px; width:10px; height:10px; z-index:1000;display:block;' ref="layerPop">
      <iframe border='0' frameborder='0' width='0' height='0' id='layerIframe' title='레이어팝업' src="" ref="layerPopIframe"></iframe>
    </div>
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
  },
  mounted(){
    let cw = ((window.screenLeft === 0) ? screen.availWidth : Math.abs(window.screenX));                        //화면 넓이
    let ch = ((window.screenTop === 0) ? screen.availHeight : (screen.availHeight - window.screenTop * 2));     //화면 높이
    let sw = 905;				//띄울 창의 넓이
    let sh = 290;				//띄울 창의 높이
    let ml = parseInt(cw - sw) / 4;		//가운데 띄우기위한 창의 x위치
    let mt = parseInt(ch - sh) / 10;		//가운데 띄우기위한 창의 y위치
    document.getElementById("layerPop").style.display = 'inline';
    document.getElementById('layerPop').style.left = ml+'px';
    document.getElementById('layerPop').style.top = mt+'px';
    document.getElementById('layerIframe').style.width = sw+'px';
    document.getElementById('layerIframe').style.height = sh+'px';
    document.getElementById('layerIframe').src = 'http://www.f-link.co.kr/popup/layerPopup.php';
    window.addEventListener('message', (e) => {
      console.log(e.data); // { hello: 'parent' }
      if(e.data === 'popupNone'){
        this.$refs.layerPop.style = 'display:none'
        this.$refs.layerPopIframe.style = 'display:none'
      }
    })
  }
}
</script>
<style>
#content .mcontent h2 {
  padding: 175px 0 68px 0;
}
</style>

