<template>
  <!--프랜차이즈 박스-->
	<ul>
		<router-link :to="{ name: 'sales-view', params: {id: item.memul_seq } }">
		<li class="fr_logo"><img class="box-img" v-bind:src="item.img_url" /></li>
		<li class="fr_tit">보 {{item.month_deposit_price}} / 월{{item.month_price}}</li>
		<dl>
			<dt>추천업종</dt>
			<dd>{{item.rec_using}}</dd>
			<dt>{{item.corrp_flr}}층</dt>
			<dd>{{item.supp_meter}}㎡</dd>
		</dl>
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
  name: 'CardBoxNbtn.1',
  props: ['item', 'index'],
  data(){
    return {
    }
  }
}
</script>
