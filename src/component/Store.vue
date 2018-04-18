<template>
  <div id="content">
    <div id="map">
      <AddrArea :addr="addr"></AddrArea>
    </div>
  </div>
</template>

<script>
import AddrArea from "./AddrArea.vue"
import proj4 from "proj4"
export default {
  name: 'store',
  data () {
    return {
      addr: '서울특별시 중구',
      centerCode : '',
      mapInstance: ''
    }
  },
  props:{
  },
  components:{
    AddrArea
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
      this.mapInstance = map
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

      this.mapEventListener(map,geocoder,this)
      this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)

      this.$EventBus.$on('setCenterMethod', this.setCenterMap)

      this.$EventBus.$on('setPolyonMethod', this.setPolygon)


      this.setPolyline()
    })

  },
  methods:{
    setAddr(data){
      this.addr = data;
    },
    getMapInstance(){
      return this.mapInstance
    },
    mapEventListener(map,geocoder,vm){
      let result;
      let status;
      daum.maps.event.addListener(map, 'dragend', () => {
          //console.log(map.getCenter())
          this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)

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
                    this.setAddr(addrText+"/ 법정동코드: "+code)
                    if( this.centerCode !== code ){
                      this.centerCode = code
                      this.getFranchiseList()
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
        fillOpacity: 0.4
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
    getFranchiseList(){
      const baseURI = 'http://www.f-link.co.kr';
      let config = {
        method: 'post',
        url: `${baseURI}/container/OP-402.php`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          'pageNo':'1',
          'row':'50',
          'emdCd':this.centerCode,
          'franchiseNo':'20080100047'
        }
      }
      this.$http(config)
      .then((result) => {
        //console.log(result)
        if(result.status === 200){
          //let data = result.data.data
          let rows = data.rows
          //console.log(rows)
          let position = []
          let positionObj = new Object()
          let x = null
          let y = null
          let tmparr = []
          for (const value of rows) {
            x = value.xAxis
            x = Number(x)
            y = value.yAxis
            y = Number(y)
            tmparr = this.convGeo([x,y])
            positionObj = {
              title: value.refBnm,
              latlng: new daum.maps.LatLng(tmparr[1], tmparr[0])
            }
            position.push(positionObj)
          }

          for (const val of position) {
            let marker = new daum.maps.Marker({
                  map: this.mapInstance, // 마커를 표시할 지도
                  position: val.latlng, // 마커를 표시할 위치
                  title : val.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            });
          }
        }

      })
    }
  }

}
</script>

<style>
#map {
  height: 75vh;
  width: 100vw;
}
</style>
