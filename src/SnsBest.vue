<template>
  <div id="content">
    <SubHeaderTitle :title="this.title" :subTitle="this.subTitle"></SubHeaderTitle>
		<div class="frlist">
      <!--프랜차이즈 현황 리스트-->
			<div class="thlistbox">
        <CardBoxNbtn v-for="(item, index) in items" :index="index" :item="item"></CardBoxNbtn>
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
export default {
  name: 'SnsBest',
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
      title : 'SNS 조회 BEST',
      subTitle : '포털과 SNS에서 많이 언급되는 브랜드'
    }
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'theme')
    const baseURI = 'http://www.f-link.co.kr';
    let config = {
      method: 'post',
      url: `${baseURI}/container/OP-403.php`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'pageNo':'1',
        'row':'16',
        'ftcCate2Cd':'0101'
      }
    }
    this.$http(config)
    .then((result) => {
      //console.log(result)
      //console.log(result.status)
      if(result.status === 200){
        //let res = JSON.parse(result.data)
        let data = result.data.data
        console.log(data)
      }

    })
  }
}
</script>
