export default class ApiModel {
    
    /**
     * ApiModel 클래스 생성자 함수
     * axios 모듈을 생성자 함수 인자로 넘겨준다
     * @param {Axios} $http Axios모듈 인자
     */
    constructor($http) {
      this.http = $http;
      this.baseURI = 'http://www.f-link.co.kr';
      this.apiNo = '402';
      this.config = {
        method: 'post',
        url: `${this.baseURI}/container/OP-${this.apiNo}.php`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
        //각 메소드에서 http request로 전달할 데이터 객체를 정의해서 사용
        }
      }
    }

    /**
     * OP-402 API 조회 메소드
     * 리턴형은 http Axios의 promise형으로 반환
     * @param {*} centerCode 
     * @param {*} franchiseNo 
     * @param {*} pageNo 
     * @param {*} row
     * @returns {promise} 
     */
    getOP402(centerCode, franchiseNo='20080100047', row='10', pageNo='1'){
      this.apiNo = '402';
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'emdCd':centerCode,
        'franchiseNo':franchiseNo
      }
      return this.http(this.config)
    }

    /**
     * 
     * @param {*} centerCode 구단위 코드
     * @param {*} ftcCate2Cd 업종코드
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @param {*} emdCd 법정동 코드
     * @returns {promise}
     */
    getOP404(centerCode, ftcCate2Cd = '0101', row='10', pageNo='1', emdCd=''){
      centerCode = centerCode.substring(0,5);
      this.apiNo = '404'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'sggCd':centerCode,
        'emdCd':emdCd,
        'ftcCate2Cd':ftcCate2Cd
      }
      return this.http(this.config)
    }
}