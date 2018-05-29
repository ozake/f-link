<template>
 <!--페이징-->
      <div class="paging">
        <router-link v-if="showPrev" class="pre" :to="{ name: routeName, params: {page: prevNum } }"></router-link>
        <router-link v-for="(nums,index) in displayPageNums" :to="{ name: routeName, params: {page: nums } }" v-bind:class="{ on: ( nums === currentPage ) }" >{{nums}}</router-link>
        <router-link v-if="showNext" class="next" :to="{ name: routeName, params: {page: nextNum } }"></router-link>
      </div>
      <!--//페이징-->
</template>
<script>
export default {
  name: 'Pagination',
  props: {
      totalCount: Number,
      currentPage: Number,
      pageingRange: Number,
      pageRows: Number,
      routeName : String
  },
  data() {
      return {
          displayPageNums : [],
          totalPage : 0,
          showPrev : false,
          showNext : true,
          prevNum : 1,
          nextNum : 1
      }
  },
  created() {
         
  },
  watch: {
      currentPage : function () {
          this.fetchData()
      },
      totalCount : function () {
          this.fetchData()
      }
  },
  methods: {
    fetchData(){
        let totalCount = this.totalCount
        if(this.routeName === 'growth-list' || this.routeName === 'scapital-list' || this.routeName === 'steady-list'){
            totalCount = totalCount - 16
        }
        this.totalPage = this.calTotalPage(totalCount, this.pageRows)
        this.displayPageNums = this.makePageNumArr(this.currentPage, this.pageingRange, this.totalPage)   
    },
    calTotalPage(totalCount, pageRows){
        //console.log(totalCount)
        //console.log(totalCount / pageRows)
        let totalPage = Math.trunc(totalCount / pageRows)
        if (totalCount > pageRows * totalPage) {
            totalPage++
        }
        return totalPage
    },
    makePageNumArr(currentPage, pageingRange, totalPage){
        let startPage = Math.trunc(( currentPage -1 ) / pageingRange)  * pageingRange + 1
        
        let endPage = startPage + pageingRange - 1
        if (totalPage < currentPage) {
            currentPage = totalPage
        }
        if (endPage >= totalPage) {
            endPage = totalPage
            //this.showNext = false
        }
        if(startPage > pageingRange){
            this.showPrev = true
        }else{
            this.showPrev = false
        }
        if(currentPage < totalPage && endPage < totalPage){
            this.showNext = true
        }else{
            this.showNext = false
        }
        this.nextNum = startPage + pageingRange
        this.prevNum = startPage - 1
        
        let numArr = []
        for(let i = startPage; i <= endPage; i++){
            numArr.push(i)
        }
        return numArr
    },
    next(){
        
    },
    prev(){

    }
    
  }
}
</script>
<style>
.on {
    font-weight: bold
}
.paging a {
    margin: 0 1px;
}
</style>
