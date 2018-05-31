<template>
    <div>


      <!-- 메인 탭-->
      <ul class="mtab">
        <li v-bind:class="[ fActive ? activeClass : inActiveClass ]" v-on:click="tabOnOff('franchise')"><a href="#none" >프랜차이즈 검색</a></li>
        <li v-bind:class="[ storeActive ? activeClass : inActiveClass ]" v-on:click="tabOnOff('store')"><a href="#none" >매장&매물 찾기</a></li>
      </ul>
      <!-- //메인 탭-->
      <SearchInput :fActive="fActive" :storeActive="storeActive"></SearchInput>

    </div>
</template>
<script>
// import SearchInput from './SearchInput.vue'
import SearchInput from './SearchInputNew.vue'
export default {
  name: 'MainSearch',
  components: { SearchInput },
  data(){
    return {
      fActive: true,
      storeActive: false,
      activeClass: 'mtab_on',
      inActiveClass: 'mtab_off'
    }
  },
  computed: {
    // 계산된 getter
    /* searchFlag: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      let flag = '' 
      if(this.fActive){
        flag = ''
      }
      else if(this.storeActive){

      }
      return 
    } */
  },
  methods : {
    tabOnOff(val){
      if(val === 'franchise'){
        this.fActive = true
        this.storeActive = false
      }
      else if(val === 'store'){
        this.fActive = false
        this.storeActive = true
      }
    }

  }
}
</script>
<style scoped>
#search {
    overflow: hidden;
}
</style>
