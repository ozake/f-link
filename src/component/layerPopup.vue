<template>
    <transition name="fade">
        <div class="layer_pop">
            <span class="closeBtn" @click="recommOff"><img src="http://img.mk.co.kr/2018/franchise/list_close.png" ></span>
            <h5>창업 시 예상매출이 높은 건물을 찾아드립니다.<br>관심 업종을 골라보세요.</h5>
            <ul>
                <li><a href="#none" v-on:click="category('0101','한식')">한식</a></li>
                <li><a href="#none" v-on:click="category('0102','치킨')">치킨</a></li>
                <li><a href="#none" v-on:click="category('0107','피자')">피자</a></li>
                <li><a href="#none" v-on:click="category('0306','편의점')">편의점</a></li>
                <li><a href="#none" v-on:click="category('0108','커피')">커피</a></li>
                <li><a href="#none" v-on:click="category('0104','제과제빵')">제과제빵</a></li>
                <li><a href="#none" v-on:click="category('0106','분식')">분식</a></li>
                <li><a href="#none" v-on:click="category('0112','주점')">주점</a></li>
            </ul>
        </div>
    </transition>
</template>
<script>
export default {
  name: 'LayerPopup',
  methods: {
      category(val,val2){
          this.$EventBus.$emit('recommCategory', val,val2)
          this.$EventBus.$emit('recommLayer', false)
      },
      recommOff(){
          this.$EventBus.$emit('recommOnOff')
      }
  }
}
</script>
<style>
.closeBtn {
    position: absolute;
    top: 30px;
    right: 30px;
}
</style>

