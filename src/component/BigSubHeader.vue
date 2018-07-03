<template>
  <!-- 메인이미지 영역-->
  <div class="scontent">
    <h2>더 나은 내일을 만들어 줄 <br><span>올바른 창업의 길을 만나보세요</span></h2>
    <!-- <SearchInput :fActive="fActive" :storeActive="storeActive"></SearchInput> -->
    <three-select-box></three-select-box>
  </div>
  <!-- //메인이미지 영역-->
</template>
<script>
// import SearchInput from './SearchInputNew.vue'
import ThreeSelectBox from './threeSelectBox.vue'
export default {
  name: 'BigSubHeader',
  components: { ThreeSelectBox },
  data() {
    return {
      fActive : true,
      storeActive : false
    }
  }
}
</script>
