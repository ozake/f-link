<template>
		<div class="search">
            <form name="search" id="search" v-on:submit.prevent>
				<fieldset>
					<legend>검색</legend>
					<input name="s_keyword" title="검색어 입력" type="text" placeholder="지역명으로 검색" @input="keyword" v-bind:value="searchTxt" @keydown.up="keyUp" @keydown.down="keyDown" 
            @keyup.enter="keyEnter" @blur="blur" @focus="focus" ref="search" autocomplete="off">
					<a href="#none" @click="searchResMove"><img alt="검색하기" src="http://img.mk.co.kr/2018/franchise/search_w.png" class="sbtn"></a>
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
</template>
<script>
import ApiModel from "../model/apiModel.js"
export default {
  name: 'SearchInputAside',
  props: {
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
      searchArr: [],
      searchSelected: {}
    }
  },
  
  methods: {
    keyword(e){
        clearTimeout(this.T)
        this.T = setTimeout(()=>{        
            if(e.target.value !== ''){
                    this.cursor = -1
                    this.searchAddr(e.target.value)
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
        this.searchTxt = item.txt
        this.searchSelected = item
        this.$EventBus.$emit('addrSearch', item.txt)
        this.searchSelected = {}
        this.$refs.search.blur()
          //location.href = `./franchiseView/${item.no}`
          //this.$router.push({ name: 'franchise-view', params: {id:item.no } })
        //this.$emit('item-selected', item)
      } 
    },
    keyEnter (e) {
      if (this.searchAreaToggle && this.searchDisplay[this.cursor]) {
        this.onSelectItem(this.searchDisplay[this.cursor])
        this.searchAreaToggle = false
        
      }
    },
    searchResMove(){
        if(this.searchSelected){
            this.$EventBus.$emit('addrSearch', this.searchSelected.txt)
        }
                //location.href = `./store/${this.sectorSelected.no}/${this.addrSelected.txt}`
                //this.$router.push({ name: 'store-search', params: {categoryCode: this.sectorSelected.no, addr: this.addrSelected.txt } })
        
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
    submitWall () {

    }

     
  }
  

}
</script>
<style scoped>

/* .search_layer {
  height: 200px;
  overflow-y: auto;
  z-index: 10000;
  line-height: 30px;
} */
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
.search_layer {
	position: absolute;
    top: 58px;
    background: #fff;
    width: 100%;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 7px 20px;
    background: #f5f5f5;
	height: 200px;
    overflow-y: auto;
}
.search_layer ul li {
    padding: 5px 0;
}
.search_layer ul li a {
	font-size: 17px;
    letter-spacing: -.5px;
}
</style>