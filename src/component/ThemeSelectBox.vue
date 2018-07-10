<template>
  <div class="select" style="left:120px">
    <!--대분류-->
    <div class="select-box">
      <select class="box-title" v-model="selected" >
        <option>업종</option>
        <option v-for="item in sector" :value="item.code">{{item.categoryName}}</option>
      </select>
    </div>
    <!--//대분류-->

    <!--중분류-->
    <div class="select-box">
      <select class="box-title" v-model="sectorSelected" >
        <option>중분류</option>
        <option v-for="item in sectorMcode" :value="item.code">{{item.categoryName}}</option>
      </select>
    </div>
    <!--//중분류-->
  </div>
</template>
<script>
export default {
  name: 'ThemeSelectBox',
  data() {
    return {
      sector: [],
      sectorMcode : [],
		  selected : '업종',
      sectorSelected : '중분류'
    }
  },
  props : {
    routeName: String
  },
  created(){
    this.getSector()
  },
  watch : {
    selected : function (val){
		  if(val !== '업종'){
			this.getSectorM(val)
		  }
    },
	  sectorSelected : function (val) {
		  if(val !== '중분류'){
        this.$router.push({ name: this.routeName, params: {categoryCode: this.sectorSelected, page: 1 }  })
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
}
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
.box-title {
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
.box_title::-ms-expand {
	display: none;
}
</style>
