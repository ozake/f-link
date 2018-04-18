<template>
  <!-- 메인이미지 영역-->
  <div class="lcontent">
    <h2>나에게 적합한 프랜차이즈를 찾아보세요<img src="http://img.mk.co.kr/2018/franchise/search_w.png" alt="검색"></h2>

    <!--분류별검색-->
    <div class="select">

      <!--대분류-->
      <div class="select-box">
        <select v-bind:class="[this.isIe ? ieClass : '', nonIeClass]">
          <option>대분류</option>
          <option>외식</option>
          <option>패스트푸드</option>
          <option>교육</option>
        </select>
      </div>
      <!--//대분류-->

      <!--중분류-->
      <div class="select-box">
        <select v-bind:class="[isIe ? ieClass : '', nonIeClass]">
          <option>중분류</option>
          <option>피자</option>
          <option>커피</option>
          <option>부대찌개</option>
        </select>
      </div>
      <!--//중분류-->

      <!--브랜드-->
      <div class="select-box">
        <select v-bind:class="[isIe ? ieClass : '', nonIeClass]">
          <option>브랜드</option>
          <option>네네피자</option>
          <option>피자헛</option>
          <option>미스터피자</option>
        </select>
      </div>
      <!--//브랜드-->

      <!--창업 자금  -->
      <div class="select-box">
        <select v-bind:class="[isIe ? ieClass : '', nonIeClass]">
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
      <!--//창업 자금  -->
    </div>
      <!--//분류별검색-->
    <p class="sectxt">※ 매장 임대료 포함</p>

  </div>
  <!-- //메인이미지 영역-->
</template>
<style scoped>
.select-box {
  width: 157px;
  height: 40px;
  float: left;
  margin-right: 30px;
  font-size: 16px;
  font-weight: 300;
  color: #555;
  padding: 0 0 0 0;
  overflow: hidden;
  background: #fff url(http://img.mk.co.kr/2018/franchise/btn_select.jpg) no-repeat 100%;
}
.select-box:last-child {
    margin-right: 0;
}

.box_title {
  width: 157px;
  height: 40px;
  background: transparent;
  display: block;
  line-height: 37px;
  padding-left: 12px;
  /* margin-top: -6px; */
  border: none;
  text-transform: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.box_title_ie {
  width: 175px;
  height: 40px;
  background: transparent;
  display: block;
  line-height: 37px;
  padding-left: 12px;
  /* margin-top: -6px; */
  border: none;
  text-transform: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
<script>
export default {
  name: 'SubHeaderSelect',
  props: {
    isIe : ''
  },
   data(){
     return {
       ieClass : 'box_title_ie',
       nonIeClass : 'box_title'
     }
   },
   created(){
     const agent = navigator.userAgent.toLowerCase();
     if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
      this.isIe = true
    }
  }
}

</script>
