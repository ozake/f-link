<template>
<!-- 콘텐츠 -->
		<div id="content">		


			<!--건물 상세화면-->
			<div class="building_view">

				<!--매물정보-->
				<h2 style="height:22px">
					<p>매물정보</p> 
				</h2>
				<!--//매물정보-->
				
				<!--건물타이틀-->
				<h3>
					{{item.BUILD_NAME +' '+item.BUILD_KIND}} <span>매물등록일 : {{item.FIRST_REG_DATE}}</span>
					<p class="monthly">
						<span class="icon">월세</span>
						<span class="mtop">보증금 / 월세</span>
						<span class="mbottom">보 {{item.MONTH_DEPOSIT_PRICE}} / 월{{item.MONTH_PRICE}}</span>
					</p>
					<p class="area">
						<span class="icon">면적</span>
						<span class="mtop">계약 / 전용</span>
						<span v-show="meterToggle" class="mbottom">{{item.SUPP_METER}} / {{item.USE_METER}}㎡</span>
						<span v-show="pyeongToggle" class="mbottom">{{item.SUPP_PYEONG}} / {{item.USE_PYEONG}}평</span>
						<span class="change" @click="meterPyeongSwitch"><img src="http://img.mk.co.kr/2018/franchise/icon_area.png" alt="평형변환">평형</span>
					</p>
				</h3>
				<!--//건물타이틀-->

				
				<!--매물정보-->				
				<div class="sinfo">	
				
					<table width="800" border="0" cellspacing="0" cellpadding="0">
						  <tr>
							<th>상가종류</th>
							<td>{{item.BUILD_KIND}}</td>
							<th>보증금/ 월세</th>
							<td>{{item.MONTH_DEPOSIT_PRICE}}/{{item.MONTH_PRICE}}만원</td>
						  </tr>
						  <tr>
							<th>해당층/총층</th>
							<td>{{item.CORRP_FLR}}층/{{item.GROUND_FLR}}층</td>
							<th>권리금</th>
							<td>{{item.PRE_PRICE}}</td>
						  </tr>
						  <tr>
							<th>총주차대수</th>
							<td>{{item.TOTAL_PARK_COUNT}}대</td>
							<th>관리비</th>
							<td>{{item.MONTH_M_PRICE}}원</td>
						  </tr>
						  <tr>
							<th>난방종류</th>
							<td>개별난방</td>
							<th>계약/전용면적</th>
							<td>{{item.SUPP_METER}}/{{item.USE_METER}}㎡</td>
						  </tr>
						  <tr>
							<th>엘리베이터</th>
							<td>{{item.ELV_COUNT}}대</td>
							<th>입주가능일</th>
							<td>{{item.INTO_DAY}}</td>
						  </tr>
						  <tr>
							<th>준공년도</th>
							<td>{{item.BUILD_DAY}}</td>
							<th>추천업종</th>
							<td>{{item.REC_USING}}</td>
						  </tr>
						  <tr>
							<th>매물특징</th>
							<td colspan="3" class="stxt">{{item.MEMUL_AD}} <br />
							  {{item.MEMUL_DESC1}}
							</td>
						  </tr>
					</table>
				</div>
				<!--//매물정보-->

				<!--정보제공-->	
				<div class="s_office">
					<h6>정보제공</h6>
					<img :src="item.PROFILE_IMAGE" />
					<p class="tit"><img src="http://img.mk.co.kr/2018/franchise/icon_office.jpg" :alt="item.SANGHO_NAME">{{item.SANGHO_NAME}}</p>
					<dl>
						<dt>대표</dt>
					    <dd>{{item.PRESENT_NAME}}</dd>				
						<dt>전화</dt>
						<dd>{{item.TEL_NO}}<br>{{item.CHARGE_MOBILE}}</dd>				
					</dl>
				</div>
				<!--//정보제공-->	

        <!--매물사진-->
        <img-slide-viewer :img="item.IMG_URL"></img-slide-viewer>
				<!--//매물사진-->

				<!--지도영역-->
				<div class="map" id="map">
					<!-- <img src="http://img.mk.co.kr/2018/franchise/building_map.jpg" alt="건물지도 임시이미지"> -->

					<!--건물위치 아이콘-->
					<div class="icon_bu" style="position:absolute;left:400px;top:200px">
                         <!-- <img src="http://img.mk.co.kr/2018/franchise/icon_bu.png" alt="건물지도 임시이미지"> -->
					</div>
					<!--//건물위치 아이콘-->
				</div>
				<!--//지도영역-->


				
			</div>
			<!--//건물 상세화면-->	
		</div>
		<!-- //콘텐츠 -->

