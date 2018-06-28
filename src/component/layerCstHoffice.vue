<template>
        <div class="layer_pop">
            <span class="closeBtn" @click="consultOff"><img src="http://img.mk.co.kr/2018/franchise/list_close.png" ></span>
            <h5>가맹본사 상담 받기</h5>
            <!--정보입력-->
            <div class="data_in">
                <form name="input" id="input" method="post" action="http://www.f-link.co.kr/index.php?TM=C&MM=4" ref="form">
                    <!-- <input v-for="item in checked" type="hidden" name="brand" :value="item.regnumber"> -->
                    <!-- <input type="hidden" name="brand" :value="submitBrandCk"> -->
                    <!-- <input type="hidden" name="flag" value="true">
                    <input type="hidden" name="kind" value="1"> -->
                    <!-- <input type="hidden" name="category1" :value="categorycode1">
                    <input type="hidden" name="category2" :value="categorycode2"> -->
                    <fieldset>
                        <div class="form-field">
                            <label for="name">이름</label>
                            <input name="name" title="이름" type="text" placeholder="이름" class="databox" id="name">
                        </div>
                        <div class="form-field">
                        <label for="tel">연락처</label>
                        <input name="hp1" title="연락처" type="text" placeholder="tel" class="phonebox" maxlength="3" id="tel">
                        <input name="hp2" title="연락처" type="text" placeholder="" class="phonebox" maxlength="4">
                        <input name="hp3" title="연락처" type="text" placeholder="" class="phonebox" maxlength="4">
                        </div>
                    </fieldset>
                    

                    <!--연령-->
                    <div class="form-field">
                        <label for="age">연령</label>
                        <div class="data-select">
                            <select class="box-select" name="age" id="age">
                                <option>연령</option>
                                <option value="20">20대</option>
                                <option value="30">30대</option>
                                <option value="40">40대</option>
                                <option value="50">50대</option>
                                <option value="60">60대</option>
                                <option value="70">70대</option>
                            </select>
                        </div>
                    </div>
                    <!--//연령-->


                    <!--성별-->
                    <div class="form-field">
                        <label for="gender">성별</label>
                        <div class="data-select">
                            <select class="box-select" name="gender" id="gender">
                                <option>성별</option>
                                <option value="남">남자</option>
                                <option value="여">여자</option>
                            </select>
                        </div>
                    </div>
                    <!--//성별-->


                    <!--창업자금-->
                    <div class="form-field">
                        <label for="capital">창업자금</label>
                        <div class="data-select">
                            <select class="box-select" name="capital" id="capital">
                                <option>창업자금</option>
                                <option value="50000000">5천만원</option>
                                <option value="100000000">1억원</option>
                                <option value="150000000">1.5억원</option>
                                <option value="200000000">2억원</option>
                                <option value="250000000">2.5억원</option>
                                <option value="300000000">3억</option>
                            </select>
                        </div>
                    </div>
                    <!--//창업자금-->

                    <p>※ 매장 임대료 포함</p>
                    
                </form>
            </div>
            <div class="btn_con_area">
                <button type="button" class="btn_con" @click="emailSend">가맹본사 상담받기</button>
            </div>
		<!--//정보입력-->
        </div>
