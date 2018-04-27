<template>
      <div id="content">
        <BigSubHeader></BigSubHeader>
        <!-- 서브메뉴-->
  			<div class="smenu">
  				<ul>
  					<li class="img"><a href="#"><img src="http://img.mk.co.kr/2018/franchise/list.png" alt="전체메뉴보기"></a></li>
  					<li class="on"><a href="#">한식</a></li>
  					<li><a href="#">패스트푸드</a></li>
  					<li><a href="#">치킨</a></li>
  					<li><a href="#">피자</a></li>
  					<li><a href="#">제과제빵</a></li>
  					<li><a href="#">커피</a></li>
  					<li><a href="#">편의점</a></li>
  					<li><a href="#">화장품</a></li>
  					<li><a href="#">교육</a></li>
  					<li><a href="#">유아</a></li>
  					<li class="img1"><a href="#"><img src="http://img.mk.co.kr/2018/franchise/list_prev.png" alt="앞으로"></a></li>
  					<li class="img1"><a href="#"><img src="http://img.mk.co.kr/2018/franchise/list_next.png" alt="뒤로"></a></li>
  				</ul>
  			</div>
  			<!-- //서브메뉴-->

        <!-- 프랜차이즈리스트-->
			  <div class="fran_list">
          <div class="list_wrap" v-for="(listItem, idx) in this.listItems">
            <BoxContent  v-for="(item, index) in listItem" :index="index" :item="item"></BoxContent>
          </div>
        </div>



      </div>
</template>
<style scoped>
.list_wrap {
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 60px;
  margin-bottom: 60px;
}
.list_wrap:last-child {
    border: 0;
    padding-bottom: 0px;
}
</style>
<script>
import BigSubHeader from "./component/BigSubHeader.vue"
import BoxContent from "./component/box-content.vue"
export default {
  name: 'Franchise',
  components:{
    BigSubHeader,
    BoxContent
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
        }
      ],
      listItems : ''
    }
  },
  props:{
  },
  created(){
    this.listItems = this.makeArrayModuler(this.items,5)
    this.$EventBus.$emit('HeaderActive', 'franchise')
  },
  methods:{
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
