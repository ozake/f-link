<template>
 <!--페이징-->
      <div class="paging">
        <a class="pre" href="#"></a>
        <router-link v-for="(nums,index) in displayPageNums" :to="{ name: routeName, params: {page: nums } }" v-bind:class="{ on: ( (index +1) === currentPage ) }" >{{nums}}</router-link>
        <a class="next" href="#"></a>
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
          totalPage : 0
      }
  },
  created() {
         
  },
  watch: {
      totalCount : function (val) {
          this.fetchData(val)
      }

  },
  mounted() {
      //console.log(this.totalCount)
      
  },
  methods: {
    fetchData(val){
        this.totalPage = this.calTotalPage(val, this.pageRows)
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
    makePageNumArr(currentPage, pageingRange,totalPage){
        let startPage = Math.trunc(( currentPage -1 ) / pageingRange)  * pageingRange + 1
        
        let endPage = startPage + pageingRange - 1
        if (totalPage < currentPage) {
            currentPage = totalPage
        }
        if (endPage > totalPage) {
            endPage = totalPage
        }
        
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
</style>
