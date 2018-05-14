<template>
  <div id="content">
    <!-- 지도영역-->
		<div class="store_map" id="map">
      <AddrArea :addr="addr"></AddrArea>
    </div>
    <AsideMap :brand="brand" :isIe="isIe" :updateFlag="updateFlag"></AsideMap>
  </div>
</template>

<script>
import AddrArea from "./AddrArea.vue"
import AsideMap from "./AsideMap.vue"
import proj4 from "proj4"
import ApiModel from "../model/apiModel.js"
import { Queue } from '../model/colections';
export default {
  name: 'store',
  data () {
    return {
      addr: '서울특별시 중구',
      centerCode : '',
      mapInstance: '',
      ftcCate2Cd : '',
      FcenterCode : '',
      isFranchise : false,
      mapLevel : '',
      queue : new Queue(),
      geoCoder : '',
      brand : [],
      brandQueue : new Queue(),
      isIe : false,
      apiModel : new ApiModel(this.$http),
      franchiseNo : '',
      updateFlag : true
    }
  },
  props:{
  },
  components:{
    AddrArea,
    AsideMap
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
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd,this.FcenterCode)
      })
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
      if(this.mapLevel <= 3){
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd,this.FcenterCode)
      }
      else{
        this.getFranchiseList(this.centerCode,this.ftcCate2Cd)
      }
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
      this.$nextTick(function() {
        this.makersClean()
        this.getBrandList(this.centerCode,this.franchiseNo)
      })
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
                    fullCode = fullCode.substring(0,8)
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
          console.log(result)
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
      console.log("goeArrStart")
      console.log(goeArr)
      let pathArr = []
      for(let value of goeArr){
        pathArr.push(new daum.maps.LatLng(value[1],value[0]))
      }
      console.log(pathArr)


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
      console.log("폴리라인")
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
      let rows = '1000'
      this.makersClean()
      let idx = 1
      for (const value of this.franchiseNo) {
        this.apiModel.getOP405(code, value, '1000', '1').then((result)=>{
          if(result.status === 200){
            this.makeMakers(result)
            this.updateFlag = false
          }
        })
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
      //let model = new ApiModel(this.$http)
      let emdCd = ''
      let rows = '100'
      this.updateFlag = true
      if(this.isIe === true){
        rows = '30'
      }
      if(this.mapLevel <= 3){
        emdCd = fullCode
        rows = '1000'
        console.log('404실행1')
        this.makersClean()
        this.apiModel.getOP404(code, ftcCate2Cd, rows, '1', emdCd).then((result)=>{
          if(result.status === 200){
            console.log('404응답1')
            this.makeMakers(result,this.isFranchise)
            this.brand = this.brandQueue.getQueueAll()
          }
        })
      }
      else {
        this.makersClean()
        this.getOP404Fivetimes(code, ftcCate2Cd, rows).then(()=>{
          this.brand = this.brandQueue.getQueueAll()
        })
      }
    },
    async getOP404Fivetimes(code, ftcCate2Cd, rows){
      let promiseArr = []
      for(let i=1; i<=5; i++){
        let promise = new Promise((resolve, reject)=>{
          console.log('404실행'+i)
          this.apiModel.getOP404(code, ftcCate2Cd, rows, `${i}`).then((result)=>{
            if(result.status === 200){
              console.log('404응답'+i)
              this.makeMakers(result,this.isFranchise)
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
      if(length !== 0){
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
    makeMakers(result, isFranchise=false){
      let data = result.data.data
      let rows = data.rows
      let x = null
      let y = null
      let tmpQueue = new Queue()
      let flag = null

      for (const value of rows) {
        //console.log(value)
        x = Number(value.xAxis)
        y = Number(value.yAxis)
        let marker = null
        if(isFranchise){
          if(value.isFranchise === '1'){
            marker = this.setMaker(x,y,value)
            this.queue.setQueue(marker)
            flag = tmpQueue.setNoOverlapQue(value.franchiseNo)
          }
        }
        else {
          marker = this.setMaker(x,y,value)
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
          map: this.mapInstance, // 마커를 표시할 지도
          position: new daum.maps.LatLng(tmparr[1], tmparr[0]), // 마커를 표시할 위치
          title : value.refBnm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      })
      return marker
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
    }
  }

}
</script>

<style>
.store_map {
  height: 835px;
}
</style>
