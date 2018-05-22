<template>
  <div id="content">
    <SubHeaderSelect :isIe="isIe"></SubHeaderSelect>
    <!--프랜차이즈 현황 뷰-->
    <div class="frlist">

      <div class="frview">

        <!--프랜차이즈 기본정보-->
        <div class="frinfo">
          <h3>{{this.displayItem.brand}}</h3>
          <div class="frimg">
            <img v-bind:src="displayItem.img3" />
            <button class="btn_tel">전화 상담 ({{this.displayItem.tel}})</button>
          </div>

          <dl>
            <dt>회사명</dt>
            <dd>{{this.displayItem.company}}</dd>
            <dt>대표자</dt>
            <dd>{{this.displayItem.ceo}}</dd>
            <dt>창업 비용</dt>
            <dd>{{this.displayItem.total}}천원 ({{this.displayItem.storearea}}평)</dd>
            <dt>평당 평균 매출액</dt>
            <dd>{{displayItem.sicost}}천원</dd>
            <dt>홈페이지 </dt>
            <dd>{{this.displayItem.url}}</dd>
            <p>※ 본 서비스는 공정거래위원회 ‘가맹사업거래 정보공개서’에 기초한 정보입니다.</p>
          </dl>

        </div>
        <!--//프랜차이즈 기본정보-->


        <!--가맹 창업 조건-->
        <div class="frinfo1">
          <h5>가맹 창업 조건<span>점포 관련 비용(임대료, 권리금 등)은 제외한 금액입니다. </span></h5>

          <table width="387" border="0" cellpadding="0" cellspacing="0">
              <caption>가맹 창업 조건</caption>
              <tr class="row1">
              <th>가맹 계약 기간</th>
              <td>최초 {{this.displayItem.initial}}년 / 연장 {{this.displayItem.extended}}년</td>
              </tr>
              <tr class="row2">
              <th>예상창업비용</th>
              <td>{{this.displayItem.total}}천원</td>
              </tr>
              <tr class="row3">
              <th>가맹비</th>
              <td>{{this.displayItem.membership}}천원</td>
              </tr>
              <tr class="row3">
              <th>교육비</th>
              <td>{{this.displayItem.educost}}천원</td>
              </tr>
              <tr class="row3">
              <th>보증금</th>
              <td>{{this.displayItem.deposit}}천원</td>
              </tr>
              <tr class="row3">
              <th>기타비용</th>
              <td>{{this.displayItem.othercost}}천원</td>
              </tr>
          </table>

          <table width="387" border="0" cellpadding="0" cellspacing="0">
              <caption>가맹 창업 조건</caption>
              <tr class="row1">
              <th>계약갱신 비용</th>
              <td>3000만원</td>
              </tr>
              <tr class="row2">
              <th>인테리어 비용 </th>
              <td>{{this.displayItem.interiorcost}}천원</td>
              </tr>
              <tr class="row3">
              <th>평당 비용</th>
              <td>{{this.displayItem.sicost}}천원</td>
              </tr>
              <tr class="row3">
              <th>기준 면적 </th>
              <td>{{this.displayItem.storearea}}평</td>
              </tr>
          </table>


        </div>


      <!--//가맹 창업 조건-->

      <!--가맹 사업 규모-->
        <div class="frinfo2">
          <h5>가맹 사업 규모</h5>

          <!--가맹점수-->
          <table width="805"  border="0" cellpadding="0" cellspacing="0" class="infotable1">
            <caption>가맹점수</caption>

            <colgroup>
              <col width="200">
              <col width="121">
              <col width="121">
              <col width="121">
              <col width="121">
              <col width="121">
            </colgroup>

            <tr>
              <td rowspan="3">가맹점 수</td>
              <th>연도 </th>
              <th>신규개점 </th>
              <th>계약종료 </th>
              <th>계약해지 </th>
              <th>명의변경</th>
            </tr>

            <tr v-for="ydata in yearData">
              <td>{{ydata.year}} </td>
              <td>{{ydata.rcount}} </td>
              <td>{{ydata.ecount}}</td>
              <td>{{ydata.ccount}}</td>
              <td>{{ydata.mcount}}</td>
            </tr>

          </table>

          <!--폐점률-->
          <table width="805"  border="0" cellpadding="0" cellspacing="0" class="infotable1">
             <caption>폐점률</caption>

             <colgroup>
                              <col width="200">
                <col width="151">
                <col width="151">
              <col width="151">
              <col width="151">
                           </colgroup>

             <tr>
              <td rowspan="3">폐점률</td>
              <th>연도 </th>
              <th>총 매장 수</th>
              <th>폐업 매장 수</th>
              <th>폐업률</th>
             </tr>

            <tr v-for="ydata in yearData">
              <td>{{ydata.year}} </td>
              <td>{{ydata.totalStore}} </td>
              <td>{{ydata.closerStore}}</td>
              <td>{{ydata.closerRate}}</td>
            </tr>

          </table>

          <!--임직원-->
          <table width="805"  border="0" cellpadding="0" cellspacing="0" class="infotable1">
             <caption>임직원</caption>

             <colgroup>
                              <col width="200">
                <col width="200">
                <col width="200">
              <col width="205">
                           </colgroup>

             <tr>
              <td>임직원수</td>
              <th>{{this.displayItem.executives}} /{{this.displayItem.employee}}</th>
              <td>브랜드수</td>
              <th>3</th>
             </tr>


          </table>

        </div>
      <!--//가맹 사업 규모-->


      <!--지점안내-->
      <div class="frinfo2">
        <h5>지점 안내</h5>
        <div class="mapinfo">

          <!--분류별검색-->
          <div class="select">

            <span>지역선택</span>

            <!--대분류-->
            <div class="selectbox">
              <div><a href="#" class="box_tit">서울시</a></div>
              <ul class="box_list" style="display:none">
                <li><a href="#">서울시</a></li>
                <li><a href="#">서울시</a></li>
                <li><a href="#">서울시</a></li>
              </ul>
            </div>
            <!--//대분류-->

            <!--중분류-->
            <div class="selectbox">
              <div><a href="#" class="box_tit">중구</a></div>
              <ul class="box_list" style="display:none">
                <li><a href="#">중구</a></li>
                <li><a href="#">중구</a></li>
                <li><a href="#">중구</a></li>
              </ul>
            </div>
            <!--//중분류-->

            <!--브랜드-->
            <div class="selectbox">
              <div><a href="#" class="box_tit">세종대로</a></div>
              <ul class="box_list" style="display:none">
                <li><a href="#">세종대로</a></li>
                <li><a href="#">세종대로</a></li>
                <li><a href="#">세종대로</a></li>
              </ul>
            </div>
            <!--//브랜드-->

            <!--창업 자금  -->
            <div class="selectbox">
              <div><a href="#" class="box_tit">세종지점</a></div>
              <ul class="box_list" style="display:none">
                <li><a href="#">세종지점</a></li>
                <li><a href="#">세종지점</a></li>
                <li><a href="#">세종지점</a></li>
                <li><a href="#">세종지점</a></li>
                <li><a href="#">세종지점</a></li>
                <li><a href="#">세종지점</a></li>
                <li><a href="#">세종지점</a></li>
              </ul>
            </div>
            <!--//창업 자금  -->


          </div>
          <!--//분류별검색-->



          <!--지점검색-->
          <div class="map">

            <!--지점리스트-->
            <div class="branch_list">
              <ul>
                <li v-for="(store,idx) in storeList">
                  <span>{{idx+1}}</span>
                  <p class="branch_name">{{store.refBnm}}</p>
                  <p>{{store.addr}}</p>
                  <p class="branch_info">{{store.tel}}</p>
                  <p class="branch_info">영업 개시일 : {{store.firstDate}}</p>
                </li>
                <!--
                <li>
                  <span>2</span>
                  <p class="branch_name">매경피자 1호점</p>
                  <p>서울특별시 중구 퇴계로 212 대한극장 1,2층 지번 </p>
                  <p class="branch_info">02-2000-5450</p>
                  <p class="branch_info">영업 개시일 : 2015.01</p>
                </li>

                <li>
                  <span>10</span>
                  <p class="branch_name">매경피자 1호점</p>
                  <p>서울특별시 중구 퇴계로 212 대한극장 1,2층 지번 </p>
                  <p class="branch_info">02-2000-5450</p>
                  <p class="branch_info">영업 개시일 : 2015.01</p>
                </li>

                <li>
                  <span>10</span>
                  <p class="branch_name">매경피자 1호점</p>
                  <p>서울특별시 중구 퇴계로 212 대한극장 1,2층 지번 </p>
                  <p class="branch_info">02-2000-5450</p>
                  <p class="branch_info">영업 개시일 : 2015.01</p>
                </li>

                <li>
                  <span>10</span>
                  <p class="branch_name">매경피자 1호점</p>
                  <p>서울특별시 중구 퇴계로 212 대한극장 1,2층 지번 </p>
                  <p class="branch_info">02-2000-5450</p>
                  <p class="branch_info">영업 개시일 : 2015.01</p>
                </li> -->
              </ul>

            </div>
            <!--//지점리스트-->

            <!--지도영역-->
            <div class="branch_map" id="branch_map" style="overflow:hidden; height: 462px;"></div>
            <!--//지도영역-->




          </div>
          <!--//지점검색-->
        </div>
      </div>
      <!--//지점안내-->
      </div>
      <RightSales :estateList="estateList"></RightSales>

    </div>


  </div>
