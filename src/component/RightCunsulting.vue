<template>
  <!--착한 컨설팅-->
	<div class="cunsulting">
		<h3>착한 컨설팅</h3>

		<!--관심브랜드-->
		<ul class="brand">
			<h4>관심브랜드<span>(중복선택 가능)</span></h4>
			<li>초록마을<img src="http://img.mk.co.kr/2018/franchise/btn_close.jpg" alt="닫기"></li>
			<li>미스터피자<img src="http://img.mk.co.kr/2018/franchise/btn_close.jpg" alt="닫기"></li>
		</ul>
		<!--//관심브랜드-->


		<!--정보입력-->
		<div class="data_in">
			<form name="input" id="input">
			<fieldset>
				<input name="name" title="이름" type="text" placeholder="이름" class="databox">
				<input name="phone" title="연락처" type="text" placeholder="연락처" class="databox">
			</fieldset>
			</form>

			<!--연령-->
			<div class="data-select">
				<select class="box_select" v-bind:class="{ box_select_ie : this.isIe }">
					<option>연령</option>
					<option>20대</option>
					<option>30대</option>
					<option>40대</option>
					<option>50대</option>
					<option>60대 이상</option>
				</select>
			</div>
			<!--//연령-->


			<!--성별-->
			<div class="data-select">
				<select class="box_select" v-bind:class="{ box_select_ie : this.isIe }">
					<option>성별</option>
					<option>남자</option>
					<option>여자</option>
				</select>
			</div>
			<!--//성별-->


			<!--창업자금-->
			<div class="data-select">
				<select class="box_select" v-bind:class="{ box_select_ie : this.isIe }">
          <option>창업자금</option>
          <option>5천만원 미만</option>
          <option>5천~1억원</option>
          <option>1억~1.5억원</option>
          <option>>1.5~2억원</option>
          <option>2~2.5억원</option>
          <option>2.5~3억</option>
          <option>3억원 이상</option>
        </select>
			</div>
			<!--//창업자금-->

			<p>※ 매장 임대료 포함</p>

		</div>
		<!--//정보입력-->

		<!--버튼-->
		<a href="#"><button class="btn_con">착한 컨설팅 신청</button></a>
		<a href="#"><button class="btn_con">가맹본사 상담받기</button></a>

	</div>
	<!--//착한 컨설팅-->

</template>
<style scoped>
.data-select{
	position: relative;
	overflow: hidden;
	background: #f7f7f7 url(http://img.mk.co.kr/2018/franchise/btn_select1.jpg) no-repeat 100%;
	width: 231px;
	height: 44px;
	margin-bottom: 10px;
	border: 1px solid #dcdcdc;
}
.box_select{
		width: 100%;
		height: 100%;
    display: block;
    font-size: 16px;
    color: #555;
    border: none;
    padding: 9px 15px;
    font-size: 16px;
		background: transparent;
		text-transform: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
}
.box_select_ie {
	width: 255px;
	padding-right: 0px;
}
</style>
<script>
export default {
  name: 'RightCunsulting',
	data(){
		return {
			isIe: false
		}
	},
	created(){
		const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
     this.isIe = true
   }
	}
}
</script>
