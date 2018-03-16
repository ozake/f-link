<template>
  <div id="app">
    <div id="map">
      <AddrArea :addr="addr"></AddrArea>
    </div>
  </div>
</template>

<script>
import AddrArea from "./component/AddrArea.vue"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      addr: ''
    }
  },
  components:{
    AddrArea
  },
  mounted() {
    this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.
      console.log("지도 셋팅 시작")
      let mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.RIGHT_CENTER
        }
      };

      let map = new naver.maps.Map('map', mapOptions);

      this.mapCenterEvListener(map, this)



      /*
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
      	center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      	level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new daum.maps.services.Geocoder();
      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      var mapTypeControl = new daum.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new daum.maps.ZoomControl();
      map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
      */
      console.log("지도 셋팅 완료")

      //this.mapEventListener(map,geocoder,this)

    })
  },
  computed: {

  },
  methods:{
    setAddr(data){
      this.addr = data;
    },
    mapCenterEvListener(map,vm){
      naver.maps.Event.addListener(map, 'bounds_changed', (bounds) => {
        let CenterLatlng = map.getCenter()
        let lat = CenterLatlng._lat
        let lng = CenterLatlng._lng
        this.addrSerachByGeocode(lat,lng)
        //console.log(CenterLatlng._lat+" "+CenterLatlng._lng)
        //contentEl.find('.center').text(map.getCenter());
        //contentEl.find('.bounds').text(bounds);
      });
    },
    addrSerachByGeocode(lat, lng){
          naver.maps.Service.reverseGeocode({
            location: new naver.maps.LatLng(lat, lng),
          }, (status, response) => {
              if (status !== naver.maps.Service.Status.OK) {
                  return alert('Something wrong!');
              }

              let result = response.result // 검색 결과의 컨테이너
              let items = result.items // 검색 결과의 배열
              let dong = items[2].addrdetail.dongmyun
              console.log(items)
              if(this.addr !== dong){
                this.setAddr(dong)
              }
              // do Something
          });
    }
    /*
    mapEventListener(map,geocoder,vm){
      let result;
      let status;
      daum.maps.event.addListener(map, 'idle', function() {
          vm.searchAddrFromCoords(geocoder, map.getCenter(), vm.displayCenterInfo);
      });
    },
    searchAddrFromCoords(geocoder,coords,callback){
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    },
    displayCenterInfo(result, status) {
      let addrText = '';
        if (status === daum.maps.services.Status.OK) {
            //var infoDiv = document.getElementById('centerAddr');

            for(let i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    addrText = result[i].address_name
                    this.setAddr(addrText)
                    break;
                }
            }
        }
    }
    */

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
