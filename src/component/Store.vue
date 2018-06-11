<template>
  <div id="content">
    <transition name="fade">
      <!-- 검정배경-->
      <div class="black" v-if="RecommLayer" v-on:click="recommBldOnOff"></div>
      <!-- //검정배경-->
    </transition>

    <!-- <transition name="fade"> -->
      <recomm-bld v-if="RecommBld" :RecommBld="RecommBld" :RecommLayer="RecommLayer" :data="RecommList" :categoryName="RecommCname" :RecommCategory="RecommCategory"></recomm-bld>
    <!-- </transition> -->

    <!-- 지도검색 안내팝업 -->
    <transition name="slide-fade">
      <div class="info_pop" v-if="infoPop" style="top:10px;">
        지역을 입력하세요. <br>
          예시) 강남구, 서초동
        <a href="#none" @click="infoPop = false"><img alt="닫기" src="http://img.mk.co.kr/2018/franchise/btn_close1.gif"></a>
      </div>
    </transition>
		<!-- //지도검색 안내팝업 -->


    <!-- 지도영역-->
		<div class="store_map" id="map" ref="map" v-bind:style="styles">
      <div v-show="mapLoading" class="mapLoadingWrap">
        <img class="loadImg" src="http://img.mk.co.kr/2018/franchise/loading.gif" />
        <div class="mapLoading"></div>
      </div>

      <!-- <AddrArea :addr="addr"></AddrArea> -->
      <!-- 건물 추천서비스-->
      <div class="building" v-on:click="recommBldOnOff">
        <p>건물 추천서비스</p>
        <span>여기서 창업하기<br>
        가장 좋은 건물은 어디?</span>
      </div>
      <!-- //건물 추천서비스-->
    </div>
    <AsideMap :brand="brand" :isIe="isIe" :updateFlag="updateFlag" :estateList="estateList" :estateHeight="estateHeight" :oldBrandCk="oldBrandCk" :sggCd="sggCd"></AsideMap>


  </div>
</template>

