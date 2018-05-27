<template>
<!-- 콘텐츠 -->
		<div id="content">		


			<!--건물 상세화면-->
			<div class="building_view">

				<!--매물정보-->
				<h2>
					<p>매물정보</p> 서울시 용산구 용산동  
				</h2>
				<!--//매물정보-->
				
				<!--건물타이틀-->
				<h3>
					{{item.BUILD_NAME}} <span>매물등록일 : {{item.FIRST_REG_DATE}}</span>
					<p class="monthly">
						<span class="icon">월세</span>
						<span class="mtop">보증금 / 월세</span>
						<span class="mbottom">보 {{item.MONTH_DEPOSIT_PRICE}} / 월{{item.MONTH_PRICE}}</span>
					</p>
					<p class="area">
						<span class="icon">면적</span>
						<span class="mtop">계약 / 전용</span>
						<span class="mbottom">{{item.SUPP_METER}} / {{item.USE_METER}}㎡</span>
						<span class="change"><img src="http://img.mk.co.kr/2018/franchise/icon_area.png" alt="평형변환">평형</span>
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
					<img src="http://img.mk.co.kr/2018/franchise/office.png" alt="개포석영공인중개사사무소">
					<p class="tit"><img src="http://img.mk.co.kr/2018/franchise/icon_office.jpg" alt="개포석영공인중개사사무소">{{item.SANGHO_NAME}}</p>
					<dl>
						<dt>대표</dt>
					    <dd>{{item.CHARGE_NAME}}</dd>				
						<dt>전화</dt>
						<dd>{{item.CHARGE_PHONE}}<br>{{item.CHARGE_MOBILE}}</dd>				
					</dl>
				</div>
				<!--//정보제공-->	

        <!--매물사진-->
        <img-slide-viewer></img-slide-viewer>
				<!--//매물사진-->

				<!--지도영역-->
				<div class="map">
					<img src="http://img.mk.co.kr/2018/franchise/building_map.jpg" alt="건물지도 임시이미지">

					<!--건물위치 아이콘-->
					<div class="icon_bu" style="position:absolute;left:400px;top:200px">
                         <img src="http://img.mk.co.kr/2018/franchise/icon_bu.png" alt="건물지도 임시이미지">
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
			item: ''
		}
	},
  created(){
			this.$EventBus.$emit('HeaderActive', 'store')
			this.getSalesView(this.$route.params.id)
	},
	methods: {
		getSalesView(code){
			this.apiModel.getSalesView(code).then((result)=>{
				if(result.status === 200){
					let data = result.data
					data = data[0]
					let tmpDate = data.FIRST_REG_DATE
					data.FIRST_REG_DATE = tmpDate.substring(0,10)
					this.item = data
				}
			})
		}
	}
}
</script>
<style>
.icon {
  vertical-align: 10px;
}
</style>

