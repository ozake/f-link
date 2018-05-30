<template>
  <!--착한 컨설팅-->
	<div class="cunsulting">
		<h3>착한 컨설팅</h3>

		<!--관심브랜드-->
		<ul class="brand">
			<h4>관심브랜드<span>(중복선택 가능)</span></h4>
			<li v-for="item in checked">{{item.brand}}<!--<img src="http://img.mk.co.kr/2018/franchise/btn_close.jpg" alt="닫기">--></li>
		</ul>
		<!--//관심브랜드-->


		<!--정보입력-->
		<div class="data_in">
			<form name="input" id="input" method="post" action="http://www.f-link.co.kr/index.php?TM=C&MM=4" ref="form">
				<!-- <input v-for="item in checked" type="hidden" name="brand" :value="item.regnumber"> -->
				<input type="hidden" name="brand" :value="submitBrandCk">
				<!-- <input type="hidden" name="flag" value="true">
				<input type="hidden" name="kind" value="1"> -->
				<input type="hidden" name="category1" :value="categorycode1">
				<input type="hidden" name="category2" :value="categorycode2">
			<fieldset>
				<input name="name" title="이름" type="text" placeholder="이름" class="databox">
				<input name="hp1" title="연락처" type="text" placeholder="" class="phonebox" maxlength="3">
				<input name="hp2" title="연락처" type="text" placeholder="" class="phonebox" maxlength="4">
				<input name="hp3" title="연락처" type="text" placeholder="" class="phonebox" maxlength="4">
			</fieldset>
			

			<!--연령-->
			<div class="data-select">
				<select class="box_select" v-bind:class="{ box_select_ie : this.isIe }" name="age">
					<option>연령</option>
					<option value="20">20대</option>
					<option value="30">30대</option>
					<option value="40">40대</option>
					<option value="50">50대</option>
					<option value="60">60대</option>
					<option value="70">70대</option>
				</select>
			</div>
			<!--//연령-->


			<!--성별-->
			<div class="data-select">
				<select class="box_select" v-bind:class="{ box_select_ie : this.isIe }" name="gender">
					<option>성별</option>
					<option value="남">남자</option>
					<option value="여">여자</option>
				</select>
			</div>
			<!--//성별-->


			<!--창업자금-->
			<div class="data-select">
				<select class="box_select" v-bind:class="{ box_select_ie : this.isIe }" name="capital">
          <option>창업자금</option>
          <option value="50000000">5천만원</option>
          <option value="100000000">1억원</option>
          <option value="150000000">1.5억원</option>
          <option value="200000000">2억원</option>
          <option value="250000000">2.5억원</option>
          <option value="300000000">3억</option>
        </select>
			</div>
			<!--//창업자금-->

			<p>※ 매장 임대료 포함</p>
		</form>
		</div>
		<!--//정보입력-->

		<!--버튼-->
		<button type="button" class="btn_con" @click="cunsulting()">착한 컨설팅 신청</button>
		<button type="button" class="btn_con" @click="alertMethod('오픈준비중입니다.')">가맹본사 상담받기</button>

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
.phonebox {
	width: 65px;
    border: 1px solid #dcdcdc;
    background-color: #f7f7f7;
    /* padding: 9px 15px; */
	padding-bottom: 9px;
	padding-top: 9px;
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
	float: left;
	margin-right: 15.5px;
}
.phonebox:last-child {
	margin-right: 0px;
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
	props: {
		checked: Array,
		submitBrandCk: String,
		categorycode1: String,
		categorycode2: String
	},
	watch: {
		submitBrandCk: function(){
			this.$nextTick(function () {
				if(typeof this.submitBrandCk !== undefined){
					//alert(this.submitBrandCk)
					this.counsltingSubmit()
				}
			})
		}
	},
	created(){
		const agent = navigator.userAgent.toLowerCase()
		if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
			this.isIe = true
		}
	},
	methods: {
		alertMethod(val){
			alert(val)
		},
		cunsulting(){
			let checked = this.checked
			if(!sessionStorage.getItem('ID')){
				alert('로그인 후 사용가능합니다.')
				location.href="http://www.f-link.co.kr/index.php?TM=M&MM=1"
			}else{
				if(checked.length === 0){
				alert('브랜드를 선택해주세요')
			}else {
				let form = this.$refs.form
				if(form.elements['name'].value === ''){
					alert('이름을 입력해주세요')
				}else if(form.elements['hp1'].value === '') {
					alert('잔화번호 앞자리를 입력해주세요')
				}
				else if(form.elements['hp2'].value === '') {
					alert('잔화번호를 중간자리를 입력해주세요.')
				}
				else if(form.elements['hp3'].value === '') {
					alert('잔화번호를 뒷자리를 입력해주세요.')
				}
				else {
					this.$EventBus.$emit('submitOnOff')
				}
			}
			}
			
			
			//if(form.)
			//this.$EventBus.$emit('submitOnOff')
		},
		counsltingSubmit(){
			let form = this.$refs.form
			form.submit()
		}
	}
}
</script>