</template>
<script>
import ApiModel from '../model/apiModel.js'
export default {
  name: 'LayerConsult',
  props: {
      brand: String,
      regnumber: String,
      email: String
  },
  data () {
      return {
          model: new ApiModel(this.$http)
      }
  },
  methods: {
      consultOff(){
          this.$EventBus.$emit('consultOff')
      },
      emailSend() {
			let form = this.$refs.form
			
			if(form.elements['name'].value === ''){
					alert('이름을 입력해주세요')
				}else if(form.elements['hp1'].value === '') {
					alert('잔화번호 앞자리를 입력해주세요')
				}
				else if(form.elements['hp2'].value === '') {
					alert('잔화번호를 중간자리를 입력해주세요.')
				}
				else if(form.elements['hp3'].value === '') {
					alert('잔화번호를 뒷자리를 입력해주세요.')
				}
				else {	
					let name = form.elements['name'].value
					let hp1 = form.elements['hp1'].value
					let hp2 = form.elements['hp2'].value
					let hp3 = form.elements['hp3'].value
					let age = form.elements['age'].value
					let gender = form.elements['gender'].value
					let capital = form.elements['capital'].value
					let id = ''
					let userEmail = ''
					if(sessionStorage.getItem('ID')){
						id = sessionStorage.getItem('ID')
						userEmail = sessionStorage.getItem('EMAIL')
					}			
					let emailStr = this.email
					let brandStr = this.brand
					//let alertBrand = ''
					/* for (const value of data) {
						alertBrand += `${value.brand},`
						if(value.email){
							//emailArr.push(value.email)
							emailStr += `${value.email},`
							brandStr += `${value.brand},`
							//brandArr.push(value.brand)
						}
					}
					emailStr = emailStr.slice(0,-1)
					brandStr = brandStr.slice(0,-1)
					alertBrand = alertBrand.slice(0,-1) */
					

					if(emailStr !== ''){
						let sendObject = {
							'name' : name,
							'hp1' : hp1,
							'hp2' : hp2,
							'hp3' : hp3,
							'age' : age,
							'gender' : gender,
							'capital' : capital,
							'id' : id,
							'userEmail' : userEmail,
							'brand' : brandStr,
							'email' : emailStr
						}
                        
						this.model.sendEmail(sendObject).then((result)=>{
							if(result.status === 200){
								alert(`[${brandStr}] 담당자에게 상담을 의뢰했습니다. 3 영업일 이내에 전화드리겠습니다.`)
								this.model.consultHeadOffice(sendObject).then((result)=>{
									if(result.status === 200){
										//console.log(result)
                                        this.consultOff()
									}
								})
							}
						})
					}else{
						alert(`[${brandStr}] 담당자에게 상담을 의뢰했습니다. 3 영업일 이내에 전화드리겠습니다.`)
                        this.consultOff()
					}
					

				}
		}
  }
}
</script>
<style scoped>
.closeBtn {
    position: absolute;
    top: 30px;
    right: 30px;
}
.layer_pop {
    top: 6%;
    padding: 30px 30px;
    width: 360px;
    height: auto;
    text-align: center;
    left: 36%;
}
.layer_pop h5 {
    margin: 20px 0 20px 0;
    line-height: 40px;
}
.databox {
    width: 201px;
    border: 1px solid #dcdcdc;
    background-color: #f7f7f7;
    padding: 9px 15px;
    font-size: 16px;
    float: left;
    /* color: #555; */
    margin-bottom: 10px;
}
.phonebox {
    width: 50px;
    border: 1px solid #dcdcdc;
    background-color: #f7f7f7;
    padding-bottom: 9px;
    padding-top: 9px;
    padding-left: 15px;
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
    margin-right: 15.5px;
    float: left;
}
.data-select {
    position: relative;
    overflow: hidden;
    background: #f7f7f7 url(http://img.mk.co.kr/2018/franchise/btn_select1.jpg) no-repeat 100%;
    width: 231px;
    height: 44px;
    margin-bottom: 10px;
    border: 1px solid #dcdcdc;
}
.box-select {
    width: 100%;
    height: 100%;
    display: block;
    font-size: 16px;
    color: #555;
    border: none;
    padding: 9px 15px;
    font-size: 16px;
    background: transparent;
    text-transform: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
.box-select::-ms-expand {
	display: none;
}
.data_in label {
    text-align: right;
    width: 60px;
    display: block;
    float: left;
    padding-right: 20px; 
    padding-top: 10px;
    font-size: 16px;
}
.data_in form {
    display: block;
}
.form-field {
    margin: 0 auto;
}
.btn_con_area {
    margin-top: 30px;
}
</style>

