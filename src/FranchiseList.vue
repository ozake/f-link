<template>
  <div id="content">
      <!-- 검정배경-->
      <div class="blackBack" v-if="submitLayer" v-on:click="submitOnOff"></div>
      <!-- //검정배경-->
      <div v-if="submitLayer" class="layer_pop">
            <h5 style="padding-left:20px">컨설팅 받기 원하는 브랜드를 하나만 선택해주세요.</h5>
            <ul>
                <li v-for="item in checked"><a href="#none" v-on:click="submitBrand(item.regnumber)">{{item.brand}}</a></li>
            </ul>
        </div>
    <SubHeaderSelect :isIe="isIe" :categorycode1="categorycode1" :category2="category2" :capital="capital"></SubHeaderSelect>
    <!--프랜차이즈 현황 리스트-->
		<div class="frlist">
			<div class="frlistbox">

        <!-- <CardBox  v-for="(item, index) in listItems" :index="index" :item="item" v-model="checked"></CardBox> -->

        <!--프랜차이즈 박스-->
			<ul  v-for="(item, index) in listItems">
        <router-link :to="{ name: 'franchise-view', params: {id: item.regnumber } }">
				<li class="fr_logo"><img v-bind:src="item.img2" /></li>
				<li class="fr_tit">{{item.brand}}</li>
				<dl>
					<dt>분류</dt>
					<dd>{{item.category1}} > {{item.category2}}</dd>
					<dt>대표자</dt>
					<dd>{{item.ceo}}</dd>
					<dt>창업 비용</dt>
					<dd>{{item.total}}만원 ({{item.storearea}}평)</dd>
					<dt>총 가맹점 수</dt>
					<dd>{{item.fcount}}개</dd>
				</dl>
        </router-link>
        <label :for="index" class="check_info_label"><span>추가 정보 요청</span></label>
        <input type="checkbox" :id="index" class="check_info" v-model="checked" :value="{regnumber: item.regnumber, brand: item.brand}"/>
				<!-- <a href="#"><button class="btn_info">추가 정보 요청 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </button></a> -->
			</ul>
			<!--//프랜차이즈 박스-->
        <Pagination :totalCount="totalCount" :currentPage="currentPage" :pageingRange="pageingRange" :pageRows="pageRows" :routeName="routeName"></Pagination>
        <!--페이징-->
      </div>

      <RightCunsulting :checked="checked" :submitBrandCk="submitBrandCk" :categorycode1="categorycode1"></RightCunsulting>
    </div>
    <!--//프랜차이즈 현황 리스트-->
  </div>
