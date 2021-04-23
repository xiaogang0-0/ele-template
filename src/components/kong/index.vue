// 刷新当前页面的 中转
<template>
  <div></div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace({
        path: from.path,
        query: from.query
      })
    })
  },
  watch: {
  },
  created() {
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
