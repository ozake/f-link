<template>
  <div id="content">
    <SubHeaderTitle :title="this.title" :subTitle="this.subTitle" :flag="flag" :routeName="routeName"></SubHeaderTitle>
		<div class="frlist">
      <!--프랜차이즈 현황 리스트-->
			<div class="thlistbox">
        <CardBoxNbtn v-for="(item, index) in listItems" :index="index" :item="item"></CardBoxNbtn>
			</div>
			<!--//프랜차이즈 현황 리스트-->
      <!-- <Pagination :totalCount="totalCount" :currentPage="currentPage" :pageingRange="pageingRange" :pageRows="pageRows" :routeName="routeName"></Pagination> -->

  </div>


  </div>
</template>
<script>
import SubHeaderTitle from './component/SubHeaderTitle.vue'
import CardBoxNbtn from './component/CardBoxNbtn.vue'
import Pagination from './component/Pagination.vue'
import ApiModel from './model/apiModel.js'
import numeral from "numeral"
export default {
  name: 'SnsBest',
  components:{
    SubHeaderTitle,
    CardBoxNbtn,
    Pagination
  },
  data(){
    return {
      listItems : '',
      title : 'SNS 조회 BEST',
      subTitle : '포털과 SNS에서 많이 언급되는 브랜드',
      categoryCode : this.$route.params.categoryCode,
      totalCount : 0,
      currentPage : 1,
      pageingRange : 10,
      pageRows : 16,
      routeName : 'sns-list',
      flag: 'sns'
    }
  },
  watch: {
    $route: function() {
      this.currentPage = this.$route.params.page
      this.getSnsBestList(this.$route.params.categoryCode, this.pageRows, this.currentPage)
    }
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'theme')
    this.getSnsBestList(this.$route.params.categoryCode, this.pageRows, this.currentPage)
  },
  methods : {
    nullFilter(item) {
      //console.log(item.brand)
      if(!item.brand){

      }else{
        return item
      }
    },
    FilterArr(arr) {
      let tmpArr = []
      for (const val of arr) {
        let res = ''
        res = this.nullFilter(val)
        if(res){
          tmpArr.push(res)
        }

      }
      return tmpArr
    },
    getSnsBestList(sectorCode, row, page) {
      let model = new ApiModel(this.$http)
      model.getOP403(sectorCode, row ,page).then((result)=>{
        if(result.status === 200){
          //console.log(result)
          let data = result.data.data
          data = data.rows
          
          data = this.FilterArr(data)
          for (const value of data) {
            let total = value.total
                total = total.slice(0,-1)
                total = Number(total)
                total = numeral(total).format('0,0')
              value.total = total
            let img2 = value.img2
            //console.log(img1)
            if(img2 === '' || img2 === null ){
              img2 = "/src/assets/fc_noimg_253128.jpg"
            }else{
              img2 = "//file.mk.co.kr"+img2.slice(12)
            }
            value.img2 = img2
            value.regnumber = value.franchiseNo
          }
          //console.log(data)
          this.listItems = data
        }
      })
    }
  }
}
</script>
