<template>
      <div id="content">
        <BigSubHeader></BigSubHeader>
        <!-- 서브메뉴-->
  			<div class="smenu">
          <div class="menuWrap">
            <button class="btn_menu" v-on:click="menuToggle">
					    <img v-show="!memuBoardFlag" src="http://img.mk.co.kr/2018/franchise/list.png" alt="전체메뉴보기">
					    <img v-show="memuBoardFlag" src="http://img.mk.co.kr/2018/franchise/list_close.png" alt="전체메뉴닫기">
				    </button>
            <div class="menuBody">
              <ul>
                <li v-for="category in categoryCode"><router-link :to="{ name: 'franchise-list', params: {categoryCode: category.categoryName } }">{{category.categoryName}}</router-link></li>
              </ul>
            </div>
            <div class="btn_arrow" style="padding-top: 0px">
              <ul>
                <li class="img1"><a href="#none"><img src="http://img.mk.co.kr/2018/franchise/list_prev.png" alt="앞으로"></a></li>
                <li class="img1"><a href="#none"><img src="http://img.mk.co.kr/2018/franchise/list_next.png" alt="뒤로"></a></li>
              </ul>
            </div>
            <transition name="fade">
            <div v-if="memuBoardFlag" class="tab_list">
					    <ul>
						    <li v-for="category in FullCteCode"><router-link :to="{ name: 'franchise-list', params: {categoryCode: category.categoryName } }">{{category.categoryName}}</router-link></li>
					    </ul>
            </div>
            </transition>
          </div>

  			</div>
  			<!-- //서브메뉴-->

        <!-- 프랜차이즈리스트-->
			  <div class="fran_list">
          <div class="list_wrap" v-for="(listItem, idx) in this.listItems">
            <BoxContent  v-for="(item, index) in listItem" :index="index" :item="item"></BoxContent>
          </div>
        </div>



      </div>