<script>
import AddrArea from "./AddrArea.vue"
import AsideMap from "./AsideMap.vue"
import RecommBld from "./RecommBld.vue"
import proj4 from "proj4"
import ApiModel from "../model/apiModel.js"
import { Queue } from '../model/colections'
import { Base64 } from 'js-base64'
export default {
  name: 'store',
  data () {
    return {
      addr: '서울특별시 중구',
      centerCode : '',
      mapInstance: '',
      ftcCate2Cd : '',
      FcenterCode : '',
      nonFranchise : false,
      mapLevel : '',
      queue : new Queue(),
      geoCoder : '',
      brand : [],
      brandQueue : new Queue(),
      isIe : false,
      apiModel : new ApiModel(this.$http),
      franchiseNo : [],
      updateFlag : true,
      cluster : '',
      RecommBld : false,
      RecommCategory : '',
      RecommCname : '',
      RecommLayer : false,
      RecommCcode : '',
      RecommQueue : new Queue(),
      RecommMarkers : new Queue(),
      RecommList : [],
      estateList : [],
      estateQueue : new Queue(),
      oldBrandCk : [],
      infoPop : false,
      estateCluster: '',
      clusterClick : '',
      sggCd: '',
      mapLoading: false
    }
  },
  props:{
  },
  components:{
    AddrArea,
    AsideMap,
    RecommBld
  },
  computed: {
    styles: function() {
      let height = window.innerHeight - 143

      return {
        height: height + 'px'
      }
    },
    estateHeight: function() {
      let height = window.innerHeight - 555
      return {
        height: height + 'px'
      }
    }
/*     sggCd : function() {
      let sggCd = this.ftcCate2Cd
      sggCd = sggCd.substring(0,5)
      sggCd = sggCd + '00000'
      return sggCd
    } */
  },
  mounted() {
    this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.

      console.log("지도 셋팅 시작")
      let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(37.56611900511385, 126.97774128459538), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)

      };

      let map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
      this.mapInstance = map
      // 주소-좌표 변환 객체를 생성합니다
      let geocoder = new daum.maps.services.Geocoder();
      this.geoCoder = geocoder
      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다

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
      this.mapLevel = map.getLevel()
      this.mapEventListener(map,geocoder)
      this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)

      this.$EventBus.$on('setCenterMethod', this.setCenterMap)

      this.$EventBus.$on('setPolyonMethod', this.setPolygon)

      this.$EventBus.$on('setftcCate2Cd', this.setftcCate2Cd)

      this.$EventBus.$on('brandChecked', this.setFranchiseNo)

      this.$EventBus.$on('brandUnchecked', ()=>{
        this.franchiseNo = []
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd,this.FcenterCode)
      })

      this.$EventBus.$on('nonFranchise', (val)=>{
        this.nonFranchise = val
      })

      this.$EventBus.$on('recommCategory', (val, val2)=>{
        //console.log(val+val2)
        this.RecommCategory = val
        if(val !== ''){
          this.getRecommBld(val)
          this.RecommCname = val2
        }
      })

      this.$EventBus.$on('recommLayer', (val)=>{
        this.RecommLayer = val
      })

      //검색시 브랜드 검색 호출
      /* this.$EventBus.$on('searchBrand', (val)=>{
        console.log('브랜드검색')
        //console.log(val)
        //this.franchiseNo = val
        //this.getBrandList(this.centerCode, val)
        let tmparr = []
        tmparr.push(val)
        this.setFranchiseNo(tmparr)
      }) */

      this.$EventBus.$on('recommOnOff', this.recommBldOnOff)

      if(this.$route.params.categoryCode && this.$route.params.addr){
        this.addressTogeocode(this.$route.params.addr).then(()=>{
          this.ftcCate2Cd = this.$route.params.categoryCode
        })
      }

      this.$EventBus.$on('addrSearch', (val)=>{
        this.addressTogeocode(val)
      })

      this.infoPopAuto(2000)
      //this.setPolyline()
    })

  },
  created() {
    this.$EventBus.$emit('HeaderActive', 'store')
    const agent = navigator.userAgent.toLowerCase()
    if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
     this.isIe = true
     }
  },
  watch: {
    ftcCate2Cd : function (val){
      this.franchiseNo = []
      if(this.mapLevel <= 3){
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd,this.FcenterCode)
      }
      else{
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd)
      }
    },
    nonFranchise : function (){
      if(this.mapLevel <= 3){
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd,this.FcenterCode)
      }
      else{
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd)
      }
    },
    RecommBld : function(val){
      if(!val){
        this.RecommCategory = ''
      }
    },
    clusterClick : function(val) {
      this.estateClusterList(val)
    }
    /* franchiseNo : function (val){
      this.getBrandList(this.centerCode,val)
    } */
  },
  methods:{
    setAddr(data){
      this.addr = data
    },
    setftcCate2Cd(data){
      this.ftcCate2Cd = data
    },
    setFranchiseNo(data){
      //let tmparr = []
      //tmparr = data
      //let tmp = tmparr.pop()
      //console.log(tmparr)
      this.franchiseNo = data
      this.makersCleanPromise().then(()=>{
          this.getBrandList(this.centerCode,this.franchiseNo)
        })
      /* this.$nextTick(()=>{


      }) */
    },

    mapEventListener(map,geocoder){
      daum.maps.event.addListener(map, 'dragend', () => {
          this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)
      })
      daum.maps.event.addListener(map, 'bounds_changed', () => {
          let level = map.getLevel()
          if(this.mapLevel !== level){
            this.mapLevel = level
            this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)
            if(level <= 3){
              this.getFranchiseList(this.centerCode,this.ftcCate2Cd,this.FcenterCode)
            }
            else{
              this.getFranchiseList(this.centerCode,this.ftcCate2Cd)
            }

          }
      })
    },
    searchAddrFromCoords(geocoder,coords,callback){
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
    },
    displayCenterInfo(result, status) {
      let addrText = '';
        if (status === daum.maps.services.Status.OK) {
            //var infoDiv = document.getElementById('centerAddr');

            for(let i = 0; i < result.length; i++) {
                // 법정동의 region_type 값은 'B' 이므로
                if (result[i].region_type === 'B') {
                    addrText = result[i].address_name
                    let code = result[i].code
                    let fullCode = code
                    this.setAddr(addrText+"/ 법정동코드: "+code)
                    code = code.substring(0,5)
                    this.sggCd = code + '00000'
                    fullCode = fullCode.substring(0,8)
                    this.RecommCcode = fullCode
                    if(!this.RecommBld){
                      if(this.mapLevel > 2){
                        this.getEstateList(code)
                      }
                      if(this.mapLevel <3){
                        this.estateMarkerClean()
                      }

                      
                    }

                    if(this.mapLevel <= 3){
                        if( this.FcenterCode !== fullCode ){
                          this.FcenterCode = fullCode
                          if(this.ftcCate2Cd !== ''){
                            this.getFranchiseList(code,this.ftcCate2Cd,fullCode)
                          }

                        }
                      }
                    else{
                      if( this.centerCode !== code ){
                        this.centerCode = code
                        if(this.ftcCate2Cd !== ''){
                          this.getFranchiseList(code,this.ftcCate2Cd)
                          //this.getEstateList(code)
                        }
                      }
                    }
                    break;
                }
            }
        }
    },
    searchRegionCode(geocoder,coords){
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), (result, status)=> {
        if (status === daum.maps.services.Status.OK) {
          //console.log('지역 명칭 : ' + result[0].address_name);
          //console.log('행정구역 코드 : ' + result[0].code);
        }
      });
    },
    setCenterMap(x,y){
      //console.log(x+":"+y)
      this.mapInstance.setCenter(new daum.maps.LatLng(x, y))
    },
    /**
     * setPolygon - 배후지영역을 지도에 다각형으로 그린다
     *
     * @param  {Map} Map 배후지 id와 배후지좌표 배열이 담긴 Map객체를 파람으로 전달
     * @return {void}
     */
    setPolygon(Map){
      let goeArr = []
      goeArr = Map.get("1111012200100240000032840")
      let pathArr = []
      for(let value of goeArr){
        pathArr.push(new daum.maps.LatLng(value[1],value[0]))
      }


      let polygon = new daum.maps.Polygon({
        map: this.mapInstance,
        path: pathArr,
        strokeWeight: 2,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8,
        strokeStyle: 'dashed',
        fillColor: '#00EEEE',
        fillOpacity: 0.6
      })

      polygon.setMap(this.mapInstance)

    },
    convGeo(latlng){
      proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
      let firstProjection = proj4.defs('EPSG:5179')
      let secondProjection = proj4.defs('EPSG:4326')

      let convertRes = proj4(firstProjection,secondProjection,latlng)
      return convertRes
    },
    setPolyline(){
      let polArr = []
      polArr.push(this.convGeo([955114.49242179352, 1943186.4108217508]))
      polArr.push(this.convGeo([955059.48222152225, 1944135.7711286196]))
      let polyline = new daum.maps.Polyline({
          map: this.mapInstance,
          path: [
              new daum.maps.LatLng(polArr[0][1], polArr[0][0]),
              new daum.maps.LatLng(polArr[1][1], polArr[1][0])
          ],
          strokeWeight: 5,
          strokeColor: '#FF00FF',
          strokeOpacity: 0.9,
          strokeStyle: 'dashed',
          endArrow: true
      });
      polyline.setZIndex(1000);

      polyline.setMap(this.mapInstance)
    },
    getBrandList(code,franchiseNo){
      //console.log(franchiseNo)
      //let tmparr = []
      let rows = '1000'
      //this.makersClean()
      let idx = 1
      for (const value of franchiseNo) {
        setTimeout(()=>{
          this.apiModel.getOP405(code, value, '1000', '1').then((result)=>{
            if(result.status === 200){
              let data = result.data.data.rows
              this.makeMakersNobrand(data)
              //this.makeMakers(result)
              this.updateFlag = false
            }
          })
        },300)

      }
      /* if(this.mapLevel <= 3){
        emdCd = fullCode
        rows = '1000'
        console.log('405실행1')
        this.makersClean()
        this.apiModel.getOP405(code, franchiseNo, rows, '1', fullCode).then((result)=>{
          if(result.status === 200){
            console.log('405응답1')
            this.makeMakers(result,this.isFranchise)
          }
        })
      }
      else {
        this.makersClean()
        for(let i=1; i<=5; i++){
          console.log('405실행'+i)
          this.apiModel.getOP405(code, franchiseNo, rows, `${i}`, fullCode).then((result)=>{
            if(result.status === 200){
              console.log('405응답'+i)
              this.makeMakers(result,this.isFranchise)
            }
          })
        }
      } */
    },
    getFranchiseList(code,ftcCate2Cd,fullCode=''){
      if(ftcCate2Cd === ''){
        return
      }
      //let model = new ApiModel(this.$http)
      let emdCd = ''
      let rows = '200'
      this.updateFlag = true
      if(this.isIe === true){
        rows = '200'
      }
      if(this.mapLevel <= 3){
        emdCd = fullCode
        rows = '1000'
        this.makersCleanPromise().then(()=>{
          this.getOP501(code, ftcCate2Cd, rows, emdCd)
        })
      }
      else {
        this.makersCleanPromise().then(()=>{
          this.getOP501(code, ftcCate2Cd, rows)
          console.log(code)
          console.log(ftcCate2Cd)
        })
        /* this.getOP404Fivetimes(code, ftcCate2Cd, rows).then(()=>{
          this.brand = this.brandQueue.getQueueAll()
          this.cluster = this.makeCluster(this.queue.queue)
        }) */
      }
    },
    getOP501(code, ftcCate2Cd, rows, emdCd=''){
      this.mapLoading = true
			/* setTimeout(()=>{
				this.mapLoading = false
			}, 400) */
      console.log('501실행')
      this.apiModel.getOP501(code, ftcCate2Cd, rows, 1, emdCd).then((result)=>{
        if(result.status === 200){
          console.log('501응답')
          //console.log(result)
          let data = result.data.data.rows
          let brandCkArr = this.franchiseNo
          //console.log("브랜드 체크 갯수:"+brandCkArr.length)
          let brand = result.data.data.brands
          if(brandCkArr.length === 0){
            this.oldBrandCk = []
            //console.log("총갯수:"+data.length)
            let maxNum = Number(data.length / 5).toFixed(0)
            //console.log("전체 나누기 5 값"+maxNum)
            let arr1 = data.splice(0,maxNum)
            let arr2 = data.slice(0,maxNum)
            let arr3 = data.slice(0,maxNum)
            let arr4 = data.slice(0,maxNum)
            let arr5 = data.slice(0,maxNum)
            this.makeMakersNobrand(arr1,this.nonFranchise)
            this.makeMakersNobrand(arr2,this.nonFranchise)
            this.makeMakersNobrand(arr3,this.nonFranchise)
            this.makeMakersNobrand(arr4,this.nonFranchise)
            this.makeMakersNobrand(arr5,this.nonFranchise)
            this.brand = brand
            this.$nextTick(function(){
              this.cluster = this.makeCluster(this.queue.queue)
            })
          }else{
            let tmparr = []
            for (const value of brand) {
              let index = brandCkArr.indexOf(value.franchiseNo)
              if( index !== -1){
                tmparr.push(brandCkArr[index])
              }
            }
            this.oldBrandCk = tmparr
            this.brand = brand
          }

          this.mapLoading = false
        }
      })
    },
    async getOP404Fivetimes(code, ftcCate2Cd, rows){
      let promiseArr = []
      for(let i=1; i<=5; i++){
        let promise = new Promise((resolve, reject)=>{
          //console.log('404실행'+i)
          this.apiModel.getOP501(code, ftcCate2Cd, rows, `${i}`).then((result)=>{
            if(result.status === 200){
              //console.log('404응답'+i)
              //console.log(result.data)
              this.makeMakers(result,this.nonFranchise)
              resolve()
            }
          })
        })
        promiseArr.push(promise)
      }
      return Promise.all(promiseArr)
    },
    makersClean(){
      let tmp = undefined
      let length = this.queue.getQueueLength()
      //console.log(length)

      if(length !== 0){
        if(this.mapLevel > 5){
          let clusterer = this.cluster
          clusterer.clear()
        }
        for(let i=0; i<length; i++){
          tmp = this.queue.getQueue()
          if(typeof tmp === 'undefined'){
            break;
          }
          tmp.setMap(null)
        }
      }
      this.brandQueue.queue = []
    },
    async makersCleanPromise(){
      let tmp = undefined
      let length = this.queue.getQueueLength()
      //console.log('마커클린 실행')
      //console.log('기존 마커 갯수: '+length)
      let promise = new Promise((resolve, reject)=>{
        if(length !== 0){
          /* if(this.mapLevel > 5){

          } */
          let clusterer = this.cluster
            clusterer.clear()
          for(let i=0; i<length; i++){
            tmp = this.queue.getQueue()
            if(typeof tmp === 'undefined'){
              break;
              resolve()
            }
            tmp.setMap(null)
          }
        }
      })

      this.brandQueue.queue = []
      //return promise
    },
    estateMarkerClean(){

      let estateMarker = undefined
      let estateLength = this.estateQueue.getQueueLength()
      if(estateLength !== 0){
        let estateCluster = this.estateCluster
        estateCluster.clear()
        for(let i=0; i<estateLength; i++){
            estateMarker = this.estateQueue.getQueue()
            if(typeof tmp === 'undefined'){
              break;
            }
            estateMarker.setMap(null)
          }
      }
    },
    makeMakersNobrand(result, nonFranchise=false){
      let x = null
      let y = null
      //let tmpQueue = new Queue()
      let flag = null
      let overlay = null
      let closeBtnDom = null
      let marker = null

      for (const value of result) {
        x = Number(value.xAxis)
        y = Number(value.yAxis)

        if(!nonFranchise){
          if(value.isFranchise === '1'){
            marker = this.setMaker(x,y,value)
            overlay = this.setOverlay(marker,value)
            this.overlayEventListener(marker,overlay,value.bdMgtSn)
            this.queue.setQueue(marker)
          }
        }
        else {
          marker = this.setMaker(x,y,value)
          overlay = this.setOverlay(marker,value)

          this.overlayEventListener(marker,overlay,value.bdMgtSn)

          this.queue.setQueue(marker)
        }
      }
    },
    makeMakers(result, nonFranchise=false){
      let data = result.data.data
      let rows = data.rows
      let x = null
      let y = null
      let tmpQueue = new Queue()
      let flag = null
      let overlay = null
      let closeBtnDom = null
      let marker = null

      for (const value of rows) {
        //console.log(value)
        x = Number(value.xAxis)
        y = Number(value.yAxis)

        if(!nonFranchise){
          if(value.isFranchise === '1'){
            marker = this.setMaker(x,y,value)
            overlay = this.setOverlay(marker,value)
            this.overlayEventListener(marker,overlay,value.bdMgtSn)
            this.queue.setQueue(marker)
            flag = tmpQueue.setNoOverlapQue(value.franchiseNo)
          }
        }
        else {
          marker = this.setMaker(x,y,value)
          overlay = this.setOverlay(marker,value)

          this.overlayEventListener(marker,overlay,value.bdMgtSn)

          this.queue.setQueue(marker)
          flag = tmpQueue.setNoOverlapQue(value.franchiseNo)
        }
        if(!flag){
          this.setBrandQueue(value)
        }

      }

    },
    setMaker(x,y,value){
      let tmparr = [] = this.convGeo([x,y])
      let marker = new daum.maps.Marker({
          //map: this.mapInstance, // 마커를 표시할 지도
          position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
          title : value.refBnm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      })
      if(this.mapLevel !== 6){
        marker.setMap(this.mapInstance)
      }
      marker.setZIndex(100)
      return marker
    },
    setEstateMaker(x,y,memul_seq){
      let icon = new daum.maps.MarkerImage(
                'http://www.f-link.co.kr/src/assets/estateMarker.png',
                new daum.maps.Size(20, 30),
                {
                  offset: new daum.maps.Point(15, 30),
                  alt: memul_seq,
                  shape: "rect",
                  coords: "0,0,20,30"
                })
      let marker = new daum.maps.Marker({
          //map: this.mapInstance, // 마커를 표시할 지도
          image: icon,
          position: new daum.maps.LatLng(y, x), // 마커를 표시할 위치
          title : memul_seq, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      })
      /* if(this.mapLevel !== 6){
        marker.setMap(this.mapInstance)
      } */
      return marker
    },
    setOverlay(marker, value){
      let refBnm = value.refBnm
      refBnm = Base64.encode(refBnm)
      let img = value.img1
      if(img === '' || img === null || img === undefined){
        img = 'src/assets/fc_noimg_166166.jpg'
      } else {
        // console.log(img)
        img = "//file.mk.co.kr"+img.slice(12)
      }
      let url = `http://www.f-link.co.kr/storeView/${this.ftcCate2Cd}/${refBnm}/${value.bdMgtSn}`
      if(location.hostname === "110.13.170.148"){
			  url = `http://110.13.170.148:8080/storeView/${this.ftcCate2Cd}/${refBnm}/${value.bdMgtSn}`
		  }
      //console.log(refBnm.length)
      /* if(refBnm.length > 15){
        refBnm = refBnm.slice(0,15)
        refBnm = refBnm+".."
      } */
      let content =
      `<!-- 지점선택박스-->
				<div class="branch">
					<div class="branch_box">
						<h4><span class="brand_name">${value.refBnm}</span><span class='close_btn'><a href='#none' id='img${value.bdMgtSn}'><img src="http://img.mk.co.kr/2018/franchise/btn_close1.gif" alt="닫기"></a></span></h4>
						<div class="branch_content_wrap">
              <img src="${img}" alt="${value.refBnm}" class="logo">
              <div class="branch_right_box">
                <div class="branch_right_text">
                  <p>전화번호 : ${value.tel}</p>
                  <p>주소 : ${value.addr}</p>
                </div>
                <a href='${url}'><button type='button'>자세히 보기</button></a>
              </div>
            </div>
					</div>
					<p class="box_bottom"><img src="http://img.mk.co.kr/2018/franchise/box_bottom.png"></p>
				</div>
			<!-- //지점선택박스-->`
      let overlay = new daum.maps.CustomOverlay({
        content: content,
        position: marker.getPosition(),

      })
      overlay.setZIndex(100)
      return overlay
    },
    overlayEventListener(marker,overlay,bdMgtSn){
      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      daum.maps.event.addListener(marker, 'click', ()=>{
          overlay.setMap(this.mapInstance);
          let closeBtnDom = document.getElementById('img'+bdMgtSn)
            closeBtnDom.addEventListener('click',()=>{
            overlay.setMap(null)
          })
      })
      /* daum.maps.event.addListener(closeBtnDom, 'click', ()=>{
          overlay.setMap(null);
      }) */
    },
    setBrandQueue(value){
      if(value.isFranchise === '1'){
        if(value.brand !== null && value.brand !== ''){
          let data = {
            franchiseNo : value.franchiseNo,
            brand : value.brand
          }
          this.brandQueue.setQueue(data)
        }
      }
    },
    makeCluster(markers){
      let clusterer = new daum.maps.MarkerClusterer({
        map: this.mapInstance,
        markers: markers,
        gridSize: 120,
        averageCenter: true,
        minLevel: 6,
        disableClickZoom: true,
        styles: [{
          width: '82px',
          height: '88px',
          textAlign: 'center',
          background: 'url(http://img.mk.co.kr/2018/franchise/store_icon01.png) no-repeat',
          color: '#fff',
          fontSize: '25px',
          fontWeight: '500',
          paddingTop: '30px'
        }]
      })
      return clusterer
    },
    makeClusterEstate(markers){
      let clusterer = new daum.maps.MarkerClusterer({
        map: this.mapInstance,
        markers: markers,
        gridSize: 120,
        averageCenter: true,
        minLevel: 3,
        disableClickZoom: true,
        styles: [{
          width: '85px',
          height: '85px',
          backgroundColor: '#14a114',
          opacity: '0.7',
          color: '#fff',
          fontSize: '25px',
          fontWeight: '500',
          position: 'absolute',
          borderRadius: '50px',
          textAlign: 'center',
          lineHeight: '80px'
        }]
      })
      clusterer.setMinClusterSize(2)
      return clusterer
    },
    recommBldOnOff(){
      if(!this.RecommBld){
        this.RecommBld = true
        this.RecommLayer = true
        // this.mapInstance.setDraggable(false)
        this.mapInstance.setLevel(3)
        this.estateMarkerClean()
      } else{
        this.RecommBld = false
        this.RecommLayer = false
        this.recommMarkerClean()
        // this.mapInstance.setDraggable(true)
      }
    },
    getRecommBld(data){
      this.recommMarkerClean()
      this.apiModel.getOP407(this.RecommCcode,data,'100').then((result)=>{
        if(result.status === 200){
          //console.log(result)
          this.makeRecommList(result)
        }
      })

    },
    makeRecommList(result){
      let data = result.data.data
      let rows = data.rows
      let idx = 0
      for (const value of rows) {
        this.RecommQueue.setQueue(value)
        this.searchCoordsFromAddr(value, idx)
        idx++
      }
      this.RecommList = this.RecommQueue.getQueueAll()
    },
    searchCoordsFromAddr(value, idx){
      // 주소로 좌표를 검색합니다
      this.geoCoder.addressSearch(value.addr, (result, status) => {

          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {

              let coords = new daum.maps.LatLng(result[0].y, result[0].x)

              let icon = new daum.maps.MarkerImage(
                'http://img.mk.co.kr/2018/franchise/icon_loca02.png',
                new daum.maps.Size(20, 30),
                {
                  offset: new daum.maps.Point(15, 30),
                  alt: value.buldNm,
                  shape: "rect",
                  coords: "0,0,20,30"
                })

              // 결과값으로 받은 위치를 마커로 표시합니다
              let marker = new daum.maps.Marker({
                  map: this.mapInstance,
                  position: coords,
                  image: icon,
                  title: value.addr
              });

              marker.setZIndex(10);

              this.RecommMarkers.setQueue(marker)

              if(idx === 1){
                this.mapInstance.setCenter(coords)
              }

              daum.maps.event.addListener(marker, 'click', () => {
                this.mapInstance.setCenter(coords)
              })

              // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
              let iwContent = `<div style="padding:5px;height:65px;">${value.addr}<br/>${value.buldNm}</div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

              // 인포윈도우를 생성합니다
              let infowindow = new daum.maps.InfoWindow({
                  content : iwContent
              })
              infowindow.setZIndex(100)

              // 마커에 마우스오버 이벤트를 등록합니다
              daum.maps.event.addListener(marker, 'mouseover', () => {
                // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                  infowindow.open(this.mapInstance, marker)
              })

              // 마커에 마우스아웃 이벤트를 등록합니다
              daum.maps.event.addListener(marker, 'mouseout', () => {
                  // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                  infowindow.close()
              })

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              /* var infowindow = new daum.maps.InfoWindow({
                  content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
              });
              infowindow.open(map, marker); */

          }
      })
    },
    recommMarkerClean(){
      let tmp = undefined
      let length = this.RecommMarkers.getQueueLength()

      if(length !== 0){
        this.RecommList = []
        for(let i=0; i<length; i++){
          tmp = this.RecommMarkers.getQueue()
          if(typeof tmp === 'undefined'){
            break;
          }
          tmp.setMap(null)
        }
      }
    },
    getEstateList(code){
      this.estateMarkerClean()
      let sggCd = code+'00000'
      let pageNo = '1'
      let rows = 100
      let markers = []
      this.apiModel.getEstateList(pageNo,rows,sggCd).then((result)=>{
        if(result.status === 200){
          //console.log(result)
          let data = result.data
          //console.log(data)
          if(typeof data === 'string'){
						data = data.replace(/\r/g, "")
						data = data.replace(/\\r/g, "")
						data = data.replace(/\n/g, "")
						data = data.replace(/\\n/g, "")
						data = data.replace(/\\'/g, "")
            //console.log("파싱에러")
            data1 = eval("("+data+")")
            //data = JSON.parse(data)
            
        	}
          let paging = data.shift()
          for (const value of data) {
            // if(value.month_deposit_price === 0 && value.month_price){
            //   continue
            // }
            let img = value.img_url
            if(img === ''){
              img = '/src/assets/fc_noimg_263168.jpg'
            }
            else {
              let tmparr = []
              tmparr = img.split( ',', 2 )
              img = tmparr[0]
              let str = img.replace("http://image.bizmk.kr", "")
              let res = str.search("http://image.bizmk.kr")
              if(res === -1){
                str = 'http://image.bizmk.kr'+str
              }
              img = str
            }
            value.img_url = img
            let marker = this.setEstateMaker(value.xpos, value.ypos, value.memul_seq)
            markers.push(marker)
            this.estateQueue.setQueue(marker)
          }
          let clusterer = this.makeClusterEstate(markers)
          this.estateCluster = clusterer
          this.estateClusterAddEventListener(clusterer)
          let listArr = []
          let i = 1
          for (const value of data) {
            listArr.push(value)
            if(i === 10){
              break
            }
            i++
          }
          if( this.clusterClick === ''){
            this.estateList = listArr
          }
          
        }
      })

    },
    estateClusterAddEventListener(clusterer){
      let clustererObj = clusterer
      daum.maps.event.addListener( clusterer, 'clusterclick', ( cluster ) => {
        let clickStyles = {
          width:'85px',
          height:'85px',
          backgroundColor:'#4db007',
          opacity:'1.0',
          border:'8px solid #fff',
          color:'#fff',
          fontSize:'25px',
          fontWeight:'500',
          position:'absolute',
          borderRadius:'50px',
          textAlign:'center',
          lineHeight:'80px'
        }
        
        let defaultStyles = {
          width: '82px',
          height: '88px',
          textAlign: 'center',
          background: 'url(http://img.mk.co.kr/2018/franchise/store_icon01.png) no-repeat',
          color: '#fff',
          fontSize: '25px',
          fontWeight: '500',
          paddingTop: '30px'
        }

        //clustererObj.setStyles(styles)
        //console.log(clustererObj._clusters)
        /* for (const value of clustererObj._clusters) {
          
          this.domStyleObjSet(value._content, defaultStyles)
        } */
        
        //this.domStyleObjSet(cluster._content, clickStyles)
        //console.log(cluster._content)

        
        let markers = cluster.getMarkers()
        let i=1
        let str = ''
        for (const value of markers) {
          //console.log("매물번호:"+value.Xd)
          str+= `${value.Xd},`
          if(i === 10){
            break
          }
          i++
        }
        str = str.slice(0,-1)
        this.clusterClick = str
        //console.log( cluster.getCenter() );
      })
    },
    domStyleObjSet(dom, styles){
      console.log('스타일 변경')
      console.log(dom)
      dom.style = null
      for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
          const element = styles[key];
          //console.log(element)
          //console.log(dom.style.key)
          dom.style.key = element
          console.log(dom.style.key)
        }
      }
    },
    /* keymonitor(event){
      console.log(event.key)
       if(event.key == "Enter")
       {
         if(this.franchiseSelected){
           location.href = `./franchiseView/${this.franchiseSelectedCode}`
         }
         //console.log("enter key was pressed!");
         return false
       }
    }, */
    async addressTogeocode(address) {
      let geocoder = new daum.maps.services.Geocoder();
      //let coords = ''
      //console.log("address:" + address);
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
      })
    },
    setMapCenter(coords) {
      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      if (this.mapInstance !== "") {
        this.mapInstance.setCenter(coords);
      }
    },
    infoPopAuto(time) {
      if(!this.infoPop){
        setTimeout(()=>{ this.infoPop = true }, time)
        setTimeout(()=>{ this.infoPop = false }, time+6000)
      }
    },
    estateClusterList(seq){
      this.apiModel.getEstateListToSeq(seq).then((result)=>{
        if(result.status === 200){
          //console.log(result.data)
          let data = result.data
          let paging = data.shift()
          for (const value of data) {
            let img = value.img_url
            if(img === ''){
              img = '/src/assets/fc_noimg_263168.jpg'
            }
            else {
              let tmparr = []
              tmparr = img.split( ',', 2 )
              img = tmparr[0]
              let str = img.replace("http://image.bizmk.kr", "")
              let res = str.search("http://image.bizmk.kr")
              if(res === -1){
                str = 'http://image.bizmk.kr'+str
              }
              img = str
            }
            value.img_url = img
            let subwayInfo = value.subway_info
            subwayInfo = subwayInfo.split(',')
            let str = ''
            if(subwayInfo.length > 1){
              str = `${subwayInfo[0]}, ${subwayInfo[1]}`
            }else{
              str = subwayInfo[0]
            }
            value.subway_info = str
          }
          this.estateList = data
        }
      })
    }

  }


}
</script>

<style>
.store_map {
  height: 835px;
}
.branch {
    width: 300px;
    height: 210px;
    position: absolute;
    bottom: 40px;
    left: -145px;
    z-index: 1000;
}
.branch_box {
    width: 300px;
    height: 190px;
    border: 1px solid #9fa29e;
    background-color: #fff;
}
.branch_box h4 {
    font-size: 17px;
    color: #fff;
    background-color: #656565;
    width: 285px;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    font-weight: 400;
    margin-bottom: 20px;
    overflow: hidden;
}
.branch_box .logo {
    width: 100px;
    margin: 0 15px 15px 10px;
    float: left;
}
.branch_box p {
    color: #888;
    font-weight: 400;
}
.branch_box button {
    width: 90px;
    height: 22px;
    border: 1px solid #2c3d63;
    color: #2c3d63;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 5px!important;
    margin-bottom: 5px!important;
    font-size: 13px;
}
.branch .box_bottom {
    z-index: 10000;
    position: absolute;
    bottom: 4px;
    left: 140px;
}
.branch_box h4 .close_btn {
    margin:0 12px;
    /* position: absolute;
    right: 0; */
    float: right;
}
.branch_content_wrap {
  overflow: hidden;
}
.branch_content_wrap img {
  float: left;
}
.branch_right_box {
  overflow: hidden;
  float: right;
  padding: 5px;
}
.branch_right_box p {
  width: 165px;
  word-break:break-all;
  white-space: pre-line;
}
.branch_right_text{
  height: 80px;
  overflow: hidden;
}
.brand_name{
  float: left;
  width: 240px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal !important;
  display: block;
}
.building {
  z-index: 1000 !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.info_pop {
  top : 15px;
}
.loadImg {
	/* margin: 0 auto; */
  position: absolute;
  top: 0px;
  left: 45%;
	padding-top: 20%;
	display: block;
  z-index: 100000000;
}
.mapLoadingWrap {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%;
  height:100%;
  z-index: 100000;
}
.mapLoading {
  /* position: absolute; 
  top: 0; 
  left: 0;  */
  width: 100%;
  height:100%;
  z-index: 100000;
  background-color: rgb(219, 218, 218); 
  opacity: 0.65; 
  filter: alpha(opacity=65);
}
</style>
