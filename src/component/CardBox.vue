<template>
  <!--프랜차이즈 박스-->
			<ul>
        <router-link :to="{ name: 'franchise-view', params: {id: item.regnumber } }">
				<li class="fr_logo"><img v-bind:src="item.img2" /></li>
				<li class="fr_tit">{{item.brand}}</li>
				<dl>
					<dt>분류</dt>
					<dd>{{item.category1}} > {{item.category2}}</dd>
					<dt>대표자</dt>
					<dd>{{item.ceo}}</dd>
					<dt>창업 비용</dt>
					<dd>{{item.total}}천원 ({{item.storearea}}평)</dd>
					<dt>총 가맹점 수</dt>
					<dd>{{item.fcount}}개</dd>
				</dl>
        </router-link>
        <label :for="id" class="check_info_label"><span>추가 정보 요청</span></label>
        <input type="checkbox" :id="id" class="check_info" v-model="checked" :value="item.regnumber" />
				<!-- <a href="#"><button class="btn_info">추가 정보 요청 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </button></a> -->
			</ul>
			<!--//프랜차이즈 박스-->
</template>
<style scoped>
.check_info {
	visibility: hidden;
}
.check_info_label {
  display: inline-block;
  font-size: 15px;
  width: 212px;
  height: 33px;
  border: 1px solid #4db007;
  color: #4db007;
  margin: 10px 0 0 20px;
  cursor: pointer;
  text-align: center;
  line-height: 33px;
  box-sizing:border-box;
}
.check_info_label > span {
  margin-right: 5px;
  font-size: 15px;
  padding-right: 18.5px;
  background: url(http://img.mk.co.kr/2018/franchise/chech_off.jpg) no-repeat right center/12px;
}
</style>
<script>
export default {
  name: 'CardBox',
  props: ['item', 'index'],
  data(){
    return {
      id: null,
      checked: false
    }
  },
  watch : {
    checked: function (val) {
      if(val){
        //console.log(this.item.regnumber)
        this.$emit('input', this.item.regnumber)
      }
      
    }
  },
  mounted () {
    this.id = this._uid
  }
}
</script>