</template>
<style scoped>
.list_wrap {
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 60px;
  margin-bottom: 60px;
}
.list_wrap:last-child {
    border: 0;
    padding-bottom: 0px;
}
.smenu{
  overflow: hidden;
}
.menuWrap{
  width: 1100px;
  overflow: hidden;
  margin: 0 auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<script>
import BigSubHeader from "./component/BigSubHeader.vue"
import BoxContent from "./component/box-content.vue"
import ApiModel from "./model/apiModel.js"
export default {
  name: 'Franchise',
  components:{
    BigSubHeader,
    BoxContent
  },
  data(){
    return {
      listItems : '',
      categoryCode : [
        {code:"0101", categoryName : "한식"},
        {code:"0102", categoryName : "치킨"},
        {code:"0104", categoryName : "제과제빵"},
        {code:"0105", categoryName : "패스트푸드"},
        {code:"0306", categoryName : "편의점"},
        {code:"0108", categoryName : "커피"},
        {code:"0106", categoryName : "분식"},
        {code:"0107", categoryName : "피자"},
        {code:"0112", categoryName : "주점"}
        // {code:"0109", categoryName : "아이스크림/빙수"}
        /* {code:"0111", categoryName : "중식"},
        {code:"0113", categoryName : "일식"},
        {code:"0114", categoryName : "서양식"},
        {code:"0202", categoryName : "이미용"},
        {code:"0208", categoryName : "안경"},
        {code:"0218", categoryName : "PC방"},
        {code:"0219", categoryName : "약국"},
        {code:"0302", categoryName : "화장품"},
        {code:"0214", categoryName : "세탁"},
        {code:"0303", categoryName : "의류 / 패션"} */
      ],
      FullCteCode : [
        {code:"0101", categoryName : "한식"},
        {code:"0102", categoryName : "치킨"},
        {code:"0103", categoryName : "기타 외식"},
        {code:"0104", categoryName : "제과제빵"},
        {code:"0105", categoryName : "패스트푸드"},
        {code:"0106", categoryName : "분식"},
        {code:"0107", categoryName : "피자"},
        {code:"0108", categoryName : "커피"},
        {code:"0109", categoryName : "아이스크림/빙수"},
        {code:"0110", categoryName : "기타 외국식"},
        {code:"0111", categoryName : "중식"},
        {code:"0112", categoryName : "주점"},
        {code:"0113", categoryName : "일식"},
        {code:"0114", categoryName : "서양식"},
        {code:"0115", categoryName : "음료 (커피 외)"},
        {code:"0201", categoryName : "기타 서비스"},
        {code:"0202", categoryName : "이미용"},
        {code:"0203", categoryName : "기타 교육"},
        {code:"0204", categoryName : "교육 (외국어)"},
        {code:"0205", categoryName : "스포츠 관련"},
        {code:"0206", categoryName : "교육 (교과)"},
        {code:"0207", categoryName : "유아 관련 (교육 외)"},
        {code:"0208", categoryName : "안경"},
        {code:"0209", categoryName : "숙박"},
        {code:"0210", categoryName : "자동차 관련"},
        {code:"0211", categoryName : "반려동물 관련"},
        {code:"0212", categoryName : "임대"},
        {code:"0213", categoryName : "인력 파견"},
        {code:"0214", categoryName : "세탁"},
        {code:"0215", categoryName : "오락"},
        {code:"0216", categoryName : "부동산 중개"},
        {code:"0217", categoryName : "배달"},
        {code:"0218", categoryName : "PC방"},
        {code:"0219", categoryName : "약국"},
        {code:"0220", categoryName : "이사"},
        {code:"0221", categoryName : "운송"},
        {code:"0301", categoryName : "기타도소매"},
        {code:"0302", categoryName : "화장품"},
        {code:"0303", categoryName : "의류 / 패션"},
        {code:"0304", categoryName : "(건강)식품"},
        {code:"0305", categoryName : "종합소매점"},
        {code:"0306", categoryName : "편의점"},
        {code:"0307", categoryName : "농수산물"}
      ],
      rItems : [],
      apiModel : new ApiModel(this.$http),
      memuBoardFlag : false
    }
  },
  props:{
  },
  created(){
    //this.listItems = this.makeArrayModuler(this.items,5)
    this.$EventBus.$emit('HeaderActive', 'franchise')
    console.log("카테고리:"+this.$route.params.categoryCode)
    if(this.$route.params.categoryCode === undefined){
      this.franchiseList('한식').then((result)=>{
        console.log(result)
        this.listItems = this.makeArrayModuler(result,5)
      })
    }else{
      this.fetchData()
    }
  },
 /*  mounted() {
    this.$nextTick(function () {
      this.listItems = this.makeArrayModuler(this.rItems,5)
      console.log(this.listItems)
    })
  }, */
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    '$route': 'fetchData'
  },
  methods:{
    makeArrayModuler(array, mod=1){
      let resArr = [];
      let tmpArr = [];
      let i = 0;
      for(const [idx, val] of array.entries()){
        tmpArr.push(val);
        if( (idx+1)%mod === 0 ){
          resArr[i] = tmpArr;
          tmpArr = []
          i++;
        }
      }
      return resArr;
    },
    fetchData(){
      this.franchiseList(this.$route.params.categoryCode).then((result)=>{
        this.listItems = this.makeArrayModuler(result,5)
      })
      //alert(this.$route.params.categoryCode)
    },
    async franchiseList(categoryname){
      let data = null
      if(categoryname === '' || categoryname === null || categoryname === undefined){
        console.log("error")
      }else{
        console.log(categoryname)
        //let model = new ApiModel(this.$http)
        /* model.getFranchiseList(categoryname).then((result)=>{
          //console.log(result)
          if(result.status === 200){
            let data = result.data
            //console.log(data)
            //this.rItems = data
            return data
          }
        }) */
        let result = await this.apiModel.getFranchiseList(categoryname)
        if(result.status === 200){
            let data = []
            data = result.data
            console.log(data)
            let paging = data.shift()
            console.log(paging)
            for (const value of data) {
              let img1 = value.img1
              if(value.img1 === ''){
                img1 = "/src/assets/fc_noimg_166166.jpg"
              }else{
                img1 = "//file.mk.co.kr"+img1.slice(12)
              }
              value.img1 = img1
            }
            //console.log(data[0].img1)
            //console.log(data)
            //this.rItems = data
            return data
        }
      }

    },
    menuToggle() {
      if(this.memuBoardFlag){
        this.memuBoardFlag = false
      }
      else if(!this.memuBoardFlag){
        this.memuBoardFlag = true
      }
    }



  }
}
</script>
