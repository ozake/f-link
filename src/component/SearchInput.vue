<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search" v-on:submit.prevent="keymonitor">
          <fieldset class="searcharea">
            <legend>검색</legend>
            <input v-if="fActive" name="s_keyword" title="검색어 입력" type="text" placeholder="프랜차이즈명, 회사명으로 검색" v-on:input="typing" v-model="searchTxt" @keyup.enter="searchResMove" @keyup.down="keydown" ref="search">
            <input v-if="storeActive" name="s_keyword" title="검색어 입력" type="text" placeholder="지역, 업종으로 검색" v-on:input="typing" v-model="searchTxt" @keyup.enter="searchResMove" @keyup.down="keydown"  ref="search" id="search">
            <button type="button" v-on:click="searchResMove"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
          <!-- 메인 검색 레이어-->
              <select multiple class="search_layer" v-show="searchAreaToggle" ref="suggestDom" v-model="selectBox">
                <template v-for="(item,index) in searchDisplay" >
                  <option v-on:click="selector(item)">{{item.displayTxt}}</option>
                </template>
              </select>

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
    //let searchinput = this.$refs.search
    const agent = navigator.userAgent.toLowerCase();
     if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
      this.isIe = true
    }
  },
  data(){
    return {
      searchTxt: '',
      sFranTxt: '',
      apiModel: new ApiModel(this.$http),
      searchDisplay: [],
      sectorSelectedTxt: '',
      sectorCode: '',
      sectorSelected: false,
      franchiseSelectedTxt: '',
      franchiseSelectedCode: '',
      franchiseSelected: false,
      searchAreaToggle: false,
      addrCodeSelected: false,
      addrCode: '',
      addrCodeTxt: '',
      isIe: false,
      to: '',
      selectBox: []
    }
  },
  watch : {
    selectBox: function(val){
      console.log(val)
    }
  },
  methods: {
    getLabel (item) {
      return item.name
    },
    updateItems (text) {
      this.apiModel.getFranchiseSearch(text).then((result)=>{
                ////console.log(result)
                if(result.status === 200){
                  let data = result.data
                  let tmpArr = []
                  let tmp = ''
                  for (const value of data) {
                    //tmp = { regnumber: value.regnumber, displayTxt: value.brand+' '+value.company, flag:'franchise' }
                    tmp =value.brand
                    tmpArr.push(tmp)
                  }
                  this.items = tmpArr
                }
              })
    },
    typing(e){
      ////console.log(e.target.value)
      clearTimeout(this.to);
        this.to = setTimeout(()=>{
          ////console.log(e.target.value);
          this.searchFc(e.target.value)
        }, 400);
      this.searchTxt = e.target.value
      //this.searchFc(e.target.value)
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
                ////console.log(result)
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

        //val = val.replace(/\s\s/g, " ")
        searchArr = val.split( ' ', 2 )
        //console.log(searchArr)
        if(searchArr.length === 1){
          this.addrCodeSelected = false
          let addr = searchArr[0]
          this.apiModel.getAddrSearch(addr).then((result)=>{
              // //console.log(addr)
              if(result.status === 200){
                let data = result.data
                //console.log(data)
                let tmpArr = []
                let tmp = ''
                for (const value of data) {
                  let areaTxt = value.area2
                  if(value.area3){
                    areaTxt = areaTxt +  '(' +value.area3 + ')'
                  }
                  tmp = { regnumber: value.code, displayTxt: areaTxt, flag:'addr' }
                  tmpArr.push(tmp)
                }
                this.searchDisplay = tmpArr
                //this.$refs.suggestDom.focus()
              }
            })

        }
        if(searchArr.length === 2){
          this.sectorSelected = false
          let sector = searchArr[1]
          if(sector){
            this.apiModel.getSectorSearch(sector).then((result)=>{
              ////console.log(result)
              if(result.status === 200){
                let data = result.data
                let tmpArr = []
                let tmp = ''
                for (const value of data) {
                  tmp = { regnumber:value.code2, displayTxt: value.category2, flag:'sector' }
                  tmpArr.push(tmp)
                }
                this.searchDisplay = tmpArr
                //this.$refs.suggestDom.focus()
              }
            })
          }
        }
      }
    },

    selector(item){
      this.$refs.suggestDom.focus()
      this.$nextTick(()=>{
      console.log('포커스발생')
      let flag = item.flag;
      switch(flag){
        case "franchise":
          //console.log("프렌차이즈 선택")
          this.franchiseSelected = true
          this.searchAreaToggle = false
          //this.$refs.search.focus()
          this.searchDisplay = [];

          // for test
          this.franchiseSelectedTxt = item.displayTxt;
          this.franchiseSelectedCode = item.regnumber;
          this.searchTxt = item.displayTxt;
        break;
        case "sector":
          this.sectorSelected = true
          this.searchAreaToggle = false
          //this.$refs.search.focus()
          this.searchDisplay = [];

          // for test
          this.sectorSelectedTxt = item.displayTxt;
          this.sectorCode = item.regnumber;

          this.searchTxt = this.searchTxt.split(" ")[0] + ' ' + item.displayTxt;
        break;
        case "addr":
          this.addrCodeSelected = true
          this.searchAreaToggle = false
          //this.$refs.search.focus()
          this.searchDisplay = [];

          // for test
          this.addrCodeTxt = item.displayTxt;
          this.addrCode = item.regnumber;
          this.searchTxt = item.displayTxt;
        break;
      }
      })

    },
    keymonitor(event){
      this.searchTxt = event.target.value
      this.searchFc(event.target.value)
    },
    searchResMove(){
      if(this.fActive){
           if(this.franchiseSelected){
           location.href = `./franchiseView/${this.franchiseSelectedCode}`
           }else{
             alert('브랜드 또는 회사명을 입력해주세요')
           }
         }
         else if(this.storeActive){
           if(this.sectorSelected && this.addrCodeSelected){
           location.href = `./store/${this.sectorCode}/${this.addrCodeTxt}`
           //alert('제대로 검색')
          }
          else{
            alert('지역 + 업종으로 검색해주세요')
          }
         }
    },
    keydown(){
      this.$refs.suggestDom.focus()
    }
  }
}
</script>
<style scoped>
.search_layer {
  height: 200px;
  overflow-y: auto;
  z-index: 10000;
  line-height: 30px;
}
.searcharea button {
  height: 56px;
}

</style>
