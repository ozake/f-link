<template>
  <div id="app">
    <div id="map">
      <AddrArea :addr="addr"></AddrArea>
    </div>
  </div>
</template>

<script>
import AddrArea from "./component/AddrArea.vue"
import proj4 from "proj4"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      addr: '제주특별자치도 제주시 아라동'
    }
  },
  props:{
    mapInstance: ''
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
      	center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
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

      this.$EventBus.$on('setCenterMethod', this.setCenterMap)

      this.setPolygon()

      this.setPolyline()

    })
  },
  computed: {

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
          console.log(map.getCenter())
          this.searchAddrFromCoords(geocoder, map.getCenter(), this.displayCenterInfo)
          //this.searchRegionCode(geocoder,map.getCenter())
      });
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
      console.log(x+":"+y)
      this.mapInstance.setCenter(new daum.maps.LatLng(x, y))
    },
    setPolygon(){

      let goeArr = []
      goeArr.push(this.convGeo([955114.49242179352, 1943186.4108217508]))
      goeArr.push(this.convGeo([955064.24744448217, 1943236.1263784165]))
      goeArr.push(this.convGeo([954862.73808835587, 1943534.9490568016]))
      goeArr.push(this.convGeo([954761.71865437087, 1943734.3405943983]))
      goeArr.push(this.convGeo([954760.92443047545, 1943884.2813369506]))
      goeArr.push(this.convGeo([954910.07094593858, 1944035.016340144]))
      goeArr.push(this.convGeo([955059.48222152225, 1944135.7711286196]))
      goeArr.push(this.convGeo([955159.44276062737, 1944136.3006469328]))
      goeArr.push(this.convGeo([955313.08995182486, 1943437.3710399347]))
      goeArr.push(this.convGeo([955313.35467155755, 1943387.3907623137]))
      goeArr.push(this.convGeo([955313.61938857054, 1943337.4104846735]))
      goeArr.push(this.convGeo([955313.88410285907, 1943287.4302070139]))
      goeArr.push(this.convGeo([955164.47269307729, 1943186.6755291929]))
      goeArr.push(this.convGeo([955114.49242179352, 1943186.4108217508]))
      console.log(goeArr)


      let polygon = new daum.maps.Polygon({
        map: this.mapInstance,
        path: [
            new daum.maps.LatLng(goeArr[0][1], goeArr[0][0]),
            new daum.maps.LatLng(goeArr[1][1], goeArr[1][0]),
            new daum.maps.LatLng(goeArr[2][1], goeArr[2][0]),
            new daum.maps.LatLng(goeArr[3][1], goeArr[3][0]),
            new daum.maps.LatLng(goeArr[4][1], goeArr[4][0]),
            new daum.maps.LatLng(goeArr[5][1], goeArr[5][0]),
            new daum.maps.LatLng(goeArr[6][1], goeArr[6][0]),
            new daum.maps.LatLng(goeArr[7][1], goeArr[7][0]),
            new daum.maps.LatLng(goeArr[8][1], goeArr[8][0]),
            new daum.maps.LatLng(goeArr[9][1], goeArr[9][0]),
            new daum.maps.LatLng(goeArr[10][1], goeArr[10][0]),
            new daum.maps.LatLng(goeArr[11][1], goeArr[11][0]),
            new daum.maps.LatLng(goeArr[12][1], goeArr[12][0]),
            new daum.maps.LatLng(goeArr[13][1], goeArr[13][0])
        ],
        strokeWeight: 2,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8,
        strokeStyle: 'dashed',
        fillColor: '#00EEEE',
        fillOpacity: 0.5
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
    }


  }

}
</script>

<style>
body {
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin-top: 5vh;

}

#map {
  height: 95vh;
  width: 100vw;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
