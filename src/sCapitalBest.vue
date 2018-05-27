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
            <!--
      <div class="paging">
        <a class="pre" href="#"></a>
        <a class="on" href="#"><strong>1</strong></a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">7</a>
        <a href="#">8</a>
        <a href="#">9</a>
        <a href="#">10</a>
        <a class="next" href="#"></a>
      </div>
      -->
      <!--//페이징-->
  </div>


  </div>
</template>
<script>
import SubHeaderTitle from './component/SubHeaderTitle.vue'
import CardBoxNbtn from './component/CardBoxNbtn.vue'
import ApiModel from './model/apiModel';
export default {
  name: 'scapital-best',
  components:{
    SubHeaderTitle,
    CardBoxNbtn
  },
  data(){
    return {
      listItems : '',
      title : '소자본 창업 BEST',
      subTitle : '창업 자금 1억원 미만 (점포 임대 비용 제외)',
      apiModel : new ApiModel(this.$http)
    }
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'theme')
    this.apiModel.getScapitalBest('0').then((result)=>{
      if(result.status === 200){
        let data = result.data
        console.log(result)
        let paging = data.shift()
        console.log(paging)
        for (const value of data) {
          let img1 = value.img1
          if(value.img1 === ''){
            img1 = "http://img.mk.co.kr/2018/franchise/pizza.jpg"
          }else{
            img1 = "//file.mk.co.kr"+img1.slice(12)
          }
          value.img1 = img1
        }
        this.listItems = data
        
      }
    })
  }
}
</script>
