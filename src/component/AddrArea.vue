<template>
  <div class="hAddr">
        <span class="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr">{{ addr }}</span>
  </div>
</template>
<style>
.title {font-weight:bold;display:block;}
.hAddr {position:absolute;left:10px;top:10px;border-radius: 2px;background:#fff;background:rgba(255,255,255,0.8);z-index:100;padding:5px;}
#centerAddr {display:block;margin-top:2px;font-weight: normal;}
.bAddr {padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
</style>
<script>
import proj4 from "proj4"
import DataPaser from "../model/dataPaser.js"
//import JsonParser from "../model/json-parser.js"
export default {
  name: 'AddrArea',

  props: ['addr', 'setCenterMethod'],
  methods: {
    convertGeocord(){
      proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"
      let firstProjection = proj4.defs('EPSG:5179')
      let secondProjection = proj4.defs('EPSG:4326')

      let convertRes = proj4(firstProjection,secondProjection,[955114.49242179352,1943186.4108217508])
      this.$EventBus.$emit('setCenterMethod', 37.570718567288466,126.97763237920154)
      this.jsonAxios()
      //onst JsonPaser = new JsonParser()
      //let res = JsonPaser.loadfile()
      //console.log(res)
      //let proj4 = new proj4()
    },
    jsonAxios(){
      const baseURI = 'http://www.f-link.co.kr';
      let config = {
        method: 'post',
        url: `${baseURI}/container/OP-413.php`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          'baseXycrd':'126.98037.571',
          'bdMgtSn':'1111012200100240000032840'
        }
      }
      this.$http(config)
      .then((result) => {
        console.log(result)
        //console.log(result.status)
        if(result.status === 200){
          //let res = JSON.parse(result.data)
          let data = result.data.data.rows[0]
          //console.log(data)
          let dataGeo = JSON.parse(data.geomJson)
          console.log(dataGeo.coordinates[0])

          let parser = new DataPaser(data)
          //console.log(parser.hinterlandGeocode())
          //console.log()
          this.$EventBus.$emit('setPolyonMethod', parser.hinterlandGeocode())
          this.$EventBus.$emit('setCenterMethod', 37.570718567288466,126.97763237920154)
        }

      })
    }
  }
}

</script>
