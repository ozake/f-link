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
				<div class="map" id="map">
					<!-- <img src="http://img.mk.co.kr/2018/franchise/building_map.jpg" alt="건물지도 임시이미지"> -->

					<!--건물위치 아이콘-->
					<!-- <div class="icon_bu" style="position:absolute;left:400px;top:200px">
                         <img src="http://img.mk.co.kr/2018/franchise/icon_bu.png" alt="건물지도 임시이미지">
					</div> -->
					<!--//건물위치 아이콘-->

					<!--배후지 설명-->
					<!-- <div class="areainfo" style="position:absolute;left:550px;top:220px">
					    <b>배후지 영역이란?</b>
						해당 건물 기준  인구수, 이동거리,이동방향을 고려해<br> 창업에 영향을 미치는 상권영역
					</div> -->
					<!--//배후지 설명-->


					<!--유동인구 유입경로-->
					<ul style="z-index:1000">
						<li class="leftinfo">유동인구<br> 유입경로</li>
						<li class="rightinfo">이 영역에서 유동인구가 가장 높게 유입되는 방향은 ‘{{basedMaster.direction}}’이며, 도보한계치는 최대 {{basedMaster.distM}}m까지 입니다.
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
							<dd>지하{{item.undFloor}}층~지상{{item.groFloor}}층</dd>
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
						<li><b>성장성</b>{{sectorName}} 업종의 전(12개월 전)년 대비 매출 성장률을 지수로 나타냅니다. </li>
						<li><b>안정성</b>{{sectorName}} 업종을 창업 시 얼마나 오래 유지할 수 있는지를 지수화 했습니다.</li>
						<li><b>유동성</b>건물의 배후지영역의 잠재 고객수를 지수화 했습니다.</li>
						<li><b>수익성</b>{{sectorName}} 업종 창업 시 객단가를 지역 평균과 비교해 제시합니다.</li>
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
						<td height="30" align="center">{{ basedInfo.subCnt}}개</td>
					  </tr>
					  <tr>
						<td height="30" align="center">버스정류장 수</td>
						<td height="30" align="center">{{basedInfo.busCnt}}개</td>
					  </tr>
					</table>
					<!--//접근성-->


					<!--성장성-->
					<h6>성장성<span>※ 건물 주변 배후지영역 내 {{sectorName}} 업종 매출 추이</span></h6>
					<div class="graph4">
						<span class="subtit">전년도 연간 매출 변동 추이</span>
						<!--그래프영역 -->

						<div class="lindGraphContainer">
							<chart-line :labels="salesChartLabels" :datasets="salesChartDatasets" :options="salesChartOption"></chart-line>
						      <!--그래프 없을경우 -->
						      <!-- <p class="nograph">해당업종 정보가 5건 이하로 그래프를 제공하지 않습니다.</p> -->
							  <!--//그래프 없을경우 -->
						</div>
						<!--//그래프영역 -->
					</div>

					<!--//성장성-->



					<!--안정성-->
					<h6>안정성</h6>
					<div class="graph5">
						<span class="subtit">배후지 영역 내 {{sectorName}}업종 평균 영업기간 </span>
						<!--한식업종 평균 영업기간  -->
						<div style="width:490px;height:200px;">
							<chart-bar :labels="averageChartLabels" :datasets="averageChartDatasets" :options="averageChartOption"></chart-bar>
							<!--그래프 없을경우 -->
						      <!-- <p class="nograph">해당업종 정보가 5건 이하로 <br>그래프를 제공하지 않습니다.</p> -->
							  <!--//그래프 없을경우 -->
						</div>
						<!--//한식업종 평균 영업기간  -->
					</div>

					<div class="graph6">
						<span class="subtit">배후지 영역 내 {{sectorName}}업종 사업체 수({{catStoreListNum}}개)</span>
						<!--배후지 영역 내 사업체 수 -->
							<div style="width:490px;height:200px;background-color:#f6f6f6;border:1px solid #dcdcdc">
								<ul>
									<li v-for="item in catStoreList">
										<span>{{item.refNm + ' ' + item.refBnm}}</span>
										<span>{{item.addr}}</span>
									</li>
								</ul>
							</div>

						<!-- <div style="width:490px;height:200px;background-color:#f6f6f6;border:1px solid #dcdcdc">
							<dl>
								<dt v-for="item in catStoreList">{{item.refNm + ' ' + item.refBnm}}</dt>
							</dl>
						</div> -->
						<!--//배후지 영역 내 사업체 수 -->
					</div>
					<!--//안정성-->



					<!--수익성  -->
					<!-- <h6>수익성<span>※{{sectorName}} 업종의 지역 객단가 비교</span></h6>
					<div class="graph7">
					{{sectorName}} 업종의 선택 지역 객단가(결제 1건당 매출액)는 지역 평균값 0,000원과 비슷한 수준입니다.  (업종 특성 상 메뉴, 영업형태 등 요소에 의해 객단가 평가에 차이가 발생할 수 있습니다.)
					</div> -->



					</div>

				</div>
				<!--//건물 평가지표 -->

			</div>
			<!--//건물 상세화면-->

