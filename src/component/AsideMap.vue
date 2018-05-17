<template>
	<!-- 우측영역-->
	<div class="aside">

		<!-- 검색-->
		<div class="search">
			<form name="search" id="search">
				<fieldset>
					<legend>검색</legend>
					<input name="s_keyword" title="검색어 입력" type="text" placeholder="지역+업종(프랜차이즈명)으로 검색">
					<a href="#"><img alt="검색하기" src="http://img.mk.co.kr/2018/franchise/search_w.png" class="sbtn"></a>
				</fieldset>
			</form>
		</div>
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
					<input class="chk" type="checkbox" id="allselect">
					<label for="allselect">전체선택</label>

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
		<div class="st_search">
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
		</div>
		<!-- //점포매물검색-->

		<!-- 매물리스트-->
		<div class="st_list">

			<ul>
				<li>
					<h5>시카고피자 대학로점</h5>
					<img src="http://img.mk.co.kr/2018/franchise/img01.jpg" alt="시카고피자 대학로점">
					<p class="monthly"><span class="icon">월</span>보 5000 / 월400</p>
					<p class="premium "><span class="icon">권</span>1억5000만원</p>
					<p class="text">1층  115㎡(35PY)<br>
						용산구청역 도보 3분<br>
					</p>							
				</li>

				<li>
					<h5>시카고피자 대학로점</h5>
					<img src="http://img.mk.co.kr/2018/franchise/img01.jpg" alt="시카고피자 대학로점">
					<p class="monthly"><span class="icon">월</span>보 5000 / 월400</p>
					<p class="premium "><span class="icon">권</span>1억5000만원</p>
					<p class="text">1층  115㎡(35PY)<br>
						용산구청역 도보 3분<br>
					</p>						
				</li>

				
				<li>
					<h5>시카고피자 대학로점</h5>
					<img src="http://img.mk.co.kr/2018/franchise/img01.jpg" alt="시카고피자 대학로점">
					<p class="monthly"><span class="icon">월</span>보 5000 / 월400</p>
					<p class="premium "><span class="icon">권</span>1억5000만원</p>
					<p class="text">1층  115㎡(35PY)<br>
						용산구청역 도보 3분<br>
					</p>							
				</li>
			</ul>
		</div>
		<!-- //매물리스트-->


	</div>
	<!-- //우측영역-->
</template>
<script>
export default {
  name: 'AsideMap',
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
		nonFranchise : false
     }
  },
  props:{
	  brand : Array,
	  updateFlag : Boolean,
	  isIe : Boolean
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
		}
	  },
	  nonFranchise : function (val) {
		  this.$EventBus.$emit('nonFranchise', val)
	  }
  },
  methods: {
	  getSector(){
		  let url = "./dist/sectorCode.json"
		  if(location.hostname === "110.13.170.148"){
			  url = "./src/assets/sectorCode.json"
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
	  }
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
</style>
