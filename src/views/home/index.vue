
// 模版页面
<template>
  <div class="app-container home">
    <h2>home 模版页面</h2>
  </div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      timer: "2021-05-01",
    };
  },
  computed: {},
  created() {},
};
</script>

<style lang="scss" scoped>
// .home {
//   color: #fff;
// }
</style>
<style lang="scss" scoped>
.home {
  background: #ccc;
  text-align: center;
  color: #fff;
}
</style>

