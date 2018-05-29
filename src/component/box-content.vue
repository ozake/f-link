<template>
  <div class="box_content" v-bind:class="{ lastBox: this.lastbox }">
    <router-link :to="{ name: 'franchise-view', params: {id: item.regnumber } }">
      <div class="img-border"></div>
      <!-- <img src="http://img.mk.co.kr/2018/franchise/pizza.jpg" alt="미스터피자"> -->
      <img v-bind:src="item.img1" />
  		<div class="content-title">
        <div>{{item.brand}}</div>
        <div>{{item.total}}만원 ({{item.storearea}}평)</div>
      </div>
    </router-link>
	</div>
</template>
<script>
export default {
  name: 'boxContent',
  props: ['item', 'index'],
  data(){
    return {
      lastbox : ''
    }
  },
  created() {
    this.lastbox = this.hasLastBox(this.index)

  },
  methods: {
    hasLastBox(idx){
      let res = false
      idx++
      if( (idx%5) === 0 ){
        res = true
      }
      return res
    }
  }
}
</script>
<style scoped>
.box_content {
  width: 166px;
  position: relative;
  display: inline-block;
  margin-right: 50px;
}
.lastBox {
  margin-right: 0px;
}
.box_content a {
  display: inline-block;
}
.box_content img {
  position:relative;
  display: block;
  width: 166px;
  height: 166px;
  /* width: 100%;
  height: 100%; */
}
/* .img-border img:hover {
  top: -3px;
  left: -3px;
} */
.img-border {
  position:absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 50px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  width: 166px;
  height: 166px;
  z-index: 1000;
  margin-bottom: 23px;
  overflow: hidden;
}
.img-border:hover {
  border:4px solid #4db007;
  width: 166px;
  height: 166px;
}
.content-title {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}
.content-title div:last-child{
  color: #888;
}
</style>
