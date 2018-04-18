<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search">
          <fieldset>
            <legend>검색</legend>
            <input name="s_keyword" title="검색어 입력" type="text" placeholder="업종, 프랜차이즈명, 회사명으로 검색">
            <button type="button" v-on:click="searchFc"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
        </form>
       </div>
       <!-- //메인 검색-->
    </div>
</template>
<script>
export default {
  name: 'SearchInput',
  methods: {
    searchFc(){
      const baseURI = 'http://www.f-link.co.kr';
      this.$http.post(`${baseURI}/container/OP-405.php`)
      .then((result) => {
        console.log(result)
        //console.log(result.status)
        if(result.status === 200){
          console.log(result.data.data)
        }

      })
    }
  }
}
</script>
<style scoped>
#search {
    overflow: hidden;
}
</style>
