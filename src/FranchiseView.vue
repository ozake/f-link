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
            <img src="http://img.mk.co.kr/2018/franchise/pizza2.jpg" alt="네네피자로고">
            <button class="btn_tel">전화 상담 (02-2000-5450)</button>
          </div>

          <dl>
            <dt>회사명</dt>
            <dd>{{this.displayItem.company}}  </dd>
            <dt>대표자</dt>
            <dd>-</dd>
            <dt>창업 비용</dt>
            <dd>{{this.displayItem.total}} ({{this.displayItem.storearea}}평)</dd>
            <dt>평당 평균 매출액</dt>
            <dd>500만원</dd>
            <dt>홈페이지 </dt>
            <dd>-</dd>
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
              <td>최초 3년 / 연장 2년</td>
              </tr>
              <tr class="row2">
              <th>예상창업비용</th>
              <td>{{this.displayItem.prcost}}</td>
              </tr>
              <tr class="row3">
              <th>가맹비</th>
              <td>1000만원</td>
              </tr>
              <tr class="row3">
              <th>교육비</th>
              <td>2000만원</td>
              </tr>
              <tr class="row3">
              <th>보증금</th>
              <td>5000만원</td>
              </tr>
              <tr class="row3">
              <th>기타비용</th>
              <td>2000만원</td>
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
              <td>1억원</td>
              </tr>
              <tr class="row3">
              <th>평당 비용</th>
              <td>150만원</td>
              </tr>
              <tr class="row3">
              <th>기준 면적 </th>
              <td>{{this.displayItem.area}}평</td>
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

              <tr>
              <td>2016 </td>
              <td>109 </td>
              <td>45</td>
              <td>2</td>
              <td>314</td>
              </tr>

              <tr>
              <td>2015</td>
              <td>84</td>
              <td>1</td>
              <td>49</td>
              <td>203</td>
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

              <tr>
              <td>2016 </td>
              <td>109 </td>
              <td>45</td>
              <td>2</td>
            </tr>

              <tr>
              <td>2015</td>
              <td>84</td>
              <td>1</td>
              <td>49</td>
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
              <th>2 /17</th>
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
                <!-- <li>
                  <span>1</span>
                  <p class="branch_name">매경피자 1호점</p>
                  <p>서울특별시 중구 퇴계로 212 대한극장 1,2층 지번 </p>
                  <p class="branch_info">02-2000-5450</p>
                  <p class="branch_info">영업 개시일 : 2015.01</p>
                </li>

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
      <RightSales></RightSales>

    </div>


  </div>
</template>
<style scoped>

</style>
<script>
import SubHeaderSelect from "./component/SubHeaderSelect.vue"
import RightSales from "./component/RightSales.vue"
import ApiModel from "./model/apiModel.js"
export default {
  name: 'FranchiseView',
  components:{
    SubHeaderSelect,
    RightSales
  },
  data(){
    return {
      isIe:false,
      items: [
        {
          id:1,
          title: "본죽",
          prcost: "5740만원",
          area: "23",
          company:"본아이에프(주)"
        },
        {
          id:2,
          title: "한솥",
          prcost: "7500만원",
          area: "15",
          company:"한솥(주)"
        },
        {
          id:3,
          title: "고봉민김밥",
          prcost: "4980만원",
          area: "28",
          company:"케이비앰(주)"
        },
        {
          id:4,
          title: "놀부부대찌개",
          prcost: "1억210만원",
          area: "45",
          company:"놀부(주)"
        },
        {
          id:5,
          title: "가장맛있는족발",
          prcost: "1억5350만원",
          area: "50",
          company:"가장맛있는족발(주)"
        },
        {
          id:6,
          title: "원할머니",
          prcost: "9930만원",
          area: "30",
          company:"원앤원(주)"
        },
        {
          id:7,
          title: "조마루감자탕",
          prcost: "8860만원",
          area: "30",
          company:"조마루(주)"
        },
        {
          id:8,
          title: "하남돼지집",
          prcost: "1억1320만원",
          area: "40",
          company:"하남애프앤비(주)"
        },
        {
          id:9,
          title: "신마포갈매기",
          prcost: "1억3300만원",
          area: "50",
          company:"디딤(주)"
        },
        {
          id:10,
          title: "채선당",
          prcost: "1억8250만원",
          area: "60",
          company:"채선당(주)"
        }
      ],
      displayItem : {}
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
    this.getFranchiseView(this.$route.params.id).then((result)=>{
      this.displayItem = result[0]
    })
    //console.log(this.$route.params.id)

    /* for (const value of this.items) {
      console.log(value.id)
      if(this.$route.params.id == value.id){
        this.displayItem = {
          id:value.id,
          company:value.company,
          title:value.title,
          prcost:value.prcost,
          area:value.area
        }
      }
    } */
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
        level: 4 //지도의 레벨(확대, 축소 정도)
      };

      let map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
      // 주소-좌표 변환 객체를 생성합니다
      let geocoder = new daum.maps.services.Geocoder();
      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      let mapTypeControl = new daum.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new daum.maps.ZoomControl();
      map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
      console.log("지도 셋팅 완료")


      //this.setPolyline()
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
      /* for (const value of this.items) {
        if(this.$route.params.id === value.id){
          this.displayItem = {
            id:value.id,
            title:value.title,
            prcost:value.prcost,
            area:value.area
          }
        }
      } */

    },
    async getFranchiseView(frnchiseCode){
      let model = new ApiModel(this.$http)
      let result = await model.getFranchiseView(frnchiseCode)
      if(result.status === 200){
        let data = result.data
        for (const value of data) {
          let img1 = value.img1
          if(value.img1 === ''){
            img1 = "http://img.mk.co.kr/2018/franchise/pizza.jpg"
          }else{
            img1 = "//file.mk.co.kr"+img1.slice(12)
          }
          value.img1 = img1
        }
        return data
      }
    }

  }
}
</script>
