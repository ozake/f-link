<template>
    <div>
        <!--매물사진-->
        <div class="sphoto-container">
            <h6>매물사진</h6>
            <div class="swiper-container" ref="container">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" v-for="url in img"><img class="img" v-bind:src="url" @click="zoomToggle(url)" /></li>
                </ul>
            </div>
            
            <p class="prev" ><img src="http://img.mk.co.kr/2018/franchise/prev.jpg" alt="앞으로"></p>
            <p class="next" ><img src="http://img.mk.co.kr/2018/franchise/next.jpg" alt="뒤로"></p>
        </div>
        <!--//매물사진-->
        <transition name="fade">
        <!-- 검정배경-->
            <div v-if="zoom">
                <div class="blackBack" v-on:click="zoomToggle">
                </div>
                <a href="#none" class="toggleBtn" v-on:click="zoomToggle"><img src="http://img.mk.co.kr/2018/franchise/btn_close2.png" alt="닫기" class="close" ></a>
            </div>
        <!-- //검정배경-->
        </transition>
        <div v-if="zoom" class="zoomImgWrap" @click="zoomToggle">
            <img class="zoomImg" v-bind:src="zoomUrl"/>

        </div>
    </div>
</template>
<script>
//require('swiper/dist/css/swiper.min.css')
import 'swiper/dist/css/swiper.min.css'
import Swiper from "swiper/dist/js/swiper";
export default {
  name: 'ImgSlideViewer',
  components : {
  },
  props : {
      img: Array
  },
  data(){
    return {
        swiper : '',
        zoom : false,
        zoomUrl : '' 
    }
  },
  watch : {
      img : function () {
          this.$nextTick(function () {
              this.setSwiper()
          })     
      }
      /* swiperStart: function(val){
          if(val){
              this.setSwiper()
          }
      } */
  },
  methods: {
      setSwiper(){
          console.log('스와이퍼 실행')
        //   this.$refs.container.style.width = '1018px'
        let swiper = new Swiper('.swiper-container', {
            slidesPerView: 2,
            spaceBetween: 0,
            initialSlide: 0,
            allowTouchMove: false,
            // width: 1018,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            }
        })
        // swiper.updateProgress()
        // swiper.updateProgress()
        this.swiper = swiper
      },
      zoomToggle(url=''){
          if(!this.zoom){
              this.zoom = true
              this.zoomUrl = url
          }else{
              this.zoom = false
              this.zoomUrl = ''
          }
      }
  }
}
</script>
<style scoped>
.img {
    height: 214px;
}
.swiper-container {
    width: 1018px;
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
    width: 1018px;
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
.zoomImg {
    display: block;
    margin: 0 auto;
    z-index: 10000;
}
.zoomImgWrap {
    position: fixed;
    top : 25%;
    width: 1200px;
    margin-left: -2%;
    align-self: center;
    z-index: 1000;
}
.blackBack {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.65;
    z-index: 100;
}
.toggleBtn {
    position: fixed;
    top: 5%;
    right: 5%;
    z-index: 1000;
}
</style>