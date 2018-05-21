export default class ApiModel {
    
    /**
     * ApiModel 클래스 생성자 함수
     * axios 모듈을 반드시 생성자 함수 인자로 넘겨준다
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
     * @param {*} franchiseNo 
     * @param {*} pageNo 
     * @param {*} row
     * @param {*} centerCode //법정동 코드 
     * @returns {promise} 
     */
    getOP402(franchiseNo='20080100047', row='10', pageNo='1',centerCode=''){
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
     * OP-404 API 조회 메소드
     * @param {*} centerCode 구단위 코드
     * @param {*} ftcCate2Cd 업종코드
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @param {*} emdCd 법정동 코드
     * @returns {Promise}
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

    /**
     * OP-405 API 조회 메소드
     * @param {*} centerCode 구단위 코드
     * @param {*} franchiseNo 프렌차이즈번호
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @param {*} emdCd 법정동 코드
     * @returns {Promise} 
     */
    getOP405(centerCode, franchiseNo = '', row='10', pageNo='1', emdCd=''){
      centerCode = centerCode.substring(0,5);
      this.apiNo = '405'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'sggCd':centerCode,
        'emdCd':emdCd,
        'franchiseNo':franchiseNo
      }
      return this.http(this.config)
    }

    /**
     * OP-407 API 조회 메소드
     * 건물추천리스트 조회
     * @param {*} emdCd 법정동코드
     * @param {*} ftcCate2Cd 업종코드
     * @param {*} row 표시할 데이터 갯수
     * @param {*} pageNo 페이지 넘버
     * @returns {Promise} 
     */
    getOP407(emdCd='', ftcCate2Cd = '', row='10', pageNo='1'){
      emdCd = emdCd.substring(0,8);
      this.apiNo = '407'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = {
        'pageNo':pageNo,
        'row':row,
        'emdCd':emdCd,
        'ftcCate2Cd':ftcCate2Cd
      }
      return this.http(this.config)
    }


    /**
     * 카테고리별 프렌차이즈 리스트 출력
     * @param {*} categoryName 
     * @param {*} row 
     * @param {*} pageNo
     * @returns {promise}  
     */
    getFranchiseList(categoryName='한식', row='10', pageNo='1'){
      this.apiNo = '101'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `category2=${categoryName}`
      return this.http(this.config)
    }

    /**
     * 프렌차이즈 브랜드 정보 가져오기
     * @param {*} franchiseCode
     * @returns {promise}  
     */
    getFranchiseView(franchiseCode='20080100243'){
      this.apiNo = '102'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `regnumber=${franchiseCode}`
      return this.http(this.config)
    }

    /**
     * 프렌차이즈 연도별 점포 정보 가져오기
     * @param {*} franchiseCode
     * @returns {promise}  
     */
    getFranchiseYearData(franchiseCode='20080100243'){
      this.apiNo = '103'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `regnumber=${franchiseCode}`
      return this.http(this.config)
    }


    /**
     * 소자본 창업 BEST 리스트
     * @param {*} pageNo 
     * @returns {promise}
     */
    getScapitalBest(pageNo='0'){
      this.apiNo = '105'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `cmd=1&page=${pageNo}`
      return this.http(this.config)
    }


    /**
     * 스테디셀러 BEST 리스트
     * @param {*} pageNo 
     * @returns {promise}
     */
    getSteadyBest(pageNo='0'){
      this.apiNo = '105'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `cmd=2&page=${pageNo}`
      return this.http(this.config)
    }


    /**
     * 매장증가율 BEST 리스트
     * @param {*} pageNo 
     * @returns {promise}
     */
    getGrowthBest(pageNo='0'){
      this.apiNo = '105'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `cmd=3&page=${pageNo}`
      return this.http(this.config)
    }

    /**
     * 부동산 매물 리스트 조회
     * @param {*} pageNo 
     * @param {*} rows 
     * @param {*} sggCd
     * @returns {promise}
     */
    getEstateList(pageNo='0',rows='20',sggCd=''){
      this.apiNo = '107'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `display=${rows}&page=${pageNo}&code=${ssgCd}`
      return this.http(this.config)
    }

    /**
     * 검색시 업종을 검색하는 메소드
     * @param {String} txt 
     * @returns {promise}
     */
    getSectorSearch(txt){
      this.apiNo = '1001'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `searchTxt=${txt}`
      return this.http(this.config)
    }

    /**
     * 검색시 업종을 검색하는 메소드
     * @param {String} txt 
     * @returns {promise}
     */
    getFranchiseSearch(txt){
      this.apiNo = '1002'
      this.config.url = `${this.baseURI}/container/OP-${this.apiNo}.php`;
      this.config.data = `searchTxt=${txt}`
      return this.http(this.config)
    }


}