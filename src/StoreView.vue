<template>
<!-- 콘텐츠 -->
		<div id="content">


			<!--건물 상세화면-->
			<div class="building_view">

				<!--건물타이틀-->
				<h3>
					<p>이디야 충무로점</p>  정보
				    <span>서울시   용산구   용산동 125번지  매경타워 1층</span>
				</h3>
				<!--//건물타이틀-->

				<!--지도영역-->
				<div class="map">
					<img src="http://img.mk.co.kr/2018/franchise/building_map.jpg" alt="건물지도 임시이미지">

					<!--건물위치 아이콘-->
					<div class="icon_bu" style="position:absolute;left:400px;top:200px">
                         <img src="http://img.mk.co.kr/2018/franchise/icon_bu.png" alt="건물지도 임시이미지">
					</div>
					<!--//건물위치 아이콘-->

					<!--배후지 설명-->
					<div class="areainfo" style="position:absolute;left:550px;top:220px">
					    <b>배후지 영역이란?</b>
						해당 건물 기준  인구수, 이동거리,이동방향을 고려해<br> 창업에 영향을 미치는 상권영역
					</div>
					<!--//배후지 설명-->


					<!--유동인구 유입경로-->
					<ul>
						<li class="leftinfo">유동인구<br> 유입경로</li>
						<li class="rightinfo">이 영역에서 유동인구가 가장 높게 유입되는 방향은 ‘남서’측이며, 도보한계치는 최대 596m까지 입니다.
                                             <span>※ 도보한계치란? 도보로 이동했을 때, 빌딩을 이용하는데 불편함을 느끼지 않는 한계 거리를 의미합니다 </span></li>
					</ul>
				</div>
				<!--//지도영역-->

				<!--기본정보-->

				<div class="binfo">
				<h4>기본정보</h4>
					<div>
						<dl>
							<dt>건물명</dt>
							<dd>매경미디어센터 </dd>
							<dt>주소</dt>
							<dd>서울특별시 중구 필동1가 30</dd>
							<dt>건물유형</dt>
							<dd>기타 제2종 근생</dd>
							<dt>연면적</dt>
							<dd>747.3㎡ </dd>
							<dt>층수 </dt>
							<dd>지하1층~지상4</dd>
							<dt>지하철/버스  </dt>
							<dd>7m / 131m</dd>
							<dt>주차대수</dt>
							<dd>옥외 2대/옥내 5대</dd>
							<dt>승강기대수</dt>
							<dd>3대</dd>
							<dt>준공연도</dt>
							<dd>1900년</dd>
						</dl>
					</div>
				</div>
				<!--//기본정보-->

				<!--건물 내 업체 현황-->

				<div class="binfo1">
				<h4>건물 내 업체 현황</h4>
					<div>
						<dl>
							<dt>이마트 everyday (지하1층)</dt>
							<dd>02-2000-5450</dd>
							<dt>이디야 필동점 (1층)</dt>
							<dd>02-2000-5450</dd>
							<dt>오매가매 </dt>
							<dd>02-2000-5450</dd>
							<dt>고도일학원 필동점</dt>
							<dd>02-2000-5450</dd>
							<dt>이마트 everyday (지하1층)</dt>
							<dd>02-2000-5450</dd>
							<dt>이디야 필동점 (1층)</dt>
							<dd>02-2000-5450</dd>
							<dt>오매가매 </dt>
							<dd>02-2000-5450</dd>
							<dt>고도일학원 필동점</dt>
							<dd>02-2000-5450</dd>
							<dt>이마트 everyday (지하1층)</dt>
							<dd>02-2000-5450</dd>
							<dt>이디야 필동점 (1층)</dt>
							<dd>02-2000-5450</dd>
							<dt>오매가매 </dt>
							<dd>02-2000-5450</dd>
							<dt>고도일학원 필동점</dt>
							<dd>02-2000-5450</dd>
						</dl>
					</div>
				</div>
				<!--//건물 내 업체 현황-->

				<!--건물 평가지표 -->
				<h5>건물 평가지표<span>(* 건물을 중심으로 인구 흐름을 분석한 배후지영역에 대한 평가)</span></h5>

				<div class="diagram">

					<!--건물 평가지표 그래프 -->
					<div class="graph1">
					  <img src="http://img.mk.co.kr/2018/franchise/graph1.jpg" alt="건물평가지표 임시이미지">
					  <ul>
						<li class="tit">지표 설명</li>
						<li><b>성장성</b>한식 업종의 전(12개월 전)년 대비 매출 성장률을 지수로 나타냅니다. </li>
						<li><b>안정성</b>한식 업종을 창업 시 얼마나 오래 유지할 수 있는지를 지수화 했습니다.</li>
						<li><b>유동성</b>건물의 배후지영역의 잠재 고객수를 지수화 했습니다.</li>
						<li><b>수익성</b>한식 업종 창업 시 객단가를 지역 평균과 비교해 제시합니다.</li>
						<li><b>접근성</b>건물의 교통 및 접근 편의성을 지수화 했습니다.</li>
					  </ul>
					</div>
					<!--//건물 평가지표 그래프 -->


					<!--유동성-->
					<h6>유동성<span>※건물 주변 배후지영역 내 유동인구 분석</span></h6>
					<div class="graph2">
						<span class="subtit">성별 분포</span>
						<!--성별분포 그래프영역 -->
						<div style="width:245px;height:85px;background-color:#dcdcdc"></div>
						<!--//성별분포 그래프영역 -->
					</div>

					<div class="graph3">
						<span class="subtit">연령별 분포</span>
						<!--연령별분포 그래프영역 -->
						<div style="width:730px;height:85px;background-color:#dcdcdc"></div>
						<!--//연령별분포 그래프영역 -->
					</div>

					<div class="graph4">
						<span class="subtit">유동성 - 요일별, 시간대별 유동인구 현황</span>
						<!--요일별, 시간대별  그래프영역 -->
						<div style="width:1003px;height:300px;background-color:#f2f2f2"></div>
						<!--//요일별, 시간대별  그래프영역 -->
					</div>
					<!--//유동성-->



					<!--접근성-->
					<h6>접근성<span>※선택 건물의 교통편의시설 및 배후지영역 내 교통시설</span></h6>
					<table width="1005" border="0" cellspacing="0" cellpadding="0">
					  <tr>
						<th rowspan="2" align="center">건물</th>
						<td height="30" align="center">주차가능 대수</td>
						<td height="30" align="center">20대</td>
					  </tr>
					  <tr>
						<td height="30" align="center">승강기 대수</td>
						<td height="30" align="center">2대</td>
					  </tr>
					  <tr>
						<th rowspan="2" align="center">배후지 영역</th>
						<td height="30" align="center">지하철 정보</td>
						<td height="30" align="center">동묘앞역 2번출구</td>
					  </tr>
					  <tr>
						<td height="30" align="center">버스정류장 수</td>
						<td height="30" align="center">2개</td>
					  </tr>
					</table>
					<!--//접근성-->


					<!--성장성-->
					<h6>성장성<span>※한식 업종 매출 추이</span></h6>
					<div class="graph4">
						<span class="subtit">전년도 연간 매출 변동 추이</span>
						<!--그래프영역 -->
						<div style="width:1003px;height:300px;background-color:#f2f2f2">
						      <!--그래프 없을경우 -->
						      <p class="nograph">해당업종 정보가 5건 이하로 그래프를 제공하지 않습니다.</p>
							  <!--//그래프 없을경우 -->
						</div>
						<!--//그래프영역 -->
					</div>

					<!--//성장성-->



					<!--안정성-->
					<h6>안정성</h6>
					<div class="graph5">
						<span class="subtit">한식업종 평균 영업기간 [단위: 년]  </span>
						<!--한식업종 평균 영업기간  -->
						<div style="width:490px;height:200px;background-color:#f2f2f2">
							<!--그래프 없을경우 -->
						      <p class="nograph">해당업종 정보가 5건 이하로 <br>그래프를 제공하지 않습니다.</p>
							  <!--//그래프 없을경우 -->
						</div>
						<!--//한식업종 평균 영업기간  -->
					</div>

					<div class="graph6">
						<span class="subtit">배후지 영역 내 한식업종 사업체 수</span>
						<!--배후지 영역 내 사업체 수 -->
						<div style="width:490px;height:200px;background-color:#f6f6f6;border:1px solid #dcdcdc">
							<dl>
								<dt> 사랑방 갈비</dt>
								<dd>서울특별시 중구 필동1가 135 태광빌딩 102호)</dd>
								<dt> 고랭지 김치찌개</dt>
								<dd>서울특별시 중구 필동1가 120 A빌딩 B 101호)</dd>
								<dt> 원님 곰탕 </dt>
								<dd>서울특별시 중구 필동1가 120 A빌딩 B 101호)</dd>
								<dt> 사랑방 갈비</dt>
								<dd>서울특별시 중구 필동1가 135 태광빌딩 102호)</dd>
								<dt> 고랭지 김치찌개</dt>
								<dd>서울특별시 중구 필동1가 120 A빌딩 B 101호)</dd>
								<dt> 원님 곰탕 </dt>
								<dd>서울특별시 중구 필동1가 120 A빌딩 B 101호)</dd>
								<dt> 고랭지 김치찌개</dt>
								<dd>서울특별시 중구 필동1가 120 A빌딩 B 101호)</dd>
								<dt> 원님 곰탕 </dt>
								<dd>서울특별시 중구 필동1가 120 A빌딩 B 101호)</dd>
							</dl>
						</div>
						<!--//배후지 영역 내 사업체 수 -->
					</div>
					<!--//안정성-->



					<!--수익성  -->
					<h6>수익성<span>※한식 업종의 지역 객단가 비교</span></h6>
					<div class="graph7">
					한식 업종의 선택 지역 객단가(결제 1건당 매출액)는 지역 평균값 0,000원과 비슷한 수준입니다.  (업종 특성 상 메뉴, 영업형태 등 요소에 의해 객단가 평가에 차이가 발생할 수 있습니다.)
					</div>



					</div>

				</div>
				<!--//건물 평가지표 -->

			</div>
			<!--//건물 상세화면-->

</template>
<script>
import ApiModel from './model/apiModel.js'
export default {
  name: 'StoreView',
  components:{

  },
  data () {
    return {
      apiModel: new ApiModel(this.$http),
      item : []
    }
  },
  created() {
    this.$EventBus.$emit('HeaderActive', 'store')
    this.getFranchiseView(this.$route.params.id)
  },
  methods: {
    getFranchiseView(val) {
      this.apiModel.get
    }
  }
}
</script>
