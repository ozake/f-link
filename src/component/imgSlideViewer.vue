<template>
    <!--매물사진-->
    <div class="sphoto-container">
        <h6>매물사진</h6>
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="url in img"><img class="img" v-bind:src="url" /></li>
            </ul>
        </div>
        <p class="prev" ><img src="http://img.mk.co.kr/2018/franchise/prev.jpg" alt="앞으로"></p>
        <p class="next" ><img src="http://img.mk.co.kr/2018/franchise/next.jpg" alt="뒤로"></p>
    </div>
    <!--//매물사진-->
</template>
<script>
//require('swiper/dist/css/swiper.min.css')
import 'swiper/dist/css/swiper.css'
import Swiper from "swiper/dist/js/swiper";
export default {
  name: 'ImgSlideViewer',
  components : {
  },
  props : {
      img: Array,
      swiperStart: Boolean
  },
  data(){
    return {
        swiper : ''
    }
  },
  watch : {
      swiperStart: function(val){
          if(val){
              this.setSwiper()
          }
      }
  },
  created() {

  },
  mounted() {
      this.$nextTick(function () {
          console.log('이미지컴포넌트 마운트 끝')
        // this.setSwiper()
        /* setTimeout(()=>{
            this.setSwiper()
        },200) */
        
      })
  },
  methods: {
      setSwiper(){
          console.log('스와이퍼 실행')
          let swiper = new Swiper('.swiper-container', {
            slidesPerView: 2,
            spaceBetween: 0,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            }
        })
        this.swiper = swiper
      }
   
  }



}
</script>
<style>
.img {
    height: 214px;
}
.swiper-container {
    width: 100%;
    height: 214px;
}
.swiper-slide {
      float: left;
      /* width: 50%; */
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
.sphoto-container {
    width: 1058px;
    height: 250px;
    border: 1px solid #dcdcdc;
    background-color: #f6f6f6;
    /* float: left; */
    margin-bottom: 50px;
    padding: 20px 40px 20px 40px;
    position: relative;
    overflow: hidden;
}
.sphoto-container h6 {
    font-size: 15px;
    color: #333;
    width: 253px;
    margin-bottom: 10px;
    font-weight: 400;
}
.sphoto-container .prev {
    position: absolute;
    left: 0px;
    top: 120px;
}
.sphoto-container .next {
    position: absolute;
    right: 0px;
    top: 120px;
}
</style>