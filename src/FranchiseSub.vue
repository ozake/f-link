<template>
  <div id="content">
    <SubHeaderSelect :isIe="isIe"></SubHeaderSelect>

  </div>
</template>
<style scoped>

</style>
<script>
import SubHeaderSelect from "./component/SubHeaderSelect.vue"
//import CardBox from "./component/CardBox.vue"
//import RightCunsulting from "./component/RightCunsulting.vue"
export default {
  name: 'FranchiseList',
  components:{
    SubHeaderSelect
  },
  data(){
    return {
      isIe:false
    }
  },
  props:{
  },
  created(){
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
