<template>
    <div>
      <!-- 메인 검색-->
      <div class="msearch">
        <form name="search" id="search" v-on:submit.prevent="keyEnter">
          <fieldset class="searcharea">
            <legend>검색</legend>
            <input v-if="fActive" name="s_keyword" title="검색어 입력" type="text" placeholder="프랜차이즈명, 회사명으로 검색" 
            @input="keyword" v-bind:value="searchTxt" @keydown.up="keyUp" @keydown.down="keyDown" 
            @keyup.enter="keyEnter" ref="search" autocomplete="off">
            <input v-if="storeActive" name="s_keyword" title="검색어 입력" type="text" placeholder="지역, 업종으로 검색" 
            @input="keyword" v-bind:value="searchTxt" @keydown.up="keyUp" @keydown.down="keyDown" 
            @keyup.enter="keyEnter" ref="search" autocomplete="off">
            <button type="button" v-on:click="searchFc"><img src="http://img.mk.co.kr/2018/franchise/msearch.png" alt="검색하기"></button>
          </fieldset>
          <!-- 메인 검색 레이어-->
            <div class="search_layer" v-show="searchAreaToggle">
                <ul>	
                    <li v-for="(item, index) in searchDisplay" 
                    class="autocomplete-item"
                     :class="{'autocomplete-item-active': index === cursor}" @click="onClickItem(item)"><a href="#none" >{{item.brand}}</a></li>
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
      searchAreaToggle: false
    }
  },
  methods: {
    keyword(e){
        clearTimeout(this.T)
        this.T = setTimeout(()=>{
            this.searchFc(e.target.value)
            this.searchTxt = e.target.value
        },400)
    },
    inputChange(e){
        console.log(e.target.value)
        this.$emit('change', this.searchText)
    },
    searchFc(data){
        this.apiModel.getFranchiseSearch(data).then((result)=>{
            if(result.status === 200){
                console.log(result)
                this.searchDisplay = result.data
                this.searchAreaToggle = true
            }
        })
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
        this.searchText = item.brand
        if(this.fActive){
          location.href = `./franchiseView/${item.regnumber}`
        }
        //this.$emit('item-selected', item)
      } 
    },
    keyEnter (e) {
      if (this.searchAreaToggle && this.searchDisplay[this.cursor]) {
        this.onSelectItem(this.searchDisplay[this.cursor])
        this.searchAreaToggle = false
      }
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