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
      <!--//페이징-->
  </div>


  </div>
</template>
<script>
import SubHeaderTitle from './component/SubHeaderTitle.vue'
import CardBoxNbtn from './component/CardBoxNbtn.vue'
import ApiModel from './model/apiModel';
export default {
  name: 'steady-best',
  components:{
    SubHeaderTitle,
    CardBoxNbtn
  },
  data(){
    return {
      items: [
        {
          id:1,
          title: "test"
        },
        {
          id:2,
          title: "test"
        },
        {
          id:3,
          title: "test"
        },
        {
          id:4,
          title: "test"
        },
        {
          id:5,
          title: "test"
        },
        {
          id:6,
          title: "test"
        },
        {
          id:7,
          title: "test"
        },
        {
          id:8,
          title: "test"
        },
        {
          id:9,
          title: "test"
        },
        {
          id:10,
          title: "test"
        },
        {
          id:11,
          title: "test"
        },
        {
          id:12,
          title: "test"
        },
        {
          id:13,
          title: "test"
        },{
          id:14,
          title: "test"
        },
        {
          id:15,
          title: "test"
        },
        {
          id:16,
          title: "test"
        }
      ],
      listItems : '',
      title : '스테디셀러 브랜드',
      subTitle : '10년 이상 가맹사업 지속한 브랜드',
      apiModel : new ApiModel(this.$http)
    }
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'theme')
    this.apiModel.getSteadyBest('0').then((result)=>{
      if(result.status === 200){
        console.log(result)
        let data = result.data
        let paging = data.shift()
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
