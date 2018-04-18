<template>
  <!-- 메인이미지 영역-->
  <div class="scontent">
    <h2>더 나은 내일을 만들어 줄 <br><span>나의 프랜차이즈를 찾아보세요</span></h2>
    <SearchInput></SearchInput>
  </div>
  <!-- //메인이미지 영역-->
</template>
<script>
import SearchInput from './SearchInput.vue'
export default {
  name: 'BigSubHeader',
  components: { SearchInput }
}
</script>
