<template>
  <!-- 헤더 -->
<div id="header">
  <!-- 로고,로그인 -->
  <h1><img src="http://img.mk.co.kr/2018/franchise/fc_logo.jpg" alt="franchise link"></h1>
  <p class="login"><a href="#">로그인</a><span class="line">|</span> <a href="#">회원가입</a></p>
  <!-- //로고,로그인 -->

  <!-- GNB -->
  <div class="gnb">
    <ul>
      <li class="on"><a href="#none">프랜차이즈 현황</a></li>
      <li class="off"><a href="#none">테마별 베스트</a> </li>
      <li class="off"><a href="#">매장&매물</a> </li>
      <li class="off"><a href="#">착한 컨설팅</a></li>
      <li class="off"><a href="#">뉴스ㆍ이벤트</a></li>
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
  name: 'Header'
}
</script>
