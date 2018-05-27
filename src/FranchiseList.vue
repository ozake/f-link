<template>
  <div id="content">
    <SubHeaderSelect :isIe="isIe"></SubHeaderSelect>
    <!--프랜차이즈 현황 리스트-->
		<div class="frlist">
			<div class="frlistbox">

        <CardBox  v-for="(item, index) in listItems" :index="index" :item="item"></CardBox>

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
      </div>

      <RightCunsulting></RightCunsulting>
    </div>
    <!--//프랜차이즈 현황 리스트-->
  </div>
</template>
<style scoped>

</style>
<script>
import SubHeaderSelect from "./component/SubHeaderSelect.vue"
import CardBox from "./component/CardBox.vue"
import RightCunsulting from "./component/RightCunsulting.vue"
import ApiModel from "./model/apiModel.js"
import numeral from "numeral";
export default {
  name: 'FranchiseList',
  components:{
    SubHeaderSelect,
    CardBox,
    RightCunsulting
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
        }
      ],
      listItems : '',
      isIe:false,
      apiModel: new ApiModel(this.$http)
    }
  },
  props:{
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'franchise')
    //this.listItems = this.makeArrayModuler(this.items,5)
    const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
     this.isIe = true
    }
    console.log("카테고리:"+this.$route.params.categoryCode)
    if(this.$route.params.categoryCode === undefined){
      this.franchiseList('한식').then((result)=>{
        console.log(result)
        //this.listItems = this.makeArrayModuler(result,5)
        this.listItems = result
      })
    }else{
      this.fetchData()
    }
  },
  methods:{
    fetchData(){
      this.franchiseList(this.$route.params.categoryCode).then((result)=>{
        this.listItems = this.makeArrayModuler(result,5)
      })
      //alert(this.$route.params.categoryCode)
    },
    async franchiseList(categoryname){
      let data = null
      if(categoryname === '' || categoryname === null || categoryname === undefined){
        console.log("error")
      }else{
        console.log(categoryname)
        //let model = new ApiModel(this.$http)
        /* model.getFranchiseList(categoryname).then((result)=>{
          //console.log(result)
          if(result.status === 200){
            let data = result.data
            //console.log(data)
            //this.rItems = data
            return data
          }
        }) */
        let result = await this.apiModel.getFranchiseList(categoryname,9)
        if(result.status === 200){
            let data = []
            data = result.data

            let paging = data.shift()
            console.log(paging)
            for (const value of data) {
              let total = value.total
              total = Number(total)
              total = numeral(total).format('0,0')
              value.total = total
              let img2 = value.img2
              if(value.img2 === ''){
                img2 = "/src/assets/fc_noimg_253128.jpg"
              }else{
                img2 = "//file.mk.co.kr"+img2.slice(12)
              }
              value.img2 = img2
            }
            //console.log(data[0].img1)
            //console.log(data)
            //this.rItems = data
            return data
        }
      }

    },
    /**
     * makeArrayModuler - description
     *
     * @param  {type} array description
     * @param  {type} mod=1 description
     * @return {type}       description
     */
    makeArrayModuler(array, mod=1){
      let resArr = [];
      let tmpArr = [];
      let i = 0;
      for(const [idx, val] of array.entries()){
        tmpArr.push(val);
        if( (idx+1)%mod === 0 ){
          resArr[i] = tmpArr;
          tmpArr = []
          i++;
        }
      }
      return resArr;
    }

  }
}
</script>
