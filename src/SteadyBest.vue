<template>
  <div id="content">
    <SubHeaderTitle :title="this.title" :subTitle="this.subTitle"></SubHeaderTitle>
		<div class="frlist">
      <!--프랜차이즈 현황 리스트-->
			<div class="thlistbox">
        <CardBoxNbtn v-for="(item, index) in listItems" :index="index" :item="item"></CardBoxNbtn>
			</div>
			<!--//프랜차이즈 현황 리스트-->
      <!--페이징-->
      <Pagination :totalCount="totalCount" :currentPage="currentPage" :pageingRange="pageingRange" :pageRows="pageRows" :routeName="routeName"></Pagination>
      <!--//페이징-->
  </div>


  </div>
</template>
<script>
import SubHeaderTitle from './component/SubHeaderTitle.vue'
import CardBoxNbtn from './component/CardBoxNbtn.vue'
import Pagination from './component/Pagination.vue'
import ApiModel from './model/apiModel'
export default {
  name: 'steady-best',
  components:{
    SubHeaderTitle,
    CardBoxNbtn,
    Pagination
  },
  data(){
    return {
      listItems : '',
      title : '스테디셀러 브랜드',
      subTitle : '10년 이상 가맹사업 지속한 브랜드',
      apiModel : new ApiModel(this.$http),
      totalCount : 0,
      currentPage : 1,
      pageingRange : 10,
      pageRows : 16,
      routeName : 'steady-list'
    }
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    $route: function () {
      this.currentPage = this.$route.params.page
      this.$nextTick(function(){
        this.getSteadyBest(this.currentPage)
      })
    }
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'theme')
    if(this.$route.params.page){
      this.currentPage = Number(this.$route.params.page)
    }
    this.getSteadyBest(this.currentPage)
  },
  methods: {
    getSteadyBest(page) {
      this.apiModel.getSteadyBest(page).then((result)=>{
        if(result.status === 200){
          console.log(result)
          let data = result.data
          let paging = data.shift()
          this.totalCount = Number(paging.totalCount)
          this.currentPage = Number(paging.pageNo)
          for (const value of data) {
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
