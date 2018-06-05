<template>
  <div id="content">
    <SubHeaderTitle :title="this.title" :subTitle="txt" :flag="flag"></SubHeaderTitle>
		<div class="frlist">
      <!--프랜차이즈 현황 리스트-->
			<div class="thlistbox">
        <CardBoxNbtn1 v-for="(item, index) in listItems" :index="index" :item="item"></CardBoxNbtn1>
			</div>
			<!--//프랜차이즈 현황 리스트-->

      <!--페이징-->
  </div>


  </div>
</template>
<script>
import SubHeaderTitle from './component/SubHeaderTitle.vue'
import CardBoxNbtn1 from './component/CardBoxNbtn.1.vue'
import Pagination from './component/Pagination.vue'
import ApiModel from './model/apiModel';
import numeral from "numeral"
export default {
  name: 'estate-list',
  components:{
    SubHeaderTitle,
    CardBoxNbtn1,
    Pagination
  },
  data(){
    return {
      listItems : '',
      title : '프랜차이즈 링크가 엄선한 상가 매물 입니다.',
      subTitle : '',
      apiModel : new ApiModel(this.$http),
      totalCount : 0,
      currentPage : 1,
      pageingRange : 10,
      pageRows : 16,
      routeName : 'scapital-list',
      flag: 'sCaptial',
      txt:'',
      addr: {
          "1168000000" : "강남구",
          "1174000000" : "강동구",
          "1130500000" : "강북구",
          "1150000000" : "강서구",
          "1162000000" : "관악구",
          "1121500000" : "광진구",
          "1153000000" : "구로구",
          "1154500000" : "금천구",
          "1135000000" : "노원구",
          "1132000000" : "도봉구",
          "1123000000" : "동대문구",
          "1159000000" : "동작구",
          "1144000000" : "마포구",
          "1141000000" : "서대문구",
          "1165000000" : "서초구",
          "1120000000" : "성동구",
          "1129000000" : "성북구",
          "1171000000" : "송파구",
          "1147000000" : "양천구",
          "1156000000" : "영등포구",
          "1117000000" : "용산구",
          "1138000000" : "은평구",
          "1111000000" : "종로구",
          "1114000000" : "중구",
          "1126000000" : "중랑구",
          "4182000000" : "가평군",
          "4128100000" : "고양시 덕양구",
          "4128500000" : "고양시 일산동구",
          "4128700000" : "고양시 일산서구",
          "4129000000" : "과천시",
          "4121000000" : "광명시",
          "4161000000" : "광주시",
          "4131000000" : "구리시",
          "4141000000" : "군포시",
          "4157000000" : "김포시",
          "4136000000" : "남양주시",
          "4125000000" : "동두천시",
          "4119000000" : "부천시",
          "4113500000" : "성남시 분당구",
          "4113100000" : "성남시 수정구",
          "4113300000" : "성남시 중원구",
          "4111300000" : "수원시 권선구",
          "4111700000" : "수원시 영통구",
          "4111100000" : "수원시 장안구",
          "4111500000" : "수원시 팔달구",
          "4139000000" : "시흥시",
          "4127300000" : "안산시 단원구",
          "4127100000" : "안산시 상록구",
          "4155000000" : "안성시",
          "4117300000" : "안양시 동안구",
          "4117100000" : "안양시 만안구",
          "4163000000" : "양주시",
          "4183000000" : "양평군",
          "4167000000" : "여주시",
          "4180000000" : "연천군",
          "4137000000" : "오산시",
          "4146300000" : "용인시 기흥구",
          "4146500000" : "용인시 수지구",
          "4146100000" : "용인시 처인구",
          "4143000000" : "의왕시",
          "4115000000" : "의정부시",
          "4150000000" : "이천시",
          "4148000000" : "파주시",
          "4122000000" : "평택시",
          "4165000000" : "포천시",
          "4145000000" : "하남시",
          "4159000000" : "화성시"
        }
    }
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    /* $route: function () {
      this.currentPage = this.$route.params.page
      this.$nextTick(function(){
        this.getScapitalBest(this.currentPage)
      })
    } */
  },
  created(){
    this.$EventBus.$emit('HeaderActive', 'store')
    this.getEstateList(this.$route.params.code)
    console.log('addr')
    let addr = this.addr
    let code = this.$route.params.code
    for (const key in addr) {
      /* if (object.hasOwnProperty(key)) {
        const element = addr[key];
        console.log(element)
      } */
      /* if(key === code){
        console.log(addr[key])
      } */
      if(key === code){
        this.txt = addr[key]
      }
      // console.log(key+'::'+code)
      
    }
    
    
    
    /* if(this.$route.params.page){
      this.currentPage = Number(this.$route.params.page)
    } */
    //this.getScapitalBest(this.currentPage)
  },
  methods: {
    getEstateList(code){
      let sggCd = code+'00000'
      console.log('부동산리스트')
      console.log(code)
      let pageNo = '1'
      let rows = 100
      let markers = []
      this.apiModel.getEstateList(1,16,sggCd).then((result)=>{
        if(result.status === 200){
          console.log(result)
          let data = result.data
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
            //let marker = this.setEstateMaker(value.xpos, value.ypos, value.memul_seq)
            //markers.push(marker)
            //this.estateQueue.setQueue(marker)
          }
          this.listItems = data
          //let clusterer = this.makeClusterEstate(markers)
          //this.estateCluster = clusterer
          //this.estateClusterAddEventListener(clusterer)
          /* let listArr = []
          let i = 1
          for (const value of data) {
            listArr.push(value)
            if(i === 10){
              break
            }
            i++
          } */
          /* if( this.clusterClick === ''){
            this.estateList = listArr
          } */
          
        }
      })

    },
    getScapitalBest(page) {
        let rPage = page - 1
        this.apiModel.getScapitalBest(rPage).then((result)=>{
        if(result.status === 200){
          let data = result.data
          //console.log(result)
          let paging = data.shift()
          this.totalCount = Number(paging.totalCount)
          this.currentPage = Number(paging.pageNo) + 1
          console.log(paging)
          for (const value of data) {
            let total = value.total
              total = total.slice(0,-1)
              total = Number(total)
              total = numeral(total).format('0,0')
            value.total = total
            let img2 = value.img2
            if(img2 === ''){
              img2 = "/src/assets/fc_noimg_253128.jpg"
            }else{
              img2 = "//file.mk.co.kr"+img2.slice(12)
            }
            value.img2 = img2
          }
          this.listItems = data
        }
      })
    }
  }
}
</script>
