<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search" v-on:submit.prevent="keymonitor">
          <fieldset class="searcharea">
            <legend>검색</legend>
            <!-- <v-autocomplete :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems">
            </v-autocomplete> -->
            <input v-if="fActive" name="s_keyword" title="검색어 입력" type="text" placeholder="프랜차이즈명, 회사명으로 검색" v-on:input="typing" v-bind:value="searchTxt" @keyup.enter="searchResMove" @keyup.down="keydown" ref="search">
            <input v-if="storeActive" name="s_keyword" title="검색어 입력" type="text" placeholder="지역, 업종으로 검색" v-on:input="typing" v-bind:value="searchTxt" @keyup.enter="searchResMove" @keyup.down="keydown"  ref="search">
            <button type="button" v-on:click="searchResMove"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
          <!-- 메인 검색 레이어-->
              <select multiple class="search_layer" v-show="searchAreaToggle" ref="suggestDom" v-model="suggestSlect" @keyup.enter="selector">
                  <option v-for="(item,index) in searchDisplay" :value="{code:item.regnumber, txt:item.displayTxt, flag:item.flag}" >{{item.displayTxt}}</option>
              </select>
						 <!-- <div class="search_layer" v-show="searchAreaToggle"> -->
               <!-- <v-autocomplete :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems">
               </v-autocomplete> -->
							  <!-- <ul ref="suggestDom">
								 <li v-for="(item,index) in searchDisplay" :id="index+'li'"><a :id="index+'txt'" href="#none" v-on:click="selector(item.displayTxt, item.flag, item.regnumber)">{{item.displayTxt}}</a></li>
							  </ul> -->

						 <!-- </div> -->
						 <!--// 메인 검색 레이어-->

        </form>
       </div>
       <!-- //메인 검색-->
    </div>
</template>
<script>
// import 'v-autocomplete/dist/v-autocomplete.css'
// import ItemTemplate from './Item.vue'
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
      sectorCode: '',
      sectorSelected: false,
      franchiseSelectedTxt: '',
      franchiseSelectedCode: '',
      franchiseSelected: false,
      searchAreaToggle: false,
      addrCodeSelected: false,
      addrCode: '',
      addrCodeTxt: '',
      suggestSlect: [],
      flag: ''
      // item: {id: 9, name: 'Lion', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
      // items: [],
      // template: ItemTemplate
    }
  },
  watch: {
    /* searchTxt: function(val) {
      this.$nextTick(function () {
        this.searchFc(val)
      })
    }, */
    suggestSlect: function (val) {
      let data = val[0]
      console.log(data.code)
      this.flag = data.flag
      if(data.flag === 'addr'){
        this.searchTxt = data.txt
        this.addrCodeTxt = data.txt
        this.addrCode = data.code
      }
      else if(data.flag === 'sector'){
        this.sectorSelectedTxt = data.txt
        this.sectorCode = data.code
        this.searchTxt = this.addrCodeTxt + ' ' + data.txt
      }
      else if(data.flag === 'franchise'){
        this.franchiseSelectedTxt = data.txt
        this.franchiseSelectedCode = data.code
        this.searchTxt = data.txt
      }


    }
  },
  methods: {
    getLabel (item) {
      return item.name
    },
    updateItems (text) {
      this.apiModel.getFranchiseSearch(text).then((result)=>{
                //console.log(result)
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
      console.log(e.key)
      this.searchTxt = e.target.value
      this.searchFc(e.target.value)
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
        console.log(searchArr)
        if(searchArr.length === 1){
          this.addrCodeSelected = false
          let addr = searchArr[0]
          this.apiModel.getAddrSearch(addr).then((result)=>{
              // console.log(addr)
              if(result.status === 200){
                let data = result.data
                console.log(data)
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
              }
            })

        }
        if(searchArr.length === 2){
          this.sectorSelected = false
          let sector = searchArr[1]
          if(sector){
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
      }


    },
    selector(){
      let flag = this.flag
      if(flag === 'sector'){
        this.sectorSelected = true
        this.searchAreaToggle = false
        this.$refs.search.focus()
        this.searchDisplay = ''
        /* this.sectorSelectedTxt = txt
        this.sectorCode = regnumber
        this.searchTxt = this.addrCodeTxt + ' ' + this.sectorSelectedTxt
          */
      }
      else if(flag === 'franchise'){
        console.log("프렌차이즈 선택")
        this.franchiseSelected = true
        this.searchAreaToggle = false
        this.$refs.search.focus()
        this.searchDisplay = ''
        /*
        this.franchiseSelectedTxt = txt
        this.franchiseSelectedCode = regnumber
        this.searchTxt = this.franchiseSelectedTxt */

      }
      else if(flag === 'addr'){
        this.addrCodeSelected = true
        this.searchAreaToggle = false
        this.$refs.search.focus()
        this.searchDisplay = ''
        /* this.addrCodeTxt = txt
        this.addrCode = regnumber
        this.searchTxt = txt */

      }
    },
    keymonitor(event){
      //console.log(event.key)
       if(event.key == "Enter")
       {
         this.searchResMove()
         //console.log("enter key was pressed!");
         return false
       }
       if(event.key == "ArrowDown"){
         //this.$refs.suggestDom.focus()
       }
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
