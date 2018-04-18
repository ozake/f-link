<template>
  <!--프랜차이즈 박스-->
	<ul>
		<li class="fr_logo"><img src="http://img.mk.co.kr/2018/franchise/hollys.jpg" alt="할리스커피"></li>
		<li class="fr_tit">할리스 커피</li>
		<dl>
			<dt>분류</dt>
			<dd>외식 > 피자</dd>
			<dt>창업비용</dt>
			<dd>8000만원</dd>
			<dt>기준평형</dt>
			<dd>24평</dd>
		</dl>
	</ul>
			<!--//프랜차이즈 박스-->
</template>
<style scoped>

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
