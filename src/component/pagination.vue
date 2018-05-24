<template>
 <!--페이징-->
      <div class="paging">
        <a class="pre" href="#"></a>
        <a class="on" href="#"><strong>1</strong></a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">7</a>
        <a href="#">8</a>
        <a href="#">9</a>
        <a href="#">10</a>
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
      pageRange: Number,
      pageRows: Number
  },
  data() {
      return {
          displayPageNums : []
      }
  },
  created() {
      this.totalCount

  },
  methods: {
      makePageNumArr(){
          this.totalCount / this.pageRows
      }
  }
}
</script>