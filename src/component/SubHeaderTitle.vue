<template>
  <!-- 메인이미지 영역-->
  <div class="theme_m" v-bind:style="styles">
    <h2>{{title}}
      <p class="line1"><hr/></p>
      <span>{{subTitle}}</span>
      <div class="select" v-if="selectbox">
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
          <select v-bind:class="[isIe ? ieClass : '', nonIeClass]" v-model="sectorSelected" @change="sectorChange">
            <option>중분류</option>
            <option v-for="item in sectorMcode" :value="item.code">{{item.categoryName}}</option>
          </select>
        </div>
        <!--//중분류-->
      </div>
      <!--//분류별검색 추가 수정 0503-->

    </h2>
  </div>
  <!-- //메인이미지 영역-->

</template>
<script>
export default {
  name: 'SubHeaderTitle',
  props : {
    title : '',
    subTitle : '',
    flag : String,
  },
   data(){
     return {
        selectbox: false,
        isIe : false,
        sector: [],
        sectorMcode : [],
        selected : '업종',
        sectorSelected : '중분류',
        ieClass : 'box_title_ie',
        nonIeClass : 'box_title'
     }
   },
  computed: {
    styles: function() {
      let url = ''
      switch (this.flag) {
        case 'sCaptial':
          url = 'http://img.mk.co.kr/2018/franchise/theme_m01.jpg'
          break;
        case 'steady':
          url = 'http://img.mk.co.kr/2018/franchise/theme_m02.jpg'
          break;
        case 'growth':
          url = 'http://img.mk.co.kr/2018/franchise/theme_m03.jpg'
          break;
        case 'sns':
          url = 'http://img.mk.co.kr/2018/franchise/theme_m04.jpg'
          break;
      
        default:
          url = 'http://img.mk.co.kr/2018/franchise/theme_m01.jpg'
          break;
      }
      let background = `url('${url}') no-repeat center 0px`

      return {
        background : background
      }
    }
  },
  watch: {
    selected : function (val){
		  if(val !== '업종'){
			this.getSectorM(val)
		  }
    }
	  /* sectorSelected : function (val) {
		  if(val !== '중분류'){
        this.$nextTick(()=>{
          let t = this.$refs.snsTheme
          t.$el.click()
        })
        
		  }
	  } */
  },
  created() {
    this.$EventBus.$emit("HeaderActive", "theme")
    const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
     this.isIe = true
    }
    if(this.flag === 'sns'){
      this.selectbox = true
      this.getSector()
      let categoryCode = this.$route.params.categoryCode
      this.selected = categoryCode.substr(0,2)
      
      
    }
    
  },
  methods: {
    getSector(){
        let url = "../../dist/sectorCode.json"
        if(location.hostname === "110.13.170.148" || location.hostname === "127.0.0.1"){
          url = "../../src/assets/sectorCode.json"
        }
        this.$http.get(url).then((result)=>{
          if(result.status === 200){
            let data = result.data
            this.sector = data.sector
            let categoryCode = this.$route.params.categoryCode
            this.getSectorM(categoryCode.substr(0,2))
            this.sectorSelected = categoryCode
          }
        })
    },
    getSectorM(val){
      console.log(this.sector)
		  for (const value of this.sector) {
			  if(value.code === val){
				  this.sectorMcode = value.sectorMcode
			  }
		  }
    },
    sectorChange(){
      this.$nextTick(function () {
        if(this.sectorSelected !== '중분류'){
          this.$router.push({ name: 'sns-best', params: {categoryCode:this.sectorSelected } })
        }
      })
    }
  }
}
</script>
<style scoped>
.select-box {
  width: 157px;
  height: 40px;
  margin-right: 30px;
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
  width: 157px;
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
  width: 170px;
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

