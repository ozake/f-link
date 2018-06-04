<template>
	<!-- 우측영역-->
	<div class="aside">

		<!-- 검색-->
		<searchInputAside></searchInputAside>
		<!-- //검색-->

		<!-- 매장찾기-->
		<div class="fr_search">
			<h4>프랜차이즈 매장 찾기</h4>

				<!-- 매장찾기 선택-->

				<div class="selectArea">
						<select v-bind:class="[isIe ? ieClass : '', selectClass]" v-model="selected">
							<option>업종</option>
							<option v-for="item in sector" :value="item.code">{{item.categoryName}}</option>
						</select>
				</div>

				<div class="selectArea">
					<select v-bind:class="[isIe ? ieClass : '', selectClass]" v-model="sectorSelected">
						<option>중분류</option>
						<option v-for="item in sectorMcode" :value="item.code">{{item.categoryName}}</option>
					</select>
				</div>

				<div class="search_ch">
					<!-- <input class="chk" type="checkbox" id="allselect">
					<label for="allselect">전체선택</label> -->

					<input class="chk" type="checkbox" id="nofranchise" v-model="nonFranchise">
					<label for="nofranchise">프랜차이즈 아닌 매장도 표시</label>
				</div>

					<!-- //매장찾기 선택-->

					<!-- 브랜드 체크-->

				<div class="brand_ch">

					<ul>
						<li v-for="item in brandList">
							<input class="chk" type="checkbox" :id="item.franchiseNo" :value="item.franchiseNo" v-model="brandCk">
							<label :for="item.franchiseNo">{{item.brand}}</label>
						</li>
					</ul>

				</div>
					<!-- 브랜드 체크-->

		</div>
		<!-- //매장찾기-->


		<!-- 점포매물검색-->
		<!-- <div class="st_search" v-on:click="alerm">
			<h4>점포 매물 검색
				<span>
					<input class="chk" type="checkbox" id="delete">
					<label for="delete">지도에서 매물 지우기</label>
				</span>
			</h4>

			<ul>
				<li>
					<span>보증금</span>
					<input title="보증금" class="i_text" type="text"> ~ <input title="보증금" class="i_text" type="text">
					만원
				</li>
				<li>
					<span>월세</span>
					<input title="월세" class="i_text" type="text"> ~ <input title="월세" class="i_text" type="text">
					만원
				</li>
				<li>
					<span style="color:#e67510">매매가</span>
					<input title="매매가" class="i_text" type="text"> ~ <input title="매매가" class="i_text" type="text">
					만원
				</li>
			</ul>
		</div> -->
		<!-- //점포매물검색-->

		<!-- 매물리스트-->
		<div class="st_list" v-bind:style="estateHeight">
			<ul v-bind:style="estateHeight">
				<li v-for="item in estateList" class="memul_list">
					<router-link :to="{ name: 'sales-view', params: {id: item.memul_seq } }">
						<h5>{{item.build_kind}}</h5>
						<img v-bind:src="item.img_url" />
						<p class="monthly"><span class="icon">월</span>보 {{item.month_deposit_price}} / 월{{item.month_price}}</p>
						<!-- <p class="premium "><span class="icon">권</span>1억5000만원</p> -->
						<p class="text">{{item.corrp_flr}}층  {{item.supp_meter}}㎡<br>
						{{item.area2 +' '+ item.area3}}<br>
						{{item.subway_info}}
						</p>
					</router-link>
				</li>
			</ul>
		</div>
		<!-- //매물리스트-->


	</div>
	<!-- //우측영역-->
