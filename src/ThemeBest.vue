<template>
      <div id="content">
        <div class="frtheme">
  				<ul class="theme">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img01.jpg" alt="소자본 창업 베스트">
  					<li class="th_tit">소자본 창업 BEST</li>
  					<li class="th_txt">창업 자금 1억원 미만<br>(점포 임대 비용 제외)</li>
  					<button class="th_btn" type="button"><a href="#">테마보기</a></button>
  				</ul>
  				<ul class="theme_r">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img03.jpg" alt="스테디셀러 브랜드">
  					<li class="th_tit">스테디셀러 브랜드</li>
  					<li class="th_txt">10년 이상 가맹사업 <br>지속한 브랜드</li>
  					<button class="th_btn" type="button"><a href="#">테마보기</a></button>
  				</ul>
  				<ul class="theme">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img02.jpg" alt="매장 증가율 BEST">
  					<li class="th_tit">매장 증가율 BEST</li>
  					<li class="th_txt">최근 1년간 매장을 <br>가장 많이 확장한 브랜드</li>
  					<button class="th_btn" type="button"><a href="#">테마보기</a></button>
  				</ul>
  				<ul class="theme_r">
  					<img src="http://img.mk.co.kr/2018/franchise/th_img04.jpg" alt="SNS 조회 BEST">
  					<li class="th_tit">SNS 조회 BEST</li>
  					<li class="th_txt">포털과 SNS에서 <br>많이 언급되는 브랜드</li>
  					<button class="th_btn" type="button"><router-link to="snsBest">테마보기</router-link></button>
  				</ul>
			</div>

      </div>
</template>
<script>
export default {
  name: 'ThemeBest',
  components:{

  },
  created() {
    this.$EventBus.$emit('HeaderActive', 'theme')
  }
}
</script>
