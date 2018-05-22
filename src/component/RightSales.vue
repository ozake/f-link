<template>
  <!--추천매물-->
  <div class="recommend">
    <h6>추천 매물</h6>

    <ul v-for="item in estateList">
      <li><img class="img" v-bind:src="item.img_url" /></li>
      <li class="monthly"><span class="icon">월</span>보 {{item.pre_price}} / 월{{item.month_price}}</li>
      <!-- <li class="premium "><span class="icon">권</span>1억5000만원</li> -->
      <li class="text">{{item.corrp_flr}}층  {{item.supp_meter}}㎡<br>
         추천업종 : {{item.rec_using}}
      </li>
    </ul>


  </div>
  <!--//추천매물-->
</template>
<style scoped>
.img {
  width: 95%;
}
</style>
<script>
export default {
  name: 'RightSales',
  props: {
    estateList : Array
  },
  data(){
    return {
    }
  }
}
</script>
