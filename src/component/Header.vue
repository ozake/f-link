<template>
  <!-- 헤더 -->
<div id="header">
  <!-- 로고,로그인 -->
  <h1><router-link to="/"><img src="http://img.mk.co.kr/2018/franchise/fc_logo.jpg" alt="franchise link"></router-link></h1>
  <p class="login"><a href="http://www.f-link.co.kr/index.php?TM=M&MM=1">로그인</a><span class="line">|</span> <a href="http://www.f-link.co.kr/index.php?TM=M&MM=2">회원가입</a></p>
  <!-- //로고,로그인 -->

  <!-- GNB -->
  <div class="gnb">
    <ul>
      <li v-bind:class="[franchiseActive ? activeClass : inActiveClass]"><router-link to="franchise">프랜차이즈 현황</router-link></li>
      <li v-bind:class="[themeBestActive ? activeClass : inActiveClass]"><router-link to="themeBest">테마별 베스트</router-link> </li>
      <li v-bind:class="[storeActive ? activeClass : inActiveClass]"><router-link to="store">매장&매물</router-link> </li>
      <li class="off"><a href="http://www.f-link.co.kr/index.php?TM=C">착한 컨설팅</a></li>
      <li class="off"><a href="http://www.f-link.co.kr/index.php?TM=N&MM=1&SC=61000013">뉴스ㆍ이벤트</a></li>
    </ul>
  </div>
  <!-- //GNB -->
</div>
<!-- //헤더 -->

</template>
<style scoped>
#header > h1 {
    position: absolute;
    left: 100px;
    top: 27px;
}
</style>
<script>
export default {
  name: 'Header',
  data (){
    return {
      franchiseActive : false,
      themeBestActive : false,
      storeActive : false,
      activeClass : 'on',
      inActiveClass : 'off'
    }
  },
  created() {
    this.$EventBus.$on('HeaderActive', this.setActiveClass)
  },
  methods : {
    setActiveClass(text) {
      switch (text) {
        case 'franchise':
          this.franchiseActive = true
          this.themeBestActive = false
          this.storeActive = false
          break;
        case 'theme':
          this.themeBestActive = true
          this.franchiseActive = false
          this.storeActive = false
          break;
        case 'store':
          this.storeActive = true
          this.themeBestActive = false
          this.franchiseActive = false
          break;
      }
    }
  }
}
</script>
