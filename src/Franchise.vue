<template>
      <div id="content">
        <BigSubHeader></BigSubHeader>
        <!-- 서브메뉴-->
  			<div class="smenu">
          <div class="menuWrap">
  				<ul style="width: 100%" class="menuBody">
  					<li class="img"><a href="#"><img src="http://img.mk.co.kr/2018/franchise/list.png" alt="전체메뉴보기"></a></li>
  					<li v-for="category in categoryCode"><router-link :to="{ name: 'franchise-list', params: {categoryCode: category.categoryName } }">{{category.categoryName}}</router-link></li>
  					<li class="img1"><a href="#"><img src="http://img.mk.co.kr/2018/franchise/list_prev.png" alt="앞으로"></a></li>
  					<li class="img1"><a href="#"><img src="http://img.mk.co.kr/2018/franchise/list_next.png" alt="뒤로"></a></li>
  				</ul>
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
.menuBody{
  width: 100%;
  display: inline-block;
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
      items: [
        {
          id:1,
          title: "본죽",
          prcost: "5740만원",
          area: "23"
        },
        {
          id:2,
          title: "한솥",
          prcost: "7500만원",
          area: "15"
        },
        {
          id:3,
          title: "고봉민김밥",
          prcost: "4980만원",
          area: "28"
        },
        {
          id:4,
          title: "놀부부대찌개",
          prcost: "1억210만원",
          area: "45"
        },
        {
          id:5,
          title: "가장맛있는족발",
          prcost: "1억5350만원",
          area: "50"
        },
        {
          id:6,
          title: "원할머니",
          prcost: "9930만원",
          area: "30"
        },
        {
          id:7,
          title: "조마루감자탕",
          prcost: "8860만원",
          area: "30"
        },
        {
          id:8,
          title: "하남돼지집",
          prcost: "1억1320만원",
          area: "40"
        },
        {
          id:9,
          title: "신마포갈매기",
          prcost: "1억3300만원",
          area: "50"
        },
        {
          id:10,
          title: "채선당",
          prcost: "1억8250만원",
          area: "60"
        }
      ],
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
      rItems : []
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
        let model = new ApiModel(this.$http)
        /* model.getFranchiseList(categoryname).then((result)=>{
          //console.log(result)
          if(result.status === 200){
            let data = result.data
            //console.log(data)
            //this.rItems = data
            return data
          }
        }) */
        let result = await model.getFranchiseList(categoryname)
        if(result.status === 200){
            let data = result.data
            for (const value of data) {
              let img1 = value.img1
              if(value.img1 === ''){
                img1 = "http://img.mk.co.kr/2018/franchise/pizza.jpg"
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
      
    }
    


  }
}
</script>
