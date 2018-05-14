<template>
  <!-- 헤더 -->
<div id="header">
  <!-- 로고,로그인 -->
  <h1><router-link to="/"><img src="http://img.mk.co.kr/2018/franchise/fc_logo.jpg" alt="franchise link"></router-link></h1>
  <p class="login">
    <a v-if="Nauth" href="http://www.f-link.co.kr/index.php?TM=M&MM=1">로그인</a><a v-else href="http://www.f-link.co.kr/index.php?TM=M&MM=4">{{localstroage.ID}} 로그아웃</a><span class="line">|</span>
    <template v-if="Nauth"><a href="http://www.f-link.co.kr/index.php?TM=M&MM=2">회원가입</a><template v-if="isMkUser"><span class="line">|</span><a href="http://www.f-link.co.kr/index.php?TM=M&MM=3">아이디·비밀번호찾기</a></template></template>
    <template v-else><a href="http://www.f-link.co.kr/index.php?TM=M&MM=5">회원정보수정</a><span class="line">|</span><a href="http://www.f-link.co.kr/index.php?TM=M&MM=6">비밀번호 변경</a></template>
  </p>
  <!-- //로고,로그인 -->

  <!-- GNB -->
  <div class="gnb">
    <ul>
      <li v-bind:class="[franchiseActive ? activeClass : inActiveClass]"><router-link :to="{ name: 'franchise-default' }">프랜차이즈 현황</router-link></li>
      <li v-bind:class="[themeBestActive ? activeClass : inActiveClass]"><router-link :to="{ name: 'theme-best' }">테마별 베스트</router-link> </li>
      <li v-bind:class="[storeActive ? activeClass : inActiveClass]"><router-link :to="{ name: 'store-page' }">매장&매물</router-link> </li>
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
      Nauth : true,
      isMkUser : false,
      activeClass : 'on',
      inActiveClass : 'off',
      localstroage : ''
    }
  },
  created() {
    this.$EventBus.$on('HeaderActive', this.setActiveClass)
    this.getAuth()
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
    },
    getAuth(){
      if(localStorage.getItem('ID')) {
        this.Nauth = false
        this.localstroage = localStorage
        if(localStorage.getItem('PROVIDER') === 'MK'){
          this.isMkUser = true
        }
      }
      else{
        
      }
    }
  }
}
</script>
