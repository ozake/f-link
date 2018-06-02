<template>
  <div id="content">
    <SubHeaderSelect ></SubHeaderSelect>
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
            <dd>{{this.displayItem.total}}만원 ({{this.displayItem.storearea}}평)</dd>
            <dt>현재 가맹점수</dt>
            <dd>{{displayItem.fcount}}개</dd>
            <dt>홈페이지 </dt>
            <dd>{{this.displayItem.url}}</dd>
            <p>※ 본 서비스는 공정거래위원회 ‘가맹사업거래 정보공개서’에 기초한 정보입니다.</p>
          </dl>

        </div>
        <!--//프랜차이즈 기본정보-->

        <!--//프랜차이즈 기본정보-->

					<!--브랜드 소개-->
					<div class="frinfo1" v-if="brandMemo">
						<h5>브랜드 소개</h5>

						<p class="br_txt">
              {{displayItem.memo}}
            </p>					
					</div>
				
						
				<!--//브랜드 소개-->



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
              <td>{{this.displayItem.total}}만원</td>
              </tr>
              <tr class="row3">
              <th>가맹비</th>
              <td>{{this.displayItem.membership}}만원</td>
              </tr>
              <tr class="row3">
              <th>교육비</th>
              <td>{{this.displayItem.educost}}만원</td>
              </tr>
              <tr class="row3">
              <th>보증금</th>
              <td>{{this.displayItem.deposit}}만원</td>
              </tr>
              <tr class="row3">
              <th>기타비용</th>
              <td>{{this.displayItem.othercost}}만원</td>
              </tr>
          </table>

          <table width="387" border="0" cellpadding="0" cellspacing="0">
              <caption>가맹 창업 조건</caption>
              <tr class="row1">
              <th></th>
              <td></td>
              </tr>
              <tr class="row2">
              <th>인테리어 비용 </th>
              <td>{{this.displayItem.interiorcost}}만원</td>
              </tr>
              <tr class="row3">
              <th>평당 비용</th>
              <td>{{this.displayItem.sicost}}만원</td>
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
                <col width="134"> 
							  <col width="134">
							  <col width="134"> 
								<col width="134"> 
								<col width="134"> 
								<col width="134">
              </colgroup>
														 
							 <tr>
								<th>연도 </th>
								<th>신규개점</th>
								<th>명의변경 </th>
								<th>총 매장 수 </th>
								<th>폐업 매장 수 </th>
								<th>폐업률(%)</th>
							  </tr>			 
							  
							  <tr v-for="ydata in yearData">
								<td>{{ydata.year}} </td>
								<td>{{ydata.rcount}}</td>
                <td>{{ydata.mcount}}</td>
								<td>{{ydata.totalStore}}</td>
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
                <th>{{this.displayItem.executives}} /{{this.displayItem.employee}} 명</th>
                <td>가맹사업 개시일</td>
                <th>{{displayItem.start}}</th>
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
            <div class="select-box">
              <select v-bind:class="[this.isIe ? ieClass : '', nonIeClass]" >
                <option>서울</option>
              </select>
            </div>
            <!--//대분류-->

            <!--중분류-->
            <div class="select-box">
              <select v-bind:class="[this.isIe ? ieClass : '', nonIeClass]" v-model="selected">
                <option>시/군/구</option>
                <option :value="{code:110, name:'종로구'}">종로구</option>
				    		<option :value="{code:140, name:'중구'}">중구</option>
				    		<option :value="{code:170, name:'용산구'}">용산구</option>
				    		<option :value="{code:200, name:'성동구'}">성동구</option>
				    		<option :value="{code:215, name:'광진구'}">광진구</option>
				    		<option :value="{code:230, name:'동대문구'}">동대문구</option>
				    		<option :value="{code:260, name:'중랑구'}">중랑구</option>
				    		<option :value="{code:290, name:'성북구'}">성북구</option>
				    		<option :value="{code:305, name:'강북구'}">강북구</option>
				    		<option :value="{code:320, name:'도봉구'}">도봉구</option>
				    		<option :value="{code:350, name:'노원구'}">노원구</option>
				    		<option :value="{code:380, name:'은평구'}">은평구</option>
				    		<option :value="{code:410, name:'서대문구'}">서대문구</option>
				    		<option :value="{code:440, name:'마포구'}">마포구</option>
				    		<option :value="{code:470, name:'양만구'}">양만구</option>
				    		<option :value="{code:500, name:'강서구'}">강서구</option>
				    		<option :value="{code:530, name:'구로구'}">구로구</option>
				    		<option :value="{code:545, name:'금만구'}">금만구</option>
				    		<option :value="{code:560, name:'영등포'}">영등포구</option>
				    		<option :value="{code:590, name:'동작구'}">동작구</option>
				    		<option :value="{code:620, name:'관악구'}">관악구</option>
				    		<option :value="{code:650, name:'서초구'}">서초구</option>
				    		<option :value="{code:680, name:'강남구'}">강남구</option>
				    		<option :value="{code:710, name:'송파구'}">송파구</option>
				    		<option :value="{code:740, name:'강동구'}">강동구</option>
              </select>
            </div>
            <!--//중분류-->

            <!--창업 자금  -->
            <div class="select-box">
              <select v-bind:class="[this.isIe ? ieClass : '', nonIeClass]" v-model="selectedStore">
                <option>지점</option>
                <option v-for="(store,idx) in storeList" :value="store.position">{{store.refBnm}}</option>
              </select>
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
  background: #fff url(http://img.mk.co.kr/2018/franchise/btn_select.jpg)
    no-repeat 100%;
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
import SubHeaderSelect from "./component/SubHeaderSelect.vue";
import RightSales from "./component/RightSales.vue";
import ApiModel from "./model/apiModel.js";
import { convertGeo } from "./model/util.js";
import { Queue } from "./model/colections";
import numeral from "numeral";
export default {
  name: "FranchiseView",
  components: {
    SubHeaderSelect,
    RightSales
  },
  data() {
    return {
      ieClass: "box_title_ie",
      nonIeClass: "box_title",
      isIe: false,
      displayItem: {},
      yearData: [],
      apiModel: new ApiModel(this.$http),
      centerCode: "",
      storeList: [],
      mapInstance: "",
      geocorderInstance: "",
      queue: new Queue(),
      estateList: [],
      selected: "시/군/구",
      selectedStore: "지점",
      brandMemo: false
    };
  },
  computed: {
    closureRate: function() {}
  },
  props: {},
  created() {
    this.$EventBus.$emit("HeaderActive", "franchise");
    //this.listItems = this.makeArrayModuler(this.items,5)
    const agent = navigator.userAgent.toLowerCase();
    if (
      (navigator.appName == "Netscape" && agent.indexOf("trident") != -1) ||
      agent.indexOf("msie") != -1
    ) {
      this.isIe = true;
    }
    let ap1 = this.getFranchiseView(this.$route.params.id);
    let ap2 = this.getFranchiseYearData(this.$route.params.id);
    Promise.all([ap1, ap2]).then(result => {
      //console.log(result)
      let data1 = result[0];
      let data2 = result[1];
      let tmpArray = [];
      console.log(data1[0]);
      console.log(data1[0].memo);
      if (data1[0].memo) {
        this.brandMemo = true;
      }
      data1 = data1[0];

      let date = data1.start;
      date =
        date.substr(0, 4) + "년 " + date.substr(4, 2) + "월 " + date.substr(6, 2) + "일";
      data1.start = date;
      this.displayItem = data1;
      for (let v of data2) {
        let totalStore = Number(v.fcount) + Number(v.rcount);
        totalStore = Number(totalStore);
        let closerStore = Number(v.ecount) + Number(v.ccount);
        closerStore = Number(closerStore);
        let closerRate = closerStore / totalStore * 100;
        closerRate = closerRate.toFixed(1);
        v.totalStore = totalStore;
        v.closerStore = closerStore;
        v.closerRate = closerRate;
        tmpArray.push(v);
      }
      this.yearData = tmpArray;

      /* this.addressTogeocode(data1[0].address).then((coords)=>{
        console.log(coords)
        //this.setMapCenter(coords)
      }) */
    });

    /* this.getFranchiseView(this.$route.params.id).then((result)=>{
      console.log(result[0])
      this.displayItem = result[0]
    }) */
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    $route: "fetchData",
    selected: function(val) {
      console.log(val);
      let code = "11" + val.code;
      this.getStoreList(this.$route.params.id, code).then(result => {
        this.storeList = result.rows;
        this.makeMakers(result.rows);
      });
      this.addressTogeocode(val.name);
    },
    selectedStore: function(val) {
      console.log(val);
      let coords = new daum.maps.LatLng(val[1], val[0]);
      this.setMapCenter(coords);
    }
  },
  mounted() {
    this.$nextTick(function() {
      // 모든 화면이 렌더링된 후 실행합니다.

      console.log("지도 셋팅 시작");
      let container = document.getElementById("branch_map"); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
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
      map.setMaxLevel(6);
      console.log("지도 셋팅 완료");
      //console.log(this.displayItem.address)

      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      this.mapEventListener(map, geocoder);
      this.mapInstance = map;
      this.geocorderInstance = geocoder;
      this.searchAddrFromCoords(
        geocoder,
        map.getCenter(),
        this.displayCenterInfo
      );

      console.log("마운티드 종료");
      //this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)
    });
  },
  methods: {
    /**
     * makeArrayModuler - description
     *
     * @param  {type} array description
     * @param  {type} mod=1 description
     * @return {type}       description
     */
    makeArrayModuler(array, mod = 1) {
      let resArr = [];
      let tmpArr = [];
      let i = 0;
      for (const [idx, val] of array.entries()) {
        tmpArr.push(val);
        if ((idx + 1) % mod === 0) {
          resArr[i] = tmpArr;
          tmpArr = [];
          i++;
        }
      }
      return resArr;
    },
    fetchData() {
      this.getFranchiseView(this.$route.params.id).then(result => {
        this.displayItem = result;
      });
    },
    async getFranchiseView(frnchiseCode) {
      //let model = new ApiModel(this.$http)
      let result = await this.apiModel.getFranchiseView(frnchiseCode);
      let data = null;
      if (result.status === 200) {
        data = result.data;
        let paging = data.shift();
        for (const value of data) {
          value.total = this.numberFormating(value.total);
          value.educost = this.numberFormating(value.educost);
          value.deposit = this.numberFormating(value.deposit);
          value.othercost = this.numberFormating(value.othercost);
          value.interiorcost = this.numberFormating(value.interiorcost);
          value.membership = this.numberFormating(value.membership);
          value.sicost = this.numberFormating(value.sicost);
          let img3 = value.img3;
          if (value.img3 === "") {
            img3 = "/src/assets/fc_noimg_263168.jpg";
          } else {
            img3 = "//file.mk.co.kr" + img3.slice(12);
          }
          value.img3 = img3;
        }
        console.log(data);
        return data;
      }
    },
    async getFranchiseYearData(frnchiseCode) {
      let result = await this.apiModel.getFranchiseYearData(frnchiseCode);
      let data = null;
      if (result.status === 200) {
        data = result.data;
      }
      return data;
    },
    async getStoreList(frnchiseCode, centerCode = "") {
      let result = await this.apiModel.getOP402(
        frnchiseCode,
        "100",
        "1",
        centerCode
      );
      if (result.status === 200) {
        let data = result.data.data;
        //console.log(data)
        return data;
      }
    },
    numberFormating(num) {
      num = num.slice(0, -1);
      num = Number(num);
      num = numeral(num).format("0,0");
      return num;
    },
    mapEventListener(map, geocoder) {
      daum.maps.event.addListener(map, "dragend", () => {
        this.searchAddrFromCoords(
          geocoder,
          map.getCenter(),
          this.displayCenterInfo
        );
      });
    },
    searchAddrFromCoords(geocoder, coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    },
    displayCenterInfo(result, status) {
      let addrText = "";
      if (status === daum.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          // 법정동의 region_type 값은 'B' 이므로
          if (result[i].region_type === "B") {
            addrText = result[i].address_name;
            let code = result[i].code;
            code = code.substring(0, 8);

            this.getEstateList(code.substring(0, 5));
            if (this.centerCode !== code) {
              this.centerCode = code;
              //console.log(code)
              this.getStoreList(this.$route.params.id, code).then(result => {
                let tmparr = [];
                let x = null;
                let y = null;
                for (const value of result.rows) {
                  x = Number(value.xAxis);
                  y = Number(value.yAxis);
                  let date = this.getDateFormat(new Date(value.firstDate));
                  let tel = value.tel;
                  tel = tel.slice(1);
                  tel = this.phoneFomatter(tel);
                  if (tel.slice(1, 2) === "0") {
                    tel = tel.slice(1);
                  }
                  value.tel = tel;
                  value.firstDate = date;
                  let position = [];
                  position = convertGeo([x, y]);
                  value.position = position;
                  tmparr.push(value);
                }
                this.storeList = tmparr;
                this.makeMakers(result.rows);
              });
            }
            //this.setAddr(addrText+"/ 법정동코드: "+code)

            break;
          }
        }
      }
    },
    makeMakers(rows) {
      let x = null;
      let y = null;
      this.makersClean();
      for (const value of rows) {
        //console.log(value)
        x = Number(value.xAxis);
        y = Number(value.yAxis);
        let marker = null;
        marker = this.setMaker(x, y, value);
        this.queue.setQueue(marker);
      }
    },
    setMaker(x, y, value) {
      let tmparr = [];
      tmparr = convertGeo([x, y]);
      let marker = new daum.maps.Marker({
        map: this.mapInstance, // 마커를 표시할 지도
        position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
        title: value.refBnm // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
      return marker;
    },
    makersClean() {
      let tmp = undefined;
      let length = this.queue.getQueueLength();
      if (length !== 0) {
        for (let i = 0; i < length; i++) {
          tmp = this.queue.getQueue();
          if (typeof tmp === "undefined") {
            break;
          }
          tmp.setMap(null);
        }
      }
    },
    async addressTogeocode(address) {
      let geocoder = new daum.maps.services.Geocoder();
      //let coords = ''
      console.log("address:" + address);
      //console.log(this.geocorderInstance)
      // 주소로 좌표를 검색합니다
      //this.geocorderInstance.addressSearch('서울특별시 강남구 테헤란로 405 BGF리테일', function (result, status){
      geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === daum.maps.services.Status.OK) {
          let coords = new daum.maps.LatLng(result[0].y, result[0].x);
          //map.setCenter(coords);
          this.setMapCenter(coords);
          this.searchAddrFromCoords(
            geocoder,
            this.mapInstance.getCenter(),
            this.displayCenterInfo
          );
        }
      });
    },
    setMapCenter(coords) {
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      if (this.mapInstance !== "") {
        this.mapInstance.setCenter(coords);
      }
    },
    getEstateList(code) {
      code = code + "00000";
      //console.log('부동산리스트')
      let pageNo = "1";
      let rows = "3";
      this.apiModel.getEstateList(pageNo, rows, (code = "")).then(result => {
        if (result.status === 200) {
          //console.log(result)
          let data = result.data;
          console.log(data)
          let paging = data.shift();
          for (const value of data) {
            let img = value.img_url;
            if (img === "") {
              img = "/src/assets/fc_noimg_253128.jpg";
            } else {
              let tmparr = [];
              tmparr = img.split(",", 2);
              img = tmparr[0];
              let str = img.replace("http://image.bizmk.kr", "");
              let res = str.search("http://image.bizmk.kr");
              if (res === -1) {
                str = "http://image.bizmk.kr" + str;
              }
              img = str;
            }
            value.img_url = img;
            let regdate = value.mk_reg_date
            value.mk_reg_date = regdate.substr(0,10)
          }
          this.estateList = data;
        }
      });
    },
    getDateFormat(date) {
      let year = date.getFullYear(); //yyyy

      let month = 1 + date.getMonth(); //M

      month = month >= 10 ? month : "0" + month; // month 두자리로 저장

      let day = date.getDate(); //d

      day = day >= 10 ? day : "0" + day; //day 두자리로 저장

      return year + "-" + month + "-" + day;
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
    }
  }
};
</script>
