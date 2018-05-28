<template>
<!-- 콘텐츠 -->
		<div id="content">


			<!--건물 상세화면-->
			<div class="building_view">

				<!--건물타이틀-->
				<h3>
					<p>{{storeName}}</p>  정보
				    <span>{{item.addr}}</span>
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
							<dd>{{item.buldNm}}</dd>
							<dt>주소</dt>
							<dd>{{item.addr}}</dd>
							<dt>건물유형</dt>
							<dd>{{item.bdtypNm}}</dd>
							<dt>연면적</dt>
							<dd>{{item.grossArea}}㎡ </dd>
							<dt>층수 </dt>
							<dd>지하{{item.undFloor}}층~지상{{item.groFloo}}</dd>
							<dt>지하철/버스  </dt>
							<dd>{{item.subDist}}m / {{item.busDist}}m</dd>
							<dt>주차대수</dt>
							<dd>{{item.totalparknum}}대</dd>
							<dt>승강기대수</dt>
							<dd>{{item.liftnum}}대</dd>
							<dt>준공연도</dt>
							<dd>{{item.useapprovaldate}}년</dd>
						</dl>
					</div>
				</div>
				<!--//기본정보-->

				<!--건물 내 업체 현황-->

				<div class="binfo1">
				<h4>건물 내 업체 현황</h4>
					<div class="binfoWrap">
						<div v-for="item in buildIn" class="binfoItem">
							<span>{{item.refNm}} {{item.refBnm}}</span><span>{{item.tel}}</span>
						</div>
					</div>
				</div>
				<!--//건물 내 업체 현황-->

				<!--건물 평가지표 -->
				<h5>건물 평가지표<span>(* 건물을 중심으로 인구 흐름을 분석한 배후지영역에 대한 평가)</span></h5>

				<div class="diagram">

					<!--건물 평가지표 그래프 -->
					<div class="graph1">
						<div class="RaderGraphContainer">
							<chart-rader :labels="raderChartLabels" :datasets="raderChartDatasets" :options="raderChartOption"></chart-rader>
						</div>
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
						<div class="genderGraph">
							<div v-for="(item,index) in basedInfo.fpoplSex" v-bind:style="{ width: item + '%'}" v-bind:class="{ male: ( index === 0 ), female: ( index === 1 ) }">{{(index === 0) ? '남성' : '여성'}}<br/>{{item + '%'}}</div>
						</div>
						<!--//성별분포 그래프영역 -->
					</div>

					<div class="graph3">
						<span class="subtit">연령별 분포</span>
						<!--연령별분포 그래프영역 -->
						<div class="ageGraph">
							<div v-for="(item,index) in basedInfo.fpoplAge" class="ageBlock" v-bind:style="{ width: item.rate + '%'}">{{ (item.rate > 5) ? item.ageTxt : ''  }}<br/>{{(item.rate > 5) ? item.rate+'%' : '' }}</div>
						</div>
						<!--//연령별분포 그래프영역 -->
					</div>

					<div class="graph4">
						<span class="subtit">유동성 - 요일별, 시간대별 유동인구 현황</span>
						<!--요일별, 시간대별  그래프영역 -->
						<div class="lindGraphContainer">
							<chart-line :labels="lineChartLabels" :datasets="lineChartDatasets" :options="lineChartOption"></chart-line>
						</div>
						<!--//요일별, 시간대별  그래프영역 -->
					</div>
					<!--//유동성-->



					<!--접근성-->
					<h6>접근성<span>※선택 건물의 교통편의시설 및 배후지영역 내 교통시설</span></h6>
					<table width="1005" border="0" cellspacing="0" cellpadding="0">
					  <tr>
						<th rowspan="2" align="center">건물</th>
						<td height="30" align="center">주차가능 대수</td>
						<td height="30" align="center">{{item.totalparknum}}대</td>
					  </tr>
					  <tr>
						<td height="30" align="center">승강기 대수</td>
						<td height="30" align="center">{{item.liftnum}}대</td>
					  </tr>
					  <tr>
						<th rowspan="2" align="center">배후지 영역</th>
						<td height="30" align="center">지하철역 수</td>
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
import ChartRader from './component/ChartRader.vue';
import ChartLine from './component/ChartLine.vue';
import ApiModel from './model/apiModel.js'
export default {
  name: 'StoreView',
  components:{
		ChartRader,
		ChartLine
  },
  data () {
    return {
      apiModel: new ApiModel(this.$http),
      item : '',
      storeName : this.$route.params.storeName,
			buildIn : [],
			raderChartLabels : ['안전성', '유동성', '수익성', '접근성', '성장성'],
			raderChartDatasets : [],
			raderChartOption : {
				scale: {
					ticks: {
						beginAtZero: true
					}
				}
			},
			lineChartLabels : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
			lineChartDatasets : [],
			lineChartOption : {
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Hour'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: '유동인구'
						}
					}]
				}
			},
			basedInfo: {},
			ageText: ''
    }
	},
	computed: {
		ageIndex : {
			get : function () {
				return ''
			},
			set : function (idx) {
				let text = '10대'
				switch (idx) {
						case 0:
							text = '10대'
							break;
						case 1:
							text = '20대'
							break;
						case 2:
							text = '30대'
							break;
						case 3:
							text = '40대'
							break;
						case 4:
							text = '50대'
							break;
						case 5:
							text = '60대'
							break;
						case 6:
							text = '70대'
							break;
						default:
							text = '10대'
							break;
					}
			this.ageText = text
			return true
			}
		}
	},
  created() {
    this.$EventBus.$emit('HeaderActive', 'store')
    let bdid = this.$route.params.id
    this.getBuildingInfo(bdid)
    this.getBuildingBasedStore(bdid)
	},
  methods: {
    getBuildingInfo(bdMgtSn){
      this.apiModel.getOP408(bdMgtSn).then((result)=>{
        if(result.status === 200){
          let data = result.data.data.rows[0]
          console.log(data)
          data.subDist = Number(data.subDist).toFixed(0)
          data.busDist = Number(data.busDist).toFixed(0)
          data.grossArea = Number(data.grossArea).toFixed(2)
          let useYear = new Date(Number(data.useapprovaldate))
          data.useapprovaldate = useYear.getFullYear()
          this.item = data
          this.getBasedInfo(data.baseXycrd)
					this.getBasedCategory(data.baseXycrd, this.$route.categoryName ,data.bdMgtSn)
        }
      })
    },
    getBasedInfo(basedCode){
      this.apiModel.getOP409(basedCode).then((result)=>{
        if(result.status === 200){
					console.log(result)
					let data = result.data.data.rows[0]
					data.fpoplSex = this.makeNumberArray(data.fpoplSex, 2)
					data.fpoplAge = this.makeBasedAgeArr(data.fpoplAge, 2)
					data.fpoplSun = JSON.parse(data.fpoplSun)
					data.fpoplMon = JSON.parse(data.fpoplMon)
					data.fpoplTue = JSON.parse(data.fpoplTue)
					data.fpoplWed = JSON.parse(data.fpoplWed)
					data.fpoplThu = JSON.parse(data.fpoplThu)
					data.fpoplFri = JSON.parse(data.fpoplFri)
					data.fpoplSat = JSON.parse(data.fpoplSat)
					this.basedInfo = data
					this.basedAge = data.fpoplAge
					this.lineChartDatasets = [{
						label : '일요일',
						borderColor: '#4dc9f6',
						backgroundColor: '#4dc9f6',
						fill: false,
						data: data.fpoplSun
					},
					{
						label : '월요일',
						borderColor: '#f67019',
						backgroundColor: '#f67019',
						fill: false,
						data: data.fpoplMon
					},
					{
						label : '화요일',
						borderColor: '#f53794',
						backgroundColor: '#f53794',
						fill: false,
						data: data.fpoplTue
					},
					{
						label : '수요일',
						borderColor: '#537bc4',
						backgroundColor: '#537bc4',
						fill: false,
						data: data.fpoplWed
					},
					{
						label : '목요일',
						borderColor: '#acc236',
						backgroundColor: '#acc236',
						fill: false,
						data: data.fpoplThu
					},
					{
						label : '금요일',
						borderColor: '#166a8f',
						backgroundColor: '#166a8f',
						fill: false,
						data: data.fpoplFri
					},
					{
						label : '토요일',
						borderColor: '#00a950',
						backgroundColor: '#00a950',
						fill: false,
						data: data.fpoplSat
					}]
        }
      })
    },
    getBuildingBasedStore(val){
      this.apiModel.getOP412(val).then((result)=>{
        if(result.status === 200){
          console.log(result)
          let data = result.data.data.rows
          this.buildIn = data
        }
      })
    },
		getBasedCategory(basedCode, categoryCode, bdid){
			this.apiModel.getOP410(basedCode, categoryCode, bdid).then((result)=>{
				if(result.status === 200){
					console.log(result)
					let data = result.data.data.rows[0]
					let stbiz = Number(data.stbiz)
					let liqdt = Number(data.liqdt)
					let prftb = Number(data.prftb)
					let aces = Number(data.aces)
					let groth = Number(data.groth)
					let stbizAvg = Number(data.stbizAvg)
					let liqdtAvg = Number(data.liqdtAvg)
					let prftbAvg = Number(data.prftbAvg)
					let acesAvg = Number(data.acesAvg)
					let grothAvg = Number(data.grothAvg)
					this.raderChartDatasets = [{
						label: '건물 평가지표',
						backgroundColor: 'rgba(200, 0, 27, 0.25)',
						borderColor: 'rgba(200, 9, 17, 0.45)',
						pointBackgroundColor: 'rgba(200, 9, 17, 0.6)',
						data : [
							stbiz, liqdt, prftb, aces, groth
						]
					},{
						label: '지역 평균',
						backgroundColor: 'rgba(0, 38, 209, 0.2)',
						borderColor: 'rgba(0, 38, 209, 0.4)',
						pointBackgroundColor: 'rgba(35, 48, 209, 0.5)',
						data : [
							stbizAvg, liqdtAvg, prftbAvg, acesAvg, grothAvg
						]
					}]
				}
			})
		},
		/**
		 * 배열내의 스트링을 숫자형 변환 및 
		 * 소수점 자리 지정하여 반올림해서 배열로 반환하는 메소드
		 * @param {Array} arr 데이터 배열
		 * @param {Number} digit 자릿수 지정
     * @returns {Array}
		 */
		makeNumberArray(data, digit=0){
			let tmpArr = []
			data = JSON.parse(data)     
			for (const value of data) {
				tmpArr.push(Number(value).toFixed(digit))
			}
			return tmpArr
		},
		makeBasedAgeArr(data, digit=0){
			let tmpArr = []
			data = JSON.parse(data)
			let age = 10     
			for (const value of data) {
				tmpArr.push({ ageTxt: age+'대', rate: Number(value).toFixed(digit) })
				age = age+10
			}
			return tmpArr
		}
  }
}
</script>
<style>
.binfoWrap {
	  height: 270px;
    line-height: 30px;
    font-size: 15px;
    float: left;
    overflow: auto;
}
.binfoItem {
		border: 0px !important;
    padding: 0 0 0 0 !important;
    width: 100% !important;
    margin-bottom: 0px !important;
}
.binfoItem span:nth-of-type(1) {
		float: left;
    width: 300px;
    font-weight: 400;
    color: #555;
}
.binfoItem span:nth-of-type(2) {
	  float: left;
    font-weight: 300;
    color: #888;
    width: 150px;
}
.RaderGraphContainer {
	width: 499px;
	height: 290px;
	overflow: hidden;
	float: left;
}
.genderGraph {
	width:245px;
	height:85px;
	overflow:hidden;
	font-size: 18px;
	text-align: center;
	line-height: 30px;
	color: aliceblue;
}
.male {
	background-color: #23B4E6;
	float: left;
	overflow: hidden;
	height: 85px;
	padding-top: 10px;
	box-sizing:border-box;
}
.female {
	background-color: #9DCB64;
	float: left;
	overflow: hidden;
	height: 85px;
	padding-top: 10px;
	box-sizing:border-box;
}
.ageGraph {
	width:730px;
	height:85px;
	overflow: hidden;
	font-size: 18px;
	text-align: center;
	line-height: 30px;
	color: aliceblue;
}
.ageBlock {
	float: left;
	overflow: hidden;
	height: 85px;
	padding-top: 10px;
	box-sizing:border-box;
}
.ageBlock:nth-child(0) {
	background-color: #9DCB64;
}
.ageBlock:nth-child(1) {
	background-color: rgba(157, 203, 100, 0.911);
}
.ageBlock:nth-child(2) {
	background-color: rgba(148, 192, 95, 0.911);
}
.ageBlock:nth-child(3) {
	background-color: rgba(133, 172, 85, 0.911);
}
.ageBlock:nth-child(4) {
	background-color: rgba(91, 117, 59, 0.911);
}
.ageBlock:nth-child(5) {
	background-color: rgba(79, 102, 52, 0.911);
}
.ageBlock:nth-child(6) {
	background-color: rgba(52, 68, 33, 0.911);
}
.lindGraphContainer {
	width:1003px;
	height:300px;
	overflow: hidden;
}
</style>

