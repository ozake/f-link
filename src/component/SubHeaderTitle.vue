<template>
  <!-- 메인이미지 영역-->
  <div class="theme_m" style="background:url(http://img.mk.co.kr/2018/franchise/theme_m04.jpg) no-repeat center 0px;">
    <h2>{{title}}
      <p class="line1"><hr/></p>
      <span>{{subTitle}}</span>
    </h2>
  </div>
  <!-- //메인이미지 영역-->

</template>
<style scoped>

</style>
<script>
export default {
  name: 'SubHeaderTitle',
  props : {
    title : '',
    subTitle : ''
  },
   data(){
     return {
     }
   }
}
</script>
