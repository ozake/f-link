<template>
  <!--프랜차이즈 박스-->
	<ul>
		<router-link :to="{ name: 'sales-view', params: {id: item.memul_seq } }">
			<li class="fr_logo"><img class="box-img" v-bind:src="item.img_url" /></li>
			<li class="monthly"><span class="icon">월</span>{{item.month_deposit_price}}/{{item.month_price}}</li>
			<li class="premium "><span class="icon">권</span>{{item.pre_price}}</li>
			<li class="text">{{item.corrp_flr}}층  {{item.supp_meter}}㎡<br>
					{{item.subway_info}}<br>
					추천업종 : {{item.rec_using}}
			</li>
			<li class="text">매물등록일 {{item.mk_reg_date}}</li>
		</router-link>
	</ul>
			<!--//프랜차이즈 박스-->
</template>
<style scoped>
.box-img{
	margin: 0 auto;
  display: block;
  height: 100%;
}
</style>
<script>
export default {
  name: 'CardBoxEstate',
  props: ['item', 'index'],
  data(){
    return {
    }
  }
}
</script>