</template>
<style scoped>
.check_info {
	visibility: hidden;
}
.check_info_label {
  display: inline-block;
  font-size: 15px;
  width: 212px;
  height: 33px;
  border: 1px solid #4db007;
  color: #4db007;
  margin: 10px 0 0 20px;
  cursor: pointer;
  text-align: center;
  line-height: 33px;
  box-sizing:border-box;
}
.check_info_label > span {
  margin-right: 5px;
  font-size: 15px;
  padding-right: 18.5px;
  background: url(http://img.mk.co.kr/2018/franchise/chech_off.jpg) no-repeat right center/12px;
}
.blackBack {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100000 !important;
    background-color: #000000;
    opacity: 0.65;
}
input:checked + label {
    font-size: 15px;
    width: 212px;
    height: 33px;
    background-color: #4db007 !important;
    color: #fff;
    margin: 10px 0 0 20px;
    background: url(http://img.mk.co.kr/2018/franchise/chech_on.jpg) no-repeat 144px 10px;
    cursor: pointer;
}
</style>
<script>
import SubHeaderSelect from "./component/SubHeaderSelect.vue"
import CardBox from "./component/CardBox.vue"
import RightCunsulting from "./component/RightCunsulting.vue"
import Pagination from './component/Pagination.vue'
import ApiModel from "./model/apiModel.js"
import numeral from "numeral";
export default {
  name: 'FranchiseList',
  components:{
    SubHeaderSelect,
    CardBox,
    RightCunsulting,
    Pagination
  },
  data(){
    return {
      items: [
        {
          id:1,
          title: "test"
        },
        {
          id:2,
          title: "test"
        },
        {
          id:3,
          title: "test"
        },
        {
          id:4,
          title: "test"
        },
        {
          id:5,
          title: "test"
        },
        {
          id:6,
          title: "test"
        },
        {
          id:7,
          title: "test"
        },
        {
          id:8,
          title: "test"
        },
        {
          id:9,
          title: "test"
        }
      ],
      listItems : '',
      isIe:false,
      apiModel: new ApiModel(this.$http),
      checked: [],
      submitLayer: false,
      submitBrandCk: '',
      categorycode1: '',
      category2: '',
      totalCount : 0,
      currentPage : 1,
      pageingRange : 10,
      pageRows : 9,
      routeName : 'franchise-list-page',
      capital : {}
    }
  },
  props:{
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'franchise')
    this.$EventBus.$on('submitOnOff', ()=>{
      this.submitOnOff()
    })
    //this.listItems = this.makeArrayModuler(this.items,5)
    const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
     this.isIe = true
    }
    console.log("카테고리:"+this.$route.params.categoryCode)
    if(this.$route.params.categoryCode === undefined){
      this.franchiseList('한식').then((result)=>{
        console.log(result)
        let data = result.data
        data = data[0]
        this.categorycode1 = data.code1
        this.category2 = data.code2
        //this.listItems = this.makeArrayModuler(result,5)
        //this.listItems = result
      })
    }else{
      this.fetchData()
    }
  },
  watch: {
    $route: function () {
      this.fetchData()
    },
    checked: function (val) {
      //console.log(val)
    }
  },
  methods:{
    fetchData(){
      if(this.$route.query.min, this.$route.query.max){
        this.capital = {min:this.$route.query.min, max:this.$route.query.max}
        //console.log('여기!?')
        this.franchiseList(this.$route.params.categoryCode, this.$route.params.page, this.$route.query.min, this.$route.query.max).then((result)=>{
          //this.listItems = this.makeArrayModuler(result,5)
          this.listItems = result
        })
      }else{
        this.franchiseList(this.$route.params.categoryCode, this.$route.params.page).then((result)=>{
          //this.listItems = this.makeArrayModuler(result,5)
          this.listItems = result
        })
      }
      //alert(this.$route.params.categoryCode)
    },
    async franchiseList(categoryname, page, min='', max=''){
      let data = null
      //page = Number(page)
      if(categoryname === '' || categoryname === null || categoryname === undefined){
        console.log("error")
      }else{
        console.log(min+' '+max)
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
        let result = await this.apiModel.getFranchiseList(categoryname,this.pageRows,page,min,max)
        if(result.status === 200){
            console.log(result)
            let data = []
            data = result.data
            let paging = data.shift()
            this.totalCount = Number(paging.totalCount)
            this.currentPage = Number(paging.pageNo)
            let tmpdata = data
            tmpdata = tmpdata[0]
            this.categorycode1 = tmpdata.code1
            this.category2 = tmpdata.category2
            for (const value of data) {
              let total = value.total
              total = total.slice(0,-1)
              total = Number(total)
              total = numeral(total).format('0,0')
              value.total = total
              let img2 = value.img2
              if(value.img2 === ''){
                img2 = "/src/assets/fc_noimg_253128.jpg"
              }else{
                img2 = "//file.mk.co.kr"+img2.slice(12)
              }
              value.img2 = img2
            }
            //console.log(data[0].img1)
            //console.log(data)
            //this.rItems = data
            return data
        }
      }

    },
    /**
     * makeArrayModuler - description
     *
     * @param  {type} array description
     * @param  {type} mod=1 description
     * @return {type}       description
     */
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
    submitOnOff(){
      if(!this.submitLayer){
        this.submitLayer = true
      } else{
        this.submitLayer = false
      }
    },
    submitBrand(val){
      this.submitBrandCk = val
      this.submitOnOff()
    }

  }
}
</script>
