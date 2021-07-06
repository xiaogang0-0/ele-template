<template>
  <footer class="login-footer">公用底部</footer>
</template>

<script>
export default {
  name: "LoginFooter",
  methods: {
    serviceFn() {
      this.$router.push({
        name: "service",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-footer {
  position: fixed;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
  // height:200px;
  padding: 0 40px;
  box-sizing: border-box;
  background: #283891;
  color: #fff;
  text-align: center;
}
</style>
