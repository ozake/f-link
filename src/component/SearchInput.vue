<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search" v-on:keyup="(event)=>{if(event.key === 'Enter')return false}">
          <fieldset class="searcharea">
            <legend>검색</legend>
            <input v-if="fActive" name="s_keyword" title="검색어 입력" type="text" placeholder="프랜차이즈명, 회사명으로 검색" v-on:input="typing" v-bind:value="searchTxt" v-on:keyup="keymonitor" ref="search">
            <input v-if="storeActive" name="s_keyword" title="검색어 입력" type="text" placeholder="지역, 업종으로 검색" v-on:input="typing" v-bind:value="searchTxt" v-on:keyup="keymonitor" ref="search">
            <button type="button" v-on:click="searchFc"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
          <!-- 메인 검색 레이어-->
						 <div class="search_layer" v-show="searchAreaToggle">
							  <ul>
								 <li v-for="(item, index) in searchDisplay" :index="index" v-bind:class="focusClass(index)" ref="focusIndex"><router-link :to="{ name: 'franchise-view', params: {id: item.regnumber } }">{{item.displayTxt}}</router-link></li>
							  </ul>
						 </div>
						 <!--// 메인 검색 레이어-->
            <!-- v-on:click="selector(item.displayTxt, item.flag)" -->
        </form>
       </div>
       <!-- //메인 검색-->
    </div>
</template>
<script>
import ApiModel from "../model/apiModel.js"
export default {
  name: 'SearchInput',
  props: {
    fActive: Boolean,
    storeActive: Boolean
  },
  created(){

  },
  data(){
    return {
      searchTxt: '',
      sFranTxt: '',
      apiModel: new ApiModel(this.$http),
      searchDisplay: [],
      searchDisplayLength: 0,
      searchFocus: 0,
      sectorSelectedTxt: '',
      sectorSelected: false,
      franchiseSelectedTxt: '',
      franchiseSelected: false,
      searchAreaToggle: false
    }
  },
  computed: {
    /* focusClass: function() {

    } */
  },
  watch: {
    searchTxt: function(val) {
      this.$nextTick(function () {
        this.searchFc(val)
      })
    },
    fActive: function(val) {
      if(!val){
        this.searchTxt = ''
        this.searchAreaToggle = false
        this.searchDisplay = []
      }
    },
    storeActive: function(val) {
      if(!val){
        this.searchTxt = ''
        this.searchAreaToggle = false
        this.searchDisplay = []
      }
    },
    /* searchFocus: function(val) {
      this.$nextTick(function () {
        //console.log(this.$refs.focusIndex)
        let Dom = this.$refs.focusIndex
        //let focusDom = Dom.getElementsByClassName('searchFocus')
        //console.log(Dom)
        for (const value of Dom) {
          //console.log(value)
          if(value.className === 'searchFocus'){
            value.firstChild.focus()
          }
        }
      })
    } */

  },
  methods: {
    typing(e) {
    	this.searchTxt = e.target.value
    },
    focusClass(val){
      let flag = false
      if((val+1) === this.searchFocus){
        flag = true

      }
      return {
        searchFocus: flag
      }
    },
    searchFc(val){
      if(val === ''){
        this.searchTxt = ''
        this.searchAreaToggle = false
        return
      }
      this.searchAreaToggle = true
      if(this.fActive){
        this.apiModel.getFranchiseSearch(val).then((result)=>{
                //console.log(result)
                if(result.status === 200){
                  let data = result.data
                  let tmpArr = []
                  let tmp = ''
                  for (const value of data) {
                    tmp = { regnumber: value.regnumber, displayTxt: value.brand+' '+value.company, flag:'franchise' }
                    tmpArr.push(tmp)
                  }
                  this.searchDisplay = tmpArr
                  this.searchDisplayLength = tmpArr.length
                }
              })
      }

    },
    selector(txt, flag){
      if(flag === 'sector'){
        this.sectorSelected = true
        this.searchTxt = txt
        this.sectorSelectedTxt = txt
        this.$refs.search.focus()
        this.searchDisplay = ''
      }
      else if(flag === 'franchise'){
        console.log("프렌차이즈 선택")
        this.franchiseSelected = true
        this.searchDisplay = ''
        this.searchAreaToggle = false
        this.franchiseSelectedTxt = txt
        this.searchTxt = this.sectorSelectedTxt + ' ' + this.franchiseSelectedTxt
      }
    },
    keymonitor(event){
      console.log(event.key)
       if(event.key === "ArrowDown")
       {
         if(this.searchFocus < this.searchDisplayLength){
           this.searchFocus++
         }
       }
       else if(event.key === "ArrowUp"){
         if(this.searchFocus > 0){
           this.searchFocus--
         }
       }
    }
  }
}
</script>
<style scoped>
.search_layer {
  height: 200px;
  overflow-y: auto;
}
/* #search {
    position: relative;
    width: 606px;
    background-color: #fff;
    height: 56px;
} */
/* .searcharea {
  height: 56px;
} */
.searcharea button {
  height: 56px;
}
.searchFocus {
    border-bottom: 1.5px;
    border-color: #4db0077a;
    border-bottom-style: ridge;
}
</style>
