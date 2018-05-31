<template>
  <!-- 메인이미지 영역-->
  <div class="lcontent">
    <h2>나에게 적합한 프랜차이즈를 찾아보세요<img src="http://img.mk.co.kr/2018/franchise/search_w.png" alt="검색"></h2>

    <!--분류별검색-->
    <div class="select">

      <!--대분류-->
      <div class="select-box">
        <select v-bind:class="[this.isIe ? ieClass : '', nonIeClass]" v-model="selected" >
          <option>업종</option>
          <option v-for="item in sector" :value="item.code">{{item.categoryName}}</option>
        </select>
      </div>
      <!--//대분류-->

      <!--중분류-->
      <div class="select-box">
        <select v-bind:class="[isIe ? ieClass : '', nonIeClass]" v-model="sectorSelected" >
          <option>중분류</option>
          <option v-for="item in sectorMcode" :value="item.categoryName">{{item.categoryName}}</option>
        </select>
      </div>
      <!--//중분류-->

      <!--브랜드-->
      <!-- <div class="select-box">
        <select v-bind:class="[isIe ? ieClass : '', nonIeClass]" v-model="brandSelected">
          <option>브랜드</option>
          <option v-for="item in brandList" :value="item.regnumber">{{item.brand}}</option>
        </select>
      </div> -->
      <!--//브랜드-->

      <!--창업 자금  -->
      <div class="select-box">
        <select v-bind:class="[isIe ? ieClass : '', nonIeClass]" v-model="capitalSelected">
          <option>창업자금</option>
          <option :value="{min:0, max:50000}">5천만원 미만</option>
          <option :value="{min:0, max:100000}">1억원미만</option>
          <option :value="{min:100000, max:150000}">1억~1.5억원</option>
          <option :value="{min:150000, max:200000}">1.5~2억원</option>
          <option :value="{min:200000, max:250000}">2~2.5억원</option>
          <option :value="{min:250000, max:300000}">2.5~3억</option>
          <option :value="{min:300000, max:9999999}">3억원 이상</option>
        </select>
      </div>
      <!--//창업 자금  -->
    </div>
      <!--//분류별검색-->
    <p class="sectxt">※ 매장 임대료 제외</p>

  </div>
  <!-- //메인이미지 영역-->
</template>
<style scoped>
.select-box {
  width: 192px;
  height: 40px;
  float: left;
  margin-right: 30px;
  font-size: 16px;
  font-weight: 300;
  color: #555;
  padding: 0 0 0 0;
  overflow: hidden;
  background: #fff url(http://img.mk.co.kr/2018/franchise/btn_select.jpg) no-repeat 100%;
}

.box_title {
  width: 192px;
  height: 40px;
  background: transparent;
  display: block;
  line-height: 37px;
  padding-left: 12px;
  /* margin-top: -6px; */
  border: none;
  text-transform: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.box_title_ie {
  width: 210px;
  height: 40px;
  background: transparent;
  display: block;
  line-height: 37px;
  padding-left: 12px;
  /* margin-top: -6px; */
  border: none;
  text-transform: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
<style>
/* .select-box {
  margin-right: 60px !important;
}
.select-box::last-of-type {
  margin-right: 0px !important;
} */
</style>

<script>
import ApiModel from "../model/apiModel.js"
export default {
  name: 'SubHeaderSelect',
  props: {
    isIe : ''
  },
   data(){
     return {
        ieClass : 'box_title_ie',
        nonIeClass : 'box_title',
        sector: [],
       	sectorMcode : [],
		    selected : '업종',
        sectorSelected : '중분류',
        apiModel : new ApiModel(this.$http),
        brandList: [],
        // brandSelected : '브랜드',
        capitalSelected : '창업자금',
        isIe: false
     }
   },
   props : {
      categorycode1: String,
      category2: String,
      capital: Object,
   },
   created(){
     const agent = navigator.userAgent.toLowerCase();
     if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
      this.isIe = true
    }
    this.getSector()
  },
  watch: {
    selected : function (val){
		  if(val !== '업종'){
			this.getSectorM(val)
		  }
    },
    capitalSelected: function (val){
      console.log(location.hostname)
      if(val !== '창업자금'){
			  if(this.selected !== '업종' && this.sectorSelected !== '중분류'){
          if(location.hostname === "www.f-link.co.kr"){
          location.href = `http://www.f-link.co.kr/franchiseList/${this.sectorSelected}/1?min=${this.capitalSelected.min}&max=${this.capitalSelected.max}`
          }else if(location.hostname === "f-link.co.kr") {
            location.href = `http://f-link.co.kr/franchiseList/${this.sectorSelected}/1?min=${this.capitalSelected.min}&max=${this.capitalSelected.max}`
          }else if(location.hostname === "110.13.170.148"){
            location.href = `http://110.13.170.148:8080/franchiseList/${this.sectorSelected}/1?min=${this.capitalSelected.min}&max=${this.capitalSelected.max}`
          }
        }
		  }
    },
    categorycode1: function(val){
      this.selected = val
    },
    category2: function(val){
      this.sectorSelected = val
    },
    capital: function(val){
      this.capitalSelected = val
    }
	  /* sectorSelected : function (val) {
		  if(val !== '중분류'){
			  this.getBrandList(val)
		  }
	  } */
  },
  methods: {
    	getSector(){
        let url = "../dist/sectorCode.json"
        if(location.hostname === "www.f-link.co.kr"){
          url = "http://www.f-link.co.kr/dist/sectorCode.json"
        }else if(location.hostname === "www.f-link.co.kr"){
          url = "http://f-link.co.kr/dist/sectorCode.json"
        }else if(location.hostname === "110.13.170.148" || location.hostname === "127.0.0.1"){
          url = "/src/assets/sectorCode.json"
        }
        this.$http.get(url).then((result)=>{
          if(result.status === 200){
            let data = result.data
            this.sector = data.sector
          }
        })
    },
    getSectorM(val){
		  for (const value of this.sector) {
			  if(value.code === val){
				  this.sectorMcode = value.sectorMcode
			  }
		  }
    },
    getBrandList(code){
      this.apiModel.getBrandList(code).then((result)=>{
        if(result.status === 200){
          //console.log(result)
          let data = result.data
          let t = data.shift()
          this.brandList = data
        }
      })
    }
  }
}

</script>
