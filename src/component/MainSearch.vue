<template>
    <div>


      <!-- 메인 탭-->
      <ul class="mtab">
        <li class="mtab_on"><a href="#">프랜차이즈 검색</a></li>
        <li class="mtab_off"><a href="#">매장&매물 찾기</a></li>
      </ul>
      <!-- //메인 탭-->
      <SearchInput></SearchInput>

    </div>
</template>
<script>
import SearchInput from './SearchInput.vue'
export default {
  name: 'MainSearch',
  components: { SearchInput }
}
</script>
<style scoped>
#search {
    overflow: hidden;
}
</style>
