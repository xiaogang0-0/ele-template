<template>
  <div class="block-pagination">
    <el-pagination
      :current-page="page"
      :page-sizes="sizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      @size-change="changeSize"
      @current-change="changePage"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  components: {},
  props: {
    // 当前页
    page: {
      type: Number,
      default: 1

    },
    // 每页显示条数
    size: {
      type: Number,
      default: 20

    },
    // 总条数
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sizes: [10, 20, 30, 50]
    }
  },
  computed: {
    total() {
      return this.pager.total
    }
  },
  watch: {},
  created() {},
  mounted() {},

  methods: {
    /**
       * 页面显示条数改变
       * @param  {int} value 条数
       */
    changeSize(value) {
      // this.$emit('change', {type: 'size', page: this.page, size: value})
      this.$emit('change', { type: 'size', page: 1, size: value })
    },

    /**
       * 当前页改变
       * @param  {int} value 页码
       */
    changePage(value) {
      this.$emit('change', { type: 'page', page: value, size: this.size })
    }
  }
}
</script>
<style lang="scss" scoped>
.block-pagination {
  text-align: right;
  padding: 17px;
}
</style>
