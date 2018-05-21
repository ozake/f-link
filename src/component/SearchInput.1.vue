<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search">
          <fieldset class="searcharea">
            <legend>검색</legend>
            <input v-if="fActive" name="s_keyword" title="검색어 입력" type="text" placeholder="업종, 프랜차이즈명, 회사명으로 검색" v-on:input="typing" v-bind:value="searchTxt" ref="search">
            <input v-if="storeActive" name="s_keyword" title="검색어 입력" type="text" placeholder="지역, 업종으로 검색" v-on:input="typing" v-bind:value="searchTxt" ref="search"> 
            <button type="button" v-on:click="searchFc"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
          <!-- 메인 검색 레이어-->
						 <div class="search_layer" v-show="searchAreaToggle">
							  <ul>	
								 <li v-for="item in searchDisplay"><a href="#" v-on:click="selector(item.displayTxt, item.flag)">{{item.displayTxt}}</a></li>
							  </ul>
						 </div>
						 <!--// 메인 검색 레이어-->

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
      sectorSelectedTxt: '',
      sectorSelected: false,
      franchiseSelectedTxt: '',
      franchiseSelected: false,
      searchAreaToggle: false
    }
  },
  watch: {
    searchTxt: function(val) {
      this.$nextTick(function () {
        this.searchFc(val)
      })
    }
  },
  methods: {
    typing(e) {
    	this.searchTxt = e.target.value
    },
    searchFc(val){
      if(val === ''){
        this.searchTxt = ''
        this.searchAreaToggle = false
        return
      }
      this.searchAreaToggle = true
      let searchArr = []
      val = val.replace(/\s\s/g, " ")
      searchArr = val.split( ' ', 2 )
      console.log(searchArr)
      console.log(searchArr.length)
      if(this.fActive){
        if(searchArr.length === 1){
          this.sectorSelected = false
          let sector = searchArr[0]
          this.apiModel.getSectorSearch(sector).then((result)=>{
              //console.log(result)
              if(result.status === 200){
                let data = result.data
                let tmpArr = []
                let tmp = ''
                for (const value of data) {
                  tmp = { href: '#none', displayTxt: value.category2, flag:'sector' }
                  tmpArr.push(tmp)
                }
                this.searchDisplay = tmpArr
              }
            })

        }
        if(searchArr.length === 2){
          if(this.sectorSelected){

            this.sFranTxt = searchArr[1]
            if(searchArr[1] === '' ){
              this.sFranTxt = ''
              this.searchDisplay = ''
            }
            else {
              this.apiModel.getFranchiseSearch(this.sFranTxt).then((result)=>{
                //console.log(result)
                if(result.status === 200){
                  let data = result.data
                  let tmpArr = []
                  let tmp = ''
                  for (const value of data) {
                    tmp = { href: '#none', displayTxt: value.brand+' '+value.company, flag:'franchise' }
                    tmpArr.push(tmp)
                  }
                  this.searchDisplay = tmpArr
                }
              })
            }
            
          }else{
            alert('업종을 선택해주세요.')
            this.searchTxt = val.replace(/\s/g, "")
          }
          
        }


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

</style>
