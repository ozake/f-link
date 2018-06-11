<template>
    <!-- popup  -->
    <div class="popup">
        <a href="http://www.f-link.co.kr/index.php?TM=D&MM=2&PG=&ID=1"><img src="http://img.mk.co.kr/2018/franchise/img_popup.jpg" alt="팝업"></a>
        <span>
            <input name="" type="checkbox" :value="true" v-model="noPopup"> 더 이상 팝업을 열지 않습니다.
            <a href="#" class="close" @click="exitPopup"><img src="http://img.mk.co.kr/2018/franchise/btn_close02.png" alt="닫기"></a>
        </span>
    </div>
    <!-- popup  -->
</template>
<script>
export default {
  name: 'popupAd',
  data () {
      return {
          noPopup: false
      }  
  },
  methods:{
      exitPopup(){
          if(this.noPopup){
              localStorage.setItem('noPopup', this.noPopup)
          }
          this.$EventBus.$emit('popupOpen', false)
      }
  }
}
</script>
<style>
.popup{display: block;position: absolute; top: 300px; left: 150px; height: 285px; width: 300px; background: #363636;border: 1px solid #eee}
.popup span{padding: 10px;display: block;color: #e5e5e5;font-size: 12px;font-weight: normal;font-family: malgun Gotic;letter-spacing: -.5px}
.popup span input[type="checkbox"] {vertical-align: middle}
.popup span .close{float: right; padding-top: 3px} 
</style>
