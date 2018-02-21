<template>
  <div id="app">
    <div id="map">
      <addr-area></addr-area>
    </div>
  </div>
</template>

<script>
import addr-area from "./component/addr-area.vue"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    AddrArea
  },
  mounted() {
    this.$nextTick(function () {
      // 모든 화면이 렌더링된 후 실행합니다.
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
      	center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      	level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

      // daum.maps.event.addListener(map, 'center_changed', function() {
      //   let latlng = map.getCenter();
      //
      // })

    })
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
