<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search" v-on:submit.prevent="keymonitor">
          <fieldset class="searcharea">
            <legend>검색</legend>
            <input v-if="fActive" name="s_keyword" title="검색어 입력" type="text" placeholder="프랜차이즈명, 회사명으로 검색" v-on:input="typing" v-bind:value="searchTxt" v-on:keyup="keymonitor" ref="search">
            <input v-if="storeActive" name="s_keyword" title="검색어 입력" type="text" placeholder="지역, 업종으로 검색" v-on:input="typing" v-bind:value="searchTxt" v-on:keyup="keymonitor" ref="search"> 
            <button type="button" v-on:click="searchFc"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
          <!-- 메인 검색 레이어-->
						 <div class="search_layer" v-show="searchAreaToggle">
							  <ul>	
								 <li v-for="item in searchDisplay"><a href="#" v-on:click="selector(item.displayTxt, item.flag, item.regnumber)">{{item.displayTxt}}</a></li>
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
      franchiseSelectedCode: '',
      franchiseSelected: false,
      searchAreaToggle: false,
      addrCodeSelected: false,
      addrCode: '',
      addrCodeTxt: ''
    }
  },
  watch: {
    searchTxt: function(val) {
      this.$nextTick(function () {
        this.searchFc(val)
      })
    },

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
                }
              })
      }
      else if(this.storeActive){
        let searchArr = []
        val = val.replace(/\s\s/g, " ")
        searchArr = val.split( ' ', 2 )
        /* if(searchArr.length === 1){
          this.sectorSelected = false
          let addr = searchArr[0]
          this.apiModel.getAddrSearch(addr).then((result)=>{
              console.log(addr)
              if(result.status === 200){
                let data = result.data
                let tmpArr = []
                let tmp = ''
                for (const value of data) {
                  tmp = { regnumber: value.codelaw, displayTxt: value.lawadress, flag:'addr' }
                  tmpArr.push(tmp)
                }
                this.searchDisplay = tmpArr
              }
            })

        } */
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
                  tmp = { regnumber:value.code2, displayTxt: value.category2, flag:'sector' }
                  tmpArr.push(tmp)
                }
                this.searchDisplay = tmpArr
              }
            })

        }
      }
      

    },
    selector(txt, flag, regnumber){
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
        this.franchiseSelectedCode = regnumber
        this.searchTxt = this.franchiseSelectedTxt
        this.$refs.search.focus()
      }
      else if(flag === 'addr'){
        console.log('지역 선택')
        this.addrCodeSelected = true
        this.addrCodeTxt = txt
        this.searchDisplay = ''
        this.searchAreaToggle = false
        this.addrCode = regnumber
        this.searchTxt = this.sectorSelectedTxt + ' ' + this.addrCodeTxt
        this.$refs.search.focus()
      }
    },
    keymonitor(event){
      console.log(event.key)
       if(event.key == "Enter")
       {  
         if(this.fActive){
           if(this.franchiseSelected){
           location.href = `./franchiseView/${this.franchiseSelectedCode}`
           }
         }
         else if(this.storeActive){
           if(this.sectorSelected && this.addrCodeSelected){
           //location.href = `./franchiseView/${this.franchiseSelectedCode}`
           alert('제대로 검색')
          }
          else{
            alert('반드시 지역 + 업종으로 검색해주세요')
          }
         }
         //console.log("enter key was pressed!");
         return false
       }
    },
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
