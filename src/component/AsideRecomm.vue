<template>
    <!-- 건물추천서비스 레이어-->
    <div class="aside_building">
        <h5>
            <img src="http://img.mk.co.kr/2018/franchise/icon_building.png" alt="건물아이콘" >
            건물 추천서비스
            <a href="#none" v-on:click="recommOff"><img src="http://img.mk.co.kr/2018/franchise/btn_close2.png" alt="닫기" class="close" ></a>
        </h5>
        <ul v-bind:style="styles" style="overflow-y: auto;" class="scroll">
            <li class="question">이 지역에서 {{categoryName}} 업종 창업 시,<br>가장 유망한 위치는 어디?</li>
            <router-link :to="{ name: 'store-view', params: {storeName: '7LaU7LKc6rG066y8', id:item.bdMgtSn , categoryCode:RecommCategory } }" target="_blank" v-for="item in data" style="color: #fff;">
            <li class="bu_list" >
                    <img src="http://img.mk.co.kr/2018/franchise/icon_loca02.png" alt="건물위치 아이콘" >{{item.addr}}
                    <p>{{item.buldNm}}</p>
            </li>
            </router-link>
            <li class="caution">※ 본 추천 서비스는 매출 통계를 활용한 추천이며, <br> 본사는 추천에 대한 책임을 지지 않습니다. </li>
        </ul>
    </div>
    <!-- //건물추천서비스 레이어-->
</template>
<script>
export default {
  name: 'AsideRecomm',
  props: {
      data: Array,
      categoryName: String,
      RecommCategory: String
  },
  computed: {
    styles: function() {
      let height = window.innerHeight - 170

      return {
        height: height + 'px'
      }
    },
  },
  methods: {
      recommOff(){
          this.$EventBus.$emit('recommOnOff')
      }
  }
}
</script>
<style scoped>
/* chrome scroll */
.scroll::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: #fff;
}
.scroll::-webkit-scrollbar {
	width: 3px;
	background-color: #F5F5F5;
}
.scroll::-webkit-scrollbar-thumb {
	border-radius: 10px;
    background: rgba(51, 51, 51, 0.5);
}
/* ie scroll edge는 불가 */
.scroll {
    scrollbar-arrow-color: #fff;
    scrollbar-Face-Color: #eaeaea;
    scrollbar-Shadow-Color: #eaeaea;
    -ms-overflow-style: -ms-autohiding-scrollbar;
}
.bu_list {
    width: 100%;
}
</style>