</template>
<script>
import ImgSlideViewer from './component/imgSlideViewer.vue'
import ApiModel from './model/apiModel.js'
export default {
  name: 'SalesView',
  components:{
    ImgSlideViewer
  },
	data() {
		return {
			apiModel: new ApiModel(this.$http),
			item: '',
			mapInstance: '',
			pyeongToggle: false,
			meterToggle: true
		}
	},
  created(){
			this.$EventBus.$emit('HeaderActive', 'store')
			this.getSalesView(this.$route.params.id)
	},
	mounted() {
		this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.

      console.log("지도 셋팅 시작")
      let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(37.56611900511385, 126.97774128459538), //지도의 중심좌표.
        level: 2 //지도의 레벨(확대, 축소 정도)
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
			map.setMaxLevel(6);
      console.log("지도 셋팅 완료")
      //console.log(this.displayItem.address)

      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      //this.mapEventListener(map,geocoder)
      this.mapInstance = map
      //this.geocorderInstance = geocoder
      console.log("마운티드 종료")
      //this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)

    })
	},
	methods: {
		getSalesView(code){
			this.apiModel.getSalesView(code).then((result)=>{
				if(result.status === 200)
				{
					console.log(result)
					let data = result.data
					data = data[0]
					let tmpDate = data.FIRST_REG_DATE
					data.FIRST_REG_DATE = tmpDate.substring(0,10)
					let img = data.IMG_URL
					let tmparr = []
					//console.log(data.IMG_URL)
					if(img === ''){
								img = "/src/assets/fc_noimg_166166.jpg"
								tmparr.push(img)
								data.IMG_URL = tmparr
          }else{
						img = img.split( ',' )		
						for (const value of img) {
							let str = value.replace("http://image.bizmk.kr", "")
							let res = str.search("http://image.bizmk.kr")
							if(res === -1){
								str = 'http://image.bizmk.kr'+str
							}
						tmparr.push(str)
					}
					data.IMG_URL = tmparr
					}
					let pimg = data.PROFILE_IMAGE
					if(pimg === ''){
						pimg = pimg = "/src/assets/fc_noimg_253128.jpg"
						data.PROFILE_IMAGE = pimg
					}
					data.SUPP_PYEONG = this.calPyeong(data.SUPP_METER)
					data.USE_PYEONG = this.calPyeong(data.USE_METER)
					this.item = data
					this.setMaker(data.YPOS, data.XPOS, data)
				}
			})
		},
		setMaker(x,y,value){
      //let tmparr = []
			//tmparr = convertGeo([x,y])
			let coords = new daum.maps.LatLng(x, y)
      let marker = new daum.maps.Marker({
          map: this.mapInstance, // 마커를 표시할 지도
          position: coords, // 마커를 표시할 위치
          title : value.BUILD_NAME +' '+value.BUILD_KIND, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
			})
			this.mapInstance.setCenter(coords)
    },
		calPyeong(val){
			let meter = Number(val)
			let pyeong = meter * 0.3025
			return pyeong.toFixed(2)
		},
		meterPyeongSwitch(){
			if(this.meterToggle){
				this.meterToggle = false
				this.pyeongToggle = true
			}else if(this.pyeongToggle){
				this.meterToggle = true
				this.pyeongToggle = false
			}
		}
	}
}
</script>
<style>
.icon {
  vertical-align: 10px;
}
</style>

