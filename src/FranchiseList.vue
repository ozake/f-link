<template>
  <div id="content">
    <SubHeaderSelect :isIe="isIe"></SubHeaderSelect>
    <!--프랜차이즈 현황 리스트-->
		<div class="frlist">
			<div class="frlistbox">
        <CardBox  v-for="(item, index) in items" :index="index" :item="item"></CardBox>

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
      isIe:false
    }
  },
  props:{
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'franchise')
    this.listItems = this.makeArrayModuler(this.items,5)
    const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
     this.isIe = true
    }
  },
  methods:{

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
