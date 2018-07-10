<template>
      <div id="content">
        <div class="frtheme">
  				<ul class="theme">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img01.jpg" alt="소자본 창업 베스트">
  					<li class="th_tit">소자본 창업 BEST</li>
  					<li class="th_txt">창업 자금 1억원 미만<br>(점포 임대 비용 제외)</li>
  					<!-- <router-link to="scapitalBest" class="th_btn line-height">테마보기</router-link> -->
            <theme-select-box :routeName="'scapital-list'"></theme-select-box>
  				</ul>
  				<ul class="theme_r">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img03.jpg" alt="스테디셀러 브랜드">
  					<li class="th_tit">스테디셀러 브랜드</li>
  					<li class="th_txt">10년 이상 가맹사업 <br>지속한 브랜드</li>
  					<!-- <router-link to="steadyBest" class="th_btn line-height">테마보기</router-link> -->
            <theme-select-box :routeName="'steady-list'"></theme-select-box>
  				</ul>
  				<ul class="theme">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img02.jpg" alt="매장 증가율 BEST">
  					<li class="th_tit">매장 증가율 BEST</li>
  					<li class="th_txt">최근 1년간 매장을 <br>가장 많이 확장한 브랜드</li>
  					<!-- <router-link to="growthBest" class="th_btn line-height">테마보기</router-link> -->
            <theme-select-box :routeName="'growth-list'"></theme-select-box>
  				</ul>
  				<ul class="theme_r">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img04.jpg" alt="SNS 조회 BEST">
  					<li class="th_tit">SNS 조회 BEST</li>
  					<li class="th_txt">포털과 SNS에서 <br>많이 언급되는 브랜드</li>
            <!--분류별검색 추가 수정 0503-->
					<div class="select" style="left:120px">

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
                <option v-for="item in sectorMcode" :value="item.code">{{item.categoryName}}</option>
              </select>
            </div>
						<!--//중분류-->
					</div>
					<!--//분류별검색 추가 수정 0503-->

  					<router-link v-show="snsFlag" :to="{ name: 'sns-list', params: {categoryCode: sectorSelected, page: 1 } }" class="th_btn1 line-height" ref="snsTheme">테마보기</router-link>
  				</ul>
			</div>

      </div>
</template>
<script>
import ThemeSelectBox from './component/ThemeSelectBox.vue'
export default {
  name: "ThemeBest",
  components: {
    ThemeSelectBox,
  },
  data() {
    return {
      ieClass : 'box_title_ie',
      nonIeClass : 'box_title',
      isIe : false,
      sector: [],
      sectorMcode : [],
		  selected : '업종',
      sectorSelected : '중분류',
      snsFlag : false
    }
  },
  created() {
    this.$EventBus.$emit("HeaderActive", "theme")
    const agent = navigator.userAgent.toLowerCase()
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
	  sectorSelected : function (val) {
		  if(val !== '중분류'){
        this.$nextTick(()=>{
          let t = this.$refs.snsTheme
        t.$el.click()
        })
        
		  }
	  }
  },
  methods: {
    getSector(){
        let url = "../dist/sectorCode.json"
        if(location.hostname === "110.13.170.148" || location.hostname === "127.0.0.1"){
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
    }
  }
};
</script>
<style scoped>
.line-height {
  line-height: 35px;
}
.select-box {
  width: 139px;
  height: 36px;
  margin-right: 15px;
  float: left;
  font-size: 16px;
  font-weight: 300;
  color: #555;
  padding: 0 0 0 0;
  overflow: hidden;
  background: #fff url(http://img.mk.co.kr/2018/franchise/btn_select.jpg) no-repeat 100%;
}
.select-box:last-child {
    margin-right: 0;
}

.box_title {
  width: 139px;
  height: 36px;
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
  width: 155px;
  height: 36px;
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