</template>
<script>
import searchInputAside from "./searchInputAside.vue"
import ApiModel from "../model/apiModel.js"
export default {
	name: 'AsideMap',
	components: {
		searchInputAside	
	},
  data(){
	return {
		//isIe : false,
    ieClass : 'select-box-ie',
    selectClass : 'select-box',
		sector: [],
		sectorMcode : [],
		selected : '업종',
		sectorSelected : '중분류',
		brandCk : [],
		brandList : [],
		nonFranchise : false,
		searchTxt: '',
		searchDisplay: [],
		searchAreaToggle: false,
		apiModel: new ApiModel(this.$http),
		addrCodeSelected: false,
    addrCode: '',
    addrCodeTxt: '',
    suggestSlect: [],
		flag: '',
		to: ''
     }
  },
  props:{
	  brand : Array,
	  updateFlag : Boolean,
    isIe : Boolean,
    estateList : Array,
    estateHeight : Object,
		oldBrandCk : Array
  },
  /* computed: {
	  brand : function () {
		  if(this.updateFlag){
			  console.log(this.updateFlag)
		  }
	  }
  }, */
  created(){
    /* const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
     this.isIe = true
   	} */
	this.getSector()

	/* if(this.updateFlag){
		this.brandList = this.brand
	} */

  },

  watch: {
	  selected : function (val){
		  if(val !== '외식'){
			this.getSectorM(val)
		  }
	  },
	  sectorSelected : function (val) {
		  if(val === '중분류'){
			  val = ''
		  }
		  this.$EventBus.$emit('setftcCate2Cd', val)
	  },
	  brandCk : function (val) {
		  //console.log(val)
		  //let tmp = val.pop()
		  //console.log(this.brandCk.length)
		  if(Array.isArray(this.brandCk) && this.brandCk.length !== 0){
			  this.$EventBus.$emit('brandChecked', this.brandCk)
		  }else{
			  if(!this.updateFlag){
				this.$EventBus.$emit('brandUnchecked')
			  }

		  }

	  },
	  brand : function (val) {
		//console.log(this.updateFlag)
      if(this.updateFlag){
        this.brandCk = []
        this.brandList = this.brand
				if(this.oldBrandCk.length > 0){
					this.brandCk = this.oldBrandCk
				}
      }
	  },
	  nonFranchise : function (val) {
		  this.$EventBus.$emit('nonFranchise', val)
	  },
	  suggestSlect: function (val) {
      let data = val[0]
      this.flag = data.flag
      if(data.flag === 'addr'){
        this.searchTxt = data.txt
        this.addrCodeTxt = data.txt
        this.addrCode = data.code
      }
    }
  },
  methods: {
	alerm() {
		alert('준비중입니다.')
	},
/* 	typing(e){
		clearTimeout(this.to);
        this.to = setTimeout(()=>{
          //console.log(e.target.value);
          this.searchFc(e.target.value)
        }, 400);
      this.searchTxt = e.target.value
  },
	searchFc(val){
    if(val === ''){
      this.searchTxt = ''
      this.searchAreaToggle = false
      return
    }
    this.searchAreaToggle = true
    this.addrCodeSelected = false
    let addr = val
    this.apiModel.getAddrSearch(addr).then((result)=>{
        if(result.status === 200){
          let data = result.data
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
  }, */
	getSector(){
		  //let url = "./dist/sectorCode.json"
			let url = ''
			if(location.hostname === "f-link.co.kr"){
			  url = "http://f-link.co.kr/src/assets/sectorCode.json"
		  }
			else if(location.hostname === "www.f-link.co.kr"){
			  url = "http://www.f-link.co.kr/src/assets/sectorCode.json"
		  }
		  else if(location.hostname === "110.13.170.148"){
			  url = "http://110.13.170.148:8080/src/assets/sectorCode.json"
		  }else if(location.hostname === "127.0.0.1"){
        url = "http://127.0.0.1:8080/src/assets/sectorCode.json"
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
	/* keymonitor(event){
      console.log(event.key)
       if(event.key == "Enter")
       {
         if(this.franchiseSelected){
		   //location.href = `./franchiseView/${this.franchiseSelectedCode}`
		   this.$EventBus.$emit('searchBrand', this.franchiseSelectedCode)
		   this.searchAreaToggle = false
		   this.franchiseSelected = false
         }
         //console.log("enter key was pressed!");
         return false
       }
	}, */
/* 	selector(){
      let flag = this.flag
      if(flag === 'addr'){
        this.addrCodeSelected = true
        this.searchAreaToggle = false
        this.$refs.search.focus()
        this.searchDisplay = ''
      }
    },
    keydown(){
      this.$refs.suggestDom.focus()
    },
    searchResMove(){
          if(this.addrCodeSelected){
            this.$EventBus.$emit('addrSearch', this.addrCodeTxt)
          }
          else{
            alert('지역을 선택해주세요.')
          }
    }, */
  }

}
</script>
<style scoped>
.selectArea {
	width: 165px;
    height: 33px;
    float: left;
    margin-right: 15px;
    font-size: 15px;
    font-weight: 300;
    /*color: #555;*/
    background-color: #fff;
    margin-bottom: 15px;
	background: #fff url(http://img.mk.co.kr/2018/franchise/btn_select.jpg) no-repeat 100%;
	border: 1px solid #dcdcdc;
	overflow: hidden;
}
.select-box {
	width: 165px;
    height: 33px;
    display: block;
    line-height: 33px;
    padding-left: 15px;
	background: transparent;
	border: none;
  	text-transform: none;
  	appearance: none;
  	-webkit-appearance: none;
  	-moz-appearance: none;
	color: #888;
}
.select-box-ie {
	width: 184px;
}
.memul_list {
	height: 120px;
}
</style>
