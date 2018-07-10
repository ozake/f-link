<template>
  <div id="content">
    <SubHeaderTitle :title="this.title" :subTitle="this.subTitle" :flag="flag" :routeName="routeName"></SubHeaderTitle>
		<div class="frlist">
      <!--프랜차이즈 현황 리스트-->
			<div class="thlistbox">
        <CardBoxNbtn v-for="(item, index) in listItems" :index="index" :item="item"></CardBoxNbtn>
			</div>
			<!--//프랜차이즈 현황 리스트-->

      <!--페이징-->
      <Pagination :totalCount="totalCount" :currentPage="currentPage" :pageingRange="pageingRange" :pageRows="pageRows" :routeName="routeName"></Pagination>
  </div>


  </div>
</template>
<script>
import SubHeaderTitle from './component/SubHeaderTitle.vue'
import CardBoxNbtn from './component/CardBoxNbtn.vue'
import Pagination from './component/Pagination.vue'
import ApiModel from './model/apiModel';
import numeral from "numeral"
export default {
  name: 'scapital-best',
  components:{
    SubHeaderTitle,
    CardBoxNbtn,
    Pagination
  },
  data(){
    return {
      listItems : '',
      title : '소자본 창업 BEST',
      subTitle : '창업 자금 1억원 미만 (점포 임대 비용 제외)',
      apiModel : new ApiModel(this.$http),
      totalCount : 0,
      currentPage : 1,
      pageingRange : 10,
      pageRows : 16,
      routeName : 'scapital-list',
      flag: 'sCaptial'
    }
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    $route: function () {
      this.currentPage = this.$route.params.page
      this.$nextTick(function(){
        this.getScapitalBest(this.$route.params.categoryCode,this.currentPage)
      })
    }
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'theme')
    if(this.$route.params.page){
      this.currentPage = Number(this.$route.params.page)
    }
    this.getScapitalBest(this.$route.params.categoryCode, this.currentPage)
  },
  methods: {
    getScapitalBest(categoryCode,page) {
        let rPage = page - 1
        this.apiModel.getScapitalBest(categoryCode,rPage).then((result)=>{
        if(result.status === 200){
          let data = result.data
          //console.log(result)
          if(typeof data === 'string'){
            data = data.replace(/\r/g, "")
						data = data.replace(/\\r/g, "")
						data = data.replace(/\n/g, "")
						data = data.replace(/\\n/g, "")
						data = data.replace(/\\'/g, "")
						data = eval("("+data+")")
        	}
          let paging = data.shift()
          this.totalCount = Number(paging.totalCount)
          this.currentPage = Number(paging.pageNo) + 1
          console.log(paging)
          for (const value of data) {
            let total = value.total
              total = total.slice(0,-1)
              total = Number(total)
              total = numeral(total).format('0,0')
            value.total = total
            let img2 = value.img2
            if(img2 === ''){
              img2 = "/src/assets/fc_noimg_253128.jpg"
            }else{
              img2 = "//file.mk.co.kr"+img2.slice(12)
            }
            value.img2 = img2
          }
          this.listItems = data
        }
      })
    }
  }
}
</script>