</template>
<style scoped>

</style>
<script>
import SubHeaderSelect from "./component/SubHeaderSelect.vue"
import RightSales from "./component/RightSales.vue"
import ApiModel from "./model/apiModel.js"
import { convertGeo } from "./model/util.js"
import { Queue } from './model/colections';
export default {
  name: 'FranchiseView',
  components:{
    SubHeaderSelect,
    RightSales
  },
  data(){
    return {
      isIe:false,
      displayItem : {},
      yearData : [],
      apiModel : new ApiModel(this.$http),
      centerCode : '',
      storeList : [],
      mapInstance : '',
      geocorderInstance : '',
      queue : new Queue(),
      estateList : []
    }
  },
  computed: {
    closureRate : function (){

    }
  },
  props:{
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'franchise')
    //this.listItems = this.makeArrayModuler(this.items,5)
    const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
      this.isIe = true
    }
    let ap1 = this.getFranchiseView(this.$route.params.id)
    let ap2 = this.getFranchiseYearData(this.$route.params.id)
    Promise.all([ap1,ap2]).then((result)=>{
      //console.log(result)
      let data1 = result[0]
      let data2 = result[1]
      let tmpArray = []
      console.log(data1[0])
      this.displayItem = data1[0]
      for (let v of data2) {
        let totalStore = Number(v.fcount) + Number(v.rcount)
        totalStore = Number(totalStore)
        let closerStore = Number(v.ecount) + Number(v.ccount)
        closerStore = Number(closerStore)
        let closerRate = (closerStore/totalStore) * 100
        closerRate = closerRate.toFixed(1)
        v.totalStore = totalStore
        v.closerStore = closerStore
        v.closerRate = closerRate
        tmpArray.push(v)
      }
      this.yearData = tmpArray

      this.addressTogeocode(data1[0].address).then((coords)=>{
        console.log(coords)
        //this.setMapCenter(coords)
      })
    })

    /* this.getFranchiseView(this.$route.params.id).then((result)=>{
      console.log(result[0])
      this.displayItem = result[0]
    }) */

  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    '$route': 'fetchData'
  },
  mounted() {
    this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.

      console.log("지도 셋팅 시작")
      let container = document.getElementById('branch_map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(37.56611900511385, 126.97774128459538), //지도의 중심좌표.
        level: 5 //지도의 레벨(확대, 축소 정도)
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
      this.mapEventListener(map,geocoder)
      this.mapInstance = map
      this.geocorderInstance = geocoder

      console.log("마운티드 종료")
      //this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)

    })

  },
  methods:{

    /**
     * makeArrayModuler - description
     *
     * @param  {type} array description
     * @param  {type} mod=1 description
     * @return {type}       description
     */
    makeArrayModuler(array, mod=1){
      let resArr = [];
      let tmpArr = [];
      let i = 0;
      for(const [idx, val] of array.entries()){
        tmpArr.push(val);
        if( (idx+1)%mod === 0 ){
          resArr[i] = tmpArr;
          tmpArr = []
          i++;
        }
      }
      return resArr;
    },
    fetchData(){
      this.getFranchiseView(this.$route.params.id).then((result)=>{
        this.displayItem = result
      })
    },
    async getFranchiseView(frnchiseCode){
      //let model = new ApiModel(this.$http)
      let result = await this.apiModel.getFranchiseView(frnchiseCode)
      let data = null
      if(result.status === 200){
        data = result.data
        let paging = data.shift()
        for (const value of data) {
          let img3 = value.img3
          if(value.img3 === ''){
            img3 = "/src/assets/fc_noimg_263168.jpg"
          }else{
            img3 = "//file.mk.co.kr"+img3.slice(12)
          }
          value.img3 = img3
        }
        console.log(data)
        return data
      }
    },
    async getFranchiseYearData(frnchiseCode){
      let result = await this.apiModel.getFranchiseYearData(frnchiseCode)
      let data = null
      if(result.status === 200){
        data = result.data
      }
      return data
    },
    async getStoreList(frnchiseCode, centerCode=''){
      let result = await this.apiModel.getOP402(frnchiseCode, '100', '1', centerCode)
      if(result.status === 200){
        let data = result.data.data
        console.log(data)
        return data
      }
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

                    this.getEstateList(code.substring(0,5))
                    if(this.centerCode !== code){
                      this.centerCode = code
                      //console.log(code)
                      this.getStoreList(this.$route.params.id, code).then((result)=>{
                        this.storeList = result.rows
                        this.makeMakers(result.rows)
                      })
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
      let tmparr = []
      tmparr = convertGeo([x,y])
      let marker = new daum.maps.Marker({
          map: this.mapInstance, // 마커를 표시할 지도
          position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
          title : value.refBnm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
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
    async addressTogeocode(address){
      let geocoder = new daum.maps.services.Geocoder()
      //let coords = ''
      console.log("address:"+address)
      //console.log(this.geocorderInstance)
      // 주소로 좌표를 검색합니다
      //this.geocorderInstance.addressSearch('서울특별시 강남구 테헤란로 405 BGF리테일', function (result, status){
      geocoder.addressSearch(address, (result, status) => {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {

            let coords = new daum.maps.LatLng(result[0].y, result[0].x)
            //map.setCenter(coords);
            this.setMapCenter(coords)
            this.searchAddrFromCoords(geocoder, this.mapInstance.getCenter(), this.displayCenterInfo)
          }
      })
    },
    setMapCenter(coords){
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      if(this.mapInstance !== ''){
        this.mapInstance.setCenter(coords)
      }
    },
    getEstateList(code){
      code = code+'00000'
      console.log('부동산리스트')
      let pageNo = '1'
      let rows = '3'
      this.apiModel.getEstateList(pageNo,rows,code='').then((result)=>{
        if(result.status === 200){
          console.log(result)
          let data = result.data
          let paging = data.shift()
          for (const value of data) {
            let img = value.img_url
            if(img === ''){
              img = '/src/assets/fc_noimg_253128.jpg'
            }
            else {
              let tmparr = []
            tmparr = img.split( ',', 2 )
            img = tmparr[0]
            }
            value.img_url = img
          }
          this.estateList = data
        }
      })

    }

  }
}
</script>
