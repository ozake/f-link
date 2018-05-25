<template>
  <!--프랜차이즈 박스-->
	<ul>
		<router-link :to="{ name: 'franchise-view', params: {id: item.regnumber } }">
		<li class="fr_logo"><img class="box-img" v-bind:src="item.img2" /></li>
		<li class="fr_tit">{{item.brand}}</li>
		<dl>
			<dt>분류</dt>
			<dd>{{item.category1}} > {{item.category2}}</dd>
			<dt>창업비용</dt>
			<dd>{{item.total}}천원</dd>
			<dt>기준평형</dt>
			<dd>{{item.storearea}}평</dd>
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
  name: 'CardBoxNbtn',
  props: ['item', 'index'],
  data(){
    return {
    }
  }
}
</script>
