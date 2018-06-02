<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search" v-on:submit.prevent="keyEnter">
          <fieldset class="searcharea">
            <legend>검색</legend>
            <input v-if="fActive" name="s_keyword" title="검색어 입력" type="text" placeholder="프랜차이즈명, 회사명으로 검색" 
            @input="keyword" v-bind:value="searchTxt" @keydown.up="keyUp" @keydown.down="keyDown" 
            @keyup.enter="keyEnter" @blur="blur" @focus="focus" ref="search" autocomplete="off">
            <input v-if="storeActive" name="s_keyword" title="검색어 입력" type="text" placeholder="지역, 업종으로 검색" 
            @input="keyword" v-bind:value="searchTxt" @keydown.up="keyUp" @keydown.down="keyDown" 
            @keyup.enter="keyEnter" @blur="blur" @focus="focus" ref="search" autocomplete="off">
            <button type="button" v-on:click="searchResMove"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
          <!-- 메인 검색 레이어-->
            <div class="search_layer" v-show="searchAreaToggle">
                <ul @keydown.up="keyUp" @keydown.down="keyDown">	
                    <li v-for="(item, index) in searchDisplay" 
                    class="autocomplete-item"
                     :class="{'autocomplete-item-active': index === cursor}" @click="onClickItem(item)"><a href="#none" >{{item.txt}}</a></li>
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
  components: {

  },
  data () {
    return {
      searchDisplay : [],
      cursor: -1,
      apiModel : new ApiModel(this.$http),
      T : '',
      searchTxt: '',
      searchAreaToggle: false,
      addrSelected: {},
      addrOrgsearchTxt: '',
      addrSelectedFlag: false,
      sectorSelected: '',
      sectorSelectedFlag: false,
      sectorOrgsearchTxt: '',
      searchArr: []
    }
  },
  
  methods: {
    keyword(e){
        clearTimeout(this.T)
        this.T = setTimeout(()=>{
            this.cursor = -1
            if(this.fActive){
                if(e.target.value !== ''){
                    this.searchFc(e.target.value)
                }
            }
            else if(this.storeActive){
                let searchArr = []
                searchArr = e.target.value.split( ' ', 2 )
                this.searchArr = searchArr
                if(!this.addrSelected && searchArr.length === 2){
                    this.searchTxt = ''
                }else{

                }
                if(searchArr.length === 1){
                    if(this.addrSelectedFlag){
                        if(this.addrSelected.txt !== searchArr[0]){
                            this.addrSelectedFlag = false
                            this.searchAddr(searchArr[0])
                        }
                    }else{
                        this.searchAddr(searchArr[0])
                    }
                    
                }else if(searchArr.length === 2){
                    this.searchAreaToggle = true
                    this.searchDisplay = ''
                    if(this.sectorSelectedFlag){
                        if(this.sectorSelected.txt !== searchArr[1]){
                            this.sectorSelectedFlag = false
                            if(searchArr[1] !== ''){
                            this.searchSector(searchArr[1])
                            }
                        }
                    }else{
                        if(searchArr[1] !== ''){
                            this.searchSector(searchArr[1])
                        }
                        
                    }
                    
                }
                
                
            }
            
            this.searchTxt = e.target.value
        },400)
    },
    /* inputChange(e){
        console.log(e.target.value)
        this.$emit('change', this.searchText)
    }, */
    searchFc(data){
        if(data !== ''){
            this.apiModel.getFranchiseSearch(data).then((result)=>{
            if(result.status === 200){
                console.log(result)
                let data = []
                for (const value of result.data) {
                    let tmpdata = {}
                    tmpdata.txt = value.brand
                    tmpdata.no = value.regnumber
                    data.push(tmpdata)
                }
                this.searchDisplay = data
            }
        })
        }
        
    },
    searchAddr(data){
        if(data !== ''){
            this.apiModel.getAddrSearch(data).then((result)=>{
            if(result.status === 200){
                //console.log(result)
                let data = []
                for (const value of result.data) {
                    let tmpdata ={}
                    tmpdata.txt = value.area2
                    if(value.area3){
                        tmpdata.txt = tmpdata.txt + "(" + value.area3 + ")"
                    }
                    tmpdata.no = value.code
                    tmpdata.flag = 'addr'
                    data.push(tmpdata)
                }

                this.searchDisplay = data
            }
        })
        }
        
    },
    searchSector(data){
        if(data !== ''){
            this.apiModel.getSectorSearch(data).then((result)=>{
            if(result.status === 200){
                console.log(result)
                let data = []
                for (const value of result.data) {
                    let tmpdata ={}
                    tmpdata.txt = value.category2
                    tmpdata.no = value.code2
                    tmpdata.flag = 'sector'
                    data.push(tmpdata)
                }
                this.searchDisplay = data
            }
            })
        }
        
    },
    change(data){
        console.log(data)
    },
    keyUp (e) {
        if (this.cursor > -1) {
            this.cursor--
            this.itemView(this.$el.getElementsByClassName('autocomplete-item')[this.cursor])
        }
        if(this.cursor === -1){
            this.cursor = this.searchDisplay.length
        }
    },

    keyDown (e) {
        // this.$refs.search.blur()
        this.addrOrgsearchTxt = this.searchTxt
        if (this.cursor < this.searchDisplay.length) {
            this.cursor++
            this.itemView(this.$el.getElementsByClassName('autocomplete-item')[this.cursor])
        }
        if(this.cursor === this.searchDisplay.length) {
            this.cursor = 0
        }
    },
    itemView (item) {
      if (item && item.scrollIntoView) {
        item.scrollIntoView(false)
      }
    },
    onClickItem(item) {
      this.onSelectItem(item)
    },

    onSelectItem (item) {
      if (item) {
        this.searchDisplay = [item]
        
        if(this.fActive){
          this.searchTxt = item.txt
          //location.href = `./franchiseView/${item.no}`
          this.$router.push({ name: 'franchise-view', params: {id:item.no } })
        }
        else if(this.storeActive){
            if(item.flag === 'addr'){
                this.addrOrgsearchTxt = this.searchTxt
                this.searchTxt = item.txt
                this.addrSelected = item
                this.addrSelectedFlag = true
                this.$refs.search.focus()
                this.searchAreaToggle = false
            }
            else if(item.flag === 'sector'){
                this.searchTxt = this.addrSelected.txt +' '+ item.txt
                this.sectorSelected = item
                this.sectorSelectedFlag = true
                this.searchAreaToggle = false
                /* if(this.addrSelectedFlag && this.sectorSelectedFlag){
                    location.href = `./store/${item.no}/${this.addrSelected.txt}`
                } */

            }
        }
        //this.$emit('item-selected', item)
      } 
    },
    keyEnter (e) {
      if (this.searchAreaToggle && this.searchDisplay[this.cursor]) {
        this.onSelectItem(this.searchDisplay[this.cursor])
        this.searchAreaToggle = false
        if(this.addrSelectedFlag && this.sectorSelectedFlag){
            this.searchResMove()
        }
      }
    },
    searchResMove(){
        if(this.fActive){

        }else if(this.storeActive){
            if(this.sectorSelectedFlag && this.addrSelectedFlag){
                //location.href = `./store/${this.sectorSelected.no}/${this.addrSelected.txt}`
                this.$router.push({ name: 'store-search', params: {categoryCode: this.sectorSelected.no, addr: this.addrSelected.txt } })
            }else{
                alert('지역 + 업종을 서제스트에서 선택해주세요.')
            }
        }
        
    },
    blur () {
      setTimeout( () => {
          this.searchAreaToggle = false
          this.searchDisplay = ''
          }, 200)
    },
    focus () {
      this.searchAreaToggle = true
    },

     
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
.autocomplete-item-active {
    background-color: antiquewhite;
}
</style>