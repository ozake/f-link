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
import numeral from "numeral"
export default {
  name: 'SnsBest',
  components:{
    SubHeaderTitle,
    CardBoxNbtn
  },
  data(){
    return {
      listItems : '',
      title : 'SNS 조회 BEST',
      subTitle : '포털과 SNS에서 많이 언급되는 브랜드',
      categoryCode : this.$route.params.categoryCode
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
        'ftcCate2Cd':`${this.categoryCode}`
      }
    }
    this.$http(config)
    .then((result) => {
      if(result.status === 200){
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
    }
  }
}
</script>
