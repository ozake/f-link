<template>
    <div>
        <transition name="fade">
        <layer-popup v-if="RecommLayer"></layer-popup>
        </transition>
        <transition name="fade">
        <aside-recomm v-show="!RecommLayer" :data="data"></aside-recomm>
        </transition>
        <!-- 다른업종 검색 -->
        <transition name="fade">
            <div class="bu_search" v-show="!RecommLayer" v-on:click="reSearch">
                <p>다른업종으로<br>다시검색</p>
            </div>
        </transition>
        <!-- //다른업종 검색 -->
    </div>
</template>
<script>
import LayerPopup from "./layerPopup.vue"
import AsideRecomm from "./AsideRecomm.vue"
export default {
  name: 'RecommBld',
  methods: {
      reSearch(){
          this.$EventBus.$emit('recommLayer', true)
      }
  },
  props: {
      RecommBld: Boolean,
      RecommLayer: Boolean,
      data: Array
  },
  components:{
    LayerPopup,
    AsideRecomm
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.bu_search {
    right: 420px;
}
</style>