</template>
<script>
import ChartRader from './component/ChartRader.vue';
import ChartLine from './component/ChartLine.vue';
import ChartBar from './component/ChartBar.vue';
import ApiModel from './model/apiModel.js'
import DataPaser from "./model/dataPaser.js"
import { convertGeo } from "./model/util.js"
import { Base64 } from 'js-base64'
export default {
  name: 'StoreView',
  components:{
		ChartRader,
		ChartLine,
		ChartBar
  },
  data () {
    return {
      apiModel: new ApiModel(this.$http),
      item : '',
      storeName : Base64.decode(this.$route.params.storeName),
			buildIn : [],
			basedMaster : {},
			mapInstance : '',
      		geocorderInstance : '',
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
							labelString: '유동인구(명)'
						}
					}]
				}
			},
			salesChartLabels : ['12','1',	'2', '3', '4', '5', '6', '7',	'8', '9',	'10',	'11',	'12'],
			salesChartDatasets : [],
			salesChartOption : {
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
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: '매출(만원)'
						}
					}]
				}
			},
			averageChartLabels: [],
			averageChartDatasets : [],
			averageChartOption : {
				responsive: true,
				legend: {
					position: 'top'
				},
				scales: {
					ticks: {
						beginAtZero: true
					},
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: '영업기간(년도)'
						}
					}]
				}
			},
			basedInfo: {},
      ageText: '',
			catStoreList: [],
			catStoreListNum: 0,
			sectorName: ''
    }
	},
	/* computed: {
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
	}, */
  created() {
    this.$EventBus.$emit('HeaderActive', 'store')
    let bdid = this.$route.params.id
    this.getBuildingInfo(bdid)
		this.getBuildingBasedStore(bdid)
		this.$http.get('../../../src/assets/sectorMcode.json').then((result)=>{
			if(result.status === 200){
				for (const value of result.data.sectorM) {
					if(value.code === this.$route.params.categoryCode){
						this.sectorName = value.categoryName
					}
				}
			}
		})
	},
	mounted() {
    	this.$nextTick(function () {
      	// 모든 화면이 렌더링된 후 실행합니다.
			console.log("지도 셋팅 시작")
			let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
			let options = { //지도를 생성할 때 필요한 기본 옵션
				center: new daum.maps.LatLng(37.56611900511385, 126.97774128459538), //지도의 중심좌표.
				level: 3 //지도의 레벨(확대, 축소 정도)
			};

			let map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
			// 주소-좌표 변환 객체를 생성합니다
			let geocoder = new daum.maps.services.Geocoder();

			// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
			let mapTypeControl = new daum.maps.MapTypeControl();

			// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
			// daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
			map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			let zoomControl = new daum.maps.ZoomControl();
			map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
			console.log("지도 셋팅 완료")
			//console.log(this.displayItem.address)

			// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
			//this.mapEventListener(map,geocoder)
			this.mapInstance = map
			this.geocorderInstance = geocoder

			console.log("마운티드 종료")
		})
	},
  methods: {
    getBuildingInfo(bdMgtSn){
      this.apiModel.getOP408(bdMgtSn).then((result)=>{
        if(result.status === 200){
					let data = result.data.data.rows[0]
					console.log('건물정보')
          console.log(data)
          data.subDist = Number(data.subDist).toFixed(0)
          data.busDist = Number(data.busDist).toFixed(0)
          data.grossArea = Number(data.grossArea).toFixed(2)
          let useYear = new Date(Number(data.useapprovaldate))
					data.useapprovaldate = useYear.getFullYear()
					let xAxis = Number(data.xAxis)
					let yAxis = Number(data.yAxis)
					this.setMaker(xAxis,yAxis,data.storeName)

          this.item = data
          this.getBasedInfo(data.baseXycrd)
		      this.getBasedCategory(data.baseXycrd, this.$route.params.categoryCode ,data.bdMgtSn)
		      this.getBasedMaster(data.bdMgtSn, data.baseXycrd)
					this.getStoreListbyCte(data.baseXycrd, this.$route.params.categoryCode)
					
        }
      })
    },
    getBasedInfo(basedCode){
      this.apiModel.getOP409(basedCode).then((result)=>{
        if(result.status === 200){
					console.log(result)
					let data = result.data.data.rows[0]
					data.fpoplSex = this.makeNumberArray(data.fpoplSex, 2)
					data.fpoplAge = this.makeBasedAgeArr(data.fpoplAge, 0)
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
          //console.log(result)
          let data = result.data.data.rows
          let tmpArr = []
          for (const value of data) {
						let tel = value.tel
						tel = tel.slice(2)
            tel = this.phoneFomatter(tel)
            /* if(tel.slice(1,2) === '0'){
              tel = tel.slice(1)
            } */
            value.tel = tel
            tmpArr.push(value)
          }
          this.buildIn = tmpArr
        }
      })
    },
		getBasedCategory(basedCode, categoryCode, bdid){
			this.apiModel.getOP410(basedCode, categoryCode, bdid).then((result)=>{
				if(result.status === 200){
					console.log("410")
					console.log(result)
					let data = result.data.data.rows[0]
					let stbiz = this.reverseData(Number(data.stbiz))
					let liqdt = this.reverseData(Number(data.liqdt))
					let prftb = this.reverseData(Number(data.prftb))
					let aces = this.reverseData(Number(data.aces))
					let groth = this.reverseData(Number(data.groth))
					let stbizAvg = this.reverseData(Number(data.stbizAvg))
					let liqdtAvg = this.reverseData(Number(data.liqdtAvg))
					let prftbAvg = this.reverseData(Number(data.prftbAvg))
					let acesAvg = this.reverseData(Number(data.acesAvg))
					let grothAvg = this.reverseData(Number(data.grothAvg))
					let tpindSlngPanal = JSON.parse(data.tpindSlngPanal)
					let tpindSlngPanalAvg = JSON.parse(data.tpindSlngPanalAvg)
					let mktPerd = Number(data.mktPerd)
					let mktPerdAvg = Number(data.mktPerdAvg)
					this.salesChartDatasets = [
						{
							label : '배후지',
							borderColor: '#f53794',
							backgroundColor: '#f53794',
							fill: false,
							data: tpindSlngPanal
						}
						/* {
							label : '지역평균',
							borderColor: '#4dc9f6',
							backgroundColor: '#4dc9f6',
							fill: false,
							data: tpindSlngPanalAvg
						}, */
					]
					this.averageChartDatasets = [
						{
							label : '배후지',
							borderColor: '#f53794',
							backgroundColor: 'rgba(245, 55, 148, 0.6)',
							borderWidth: 1,
							data: [mktPerd]
						},
						{
							label : '지역평균',
							borderColor: '#4dc9f6',
							backgroundColor: 'rgba(77, 201, 246, 0.6)',
							borderWidth: 1,
							data: [mktPerdAvg]
						}
					]
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
    reverseData(num){
      switch (num) {
        case 10:
          num = 1;
          break;
        case 9:
          num = 2;
          break;
        case 8:
          num = 3;
          break;
        case 7:
          num = 4;
          break;
         case 6:
          num = 5;
          break;
        case 5:
          num = 6;
          break;
        case 4:
          num = 7;
          break;
        case 3:
          num = 8;
          break;
        case 2:
          num = 9;
          break;
        case 1:
          num = 10;
          break;
        default:
          break;
      }
      return num
    },
    getStoreListbyCte(basedCode, categoryCode){
      this.apiModel.getOP411(basedCode, categoryCode).then((result)=>{
        if(result.status === 200){
					console.log('411')
					//console.log(result.data)
					let data = result.data.data.rows
					this.catStoreListNum = data.length
					for (const value of data) {
						
					}
          this.catStoreList = data
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
		},
		mapEventListener(map,geocoder){
      daum.maps.event.addListener(map, 'dragend', () => {
          this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)
      })
    },
    searchAddrFromCoords(geocoder,coords,callback){
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
    },
    displayCenterInfo(result, status) {
      let addrText = '';
        if (status === daum.maps.services.Status.OK) {

            for(let i = 0; i < result.length; i++) {
                // 법정동의 region_type 값은 'B' 이므로
                if (result[i].region_type === 'B') {
                    addrText = result[i].address_name
                    let code = result[i].code
                    code = code.substring(0,8)
                    if(this.centerCode !== code){
                      this.centerCode = code
                      //console.log(code)
                      /* this.getStoreList(this.$route.params.id, code).then((result)=>{

                        let tmparr = []
                        let x = null
                        let y = null
                        for (const value of result.rows) {
                          x = Number(value.xAxis)
                          y = Number(value.yAxis)
                          let position = []
                          position = convertGeo([x,y])
                          value.position = position
                          tmparr.push(value)
                        }
                        this.storeList = tmparr
                        this.makeMakers(result.rows)

                      }) */
                    }
                    //this.setAddr(addrText+"/ 법정동코드: "+code)

                    break;
                }
            }
        }
    },
    makeMakers(rows){
      let x = null
      let y = null
      this.makersClean()
      for (const value of rows) {
        //console.log(value)
        x = Number(value.xAxis)
        y = Number(value.yAxis)
        let marker = null
        marker = this.setMaker(x,y,value)
        this.queue.setQueue(marker)
      }

    },
    setMaker(x,y,value){
			let icon = new daum.maps.MarkerImage(
                'http://img.mk.co.kr/2018/franchise/icon_loca02.png',
                new daum.maps.Size(20, 30),
                {
                  offset: new daum.maps.Point(15, 30),
                  alt: value,
                  shape: "rect",
                  coords: "0,0,20,30"
                })
      let tmparr = []
      tmparr = convertGeo([x,y])
      let marker = new daum.maps.Marker({
          map: this.mapInstance, // 마커를 표시할 지도
					position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
					image: icon,
          title : value, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      })
      return marker
    },
    makersClean(){
      let tmp = undefined
      let length = this.queue.getQueueLength()
      if(length !== 0){
        for(let i=0; i<length; i++){
          tmp = this.queue.getQueue()
          if(typeof tmp === 'undefined'){
            break;
          }
          tmp.setMap(null)
        }
      }

    },
	getBasedMaster(buildid, basedId){
		this.apiModel.getOP413(buildid,basedId).then((result)=>{
			if(result.status === 200){
				console.log('배후지마스터')

				console.log(result.data)
				let data = result.data.data.rows[0]
				//console.log(data)
				let direction = data.direction
				data.direction = this.changeDirectionName(direction)
				/* let geomJson = data.geomJson
				geomJson = JSON.parse(geomJson)
				console.log(geomJson) */
				this.basedMaster = data
				let parser = new DataPaser(data)
				let geoArr = parser.landGeocodeArr()
				let centerArr = parser.landCentercode()
				this.setPolygon(geoArr)
				this.setCenterMap(centerArr[1],centerArr[0])
			}
		})
	},
	/**
     * setPolygon - 배후지영역을 지도에 다각형으로 그린다
     *
     * @param  {Array} data 배후지좌표 배열을 파람으로 전달
     * @return {void}
     */
    setPolygon(data){
      let pathArr = []
      for(let value of data){
        pathArr.push(new daum.maps.LatLng(value[1],value[0]))
      }

      let polygon = new daum.maps.Polygon({
        map: this.mapInstance,
        path: pathArr,
        strokeWeight: 2,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8,
        strokeStyle: 'dashed',
        fillColor: '#61D5B4',
        fillOpacity: 0.6
      })

			polygon.setMap(this.mapInstance)

			let customOverlay = new daum.maps.CustomOverlay({})
			customOverlay.setZIndex(1000)
			
			daum.maps.event.addListener(polygon, 'mouseover', (mouseEvent) => {
        polygon.setOptions({fillColor: '#8EF5CD'});

        customOverlay.setContent(`<div class="areainfo">
					    <b>배후지 영역이란?</b>
						해당 건물 기준  인구수, 이동거리,이동방향을 고려해<br> 창업에 영향을 미치는 상권영역	
					</div>`);
        
        customOverlay.setPosition(mouseEvent.latLng); 
        customOverlay.setMap(this.mapInstance);
			});

			// 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다 
			daum.maps.event.addListener(polygon, 'mousemove', (mouseEvent) => {
					
					customOverlay.setPosition(mouseEvent.latLng); 
			});

			// 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
			// 커스텀 오버레이를 지도에서 제거합니다 
			daum.maps.event.addListener(polygon, 'mouseout', ()=> {
					polygon.setOptions({fillColor: '#61D5B4'});
					customOverlay.setMap(null);
			});

	},
	setCenterMap(x,y){
      this.mapInstance.setCenter(new daum.maps.LatLng(x, y))
    },
    phoneFomatter(num, type) {
      let formatNum = "";

      if (num.length == 11) {
        if (type == 0) {
          formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
        } else {
          formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        }
      } else if (num.length == 8) {
        formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
      } else {
        if (num.indexOf("02") == 0) {
          if (type == 0) {
            formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
          } else {
            formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
          }
        } else {
          if (type == 0) {
            formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
          } else {
            formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
          }
        }
      }
      return formatNum;
		},
		changeDirectionName(data){
			let res = ''
			switch (data) {
				case "E":
					res = "동쪽"
					break;
				case "W":
					res = "서쪽"
					break;
				case "S":
					res = "남쪽"
					break;
				case "N":
					res = "동쪽"
					break;
			
				default:
					break;
			}
			return res
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
.building_view .graph6 ul{
  width:450px;
  height:180px;
  line-height:30px;
  font-size:14px;
  float:left;
  overflow:auto;
  margin:10px 20px
}

.building_view .graph6 ul li{
  overflow: hidden;
}
.building_view .graph6 ul li span:nth-of-type(1) {
  float:left;
  width:160px;
  font-weight:500;
  color:#555;
  margin-right:10px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal !important;
}
.building_view .graph6 ul li span:nth-of-type(2) {
  float:left;
  font-weight:300;
  color:#888;
  width:280px;
  font-size:14px;
  letter-spacing:-1px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal !important;
}
</style>

