<template>
  <!-- 콘텐츠 -->
  <div id="content">
    <!-- 메인이미지 영역-->
    <div class="mcontent">
      <h2>더 나은 내일을 만들어 줄 <br><span>나의 프랜차이즈를 찾아보세요</span></h2>
      <MainSearch></MainSearch>
    </div>
    <!-- //메인이미지 영역-->
  </div>
  <!-- //콘텐츠 -->
</template>
<script>
import MainSearch from "./MainSearch.vue"
export default {
  name: 'MainContent',
  components:{
    MainSearch
  }
}
</script>
