// 公用表头
<template>
  <div class="loginHeader">
    <h2 class="fl name">PC架构模版</h2>
    <nav class="fr navList">
      <a href="javascript:;" @click="handleGoLogin">企业登录</a>
      <a href="javascript:;" @click="handleGoRegister">企业注册</a>
    </nav>

  </div>
</template>

<script>
export default {
  name: 'LoginHeader',
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

    // 企业注册
    handleGoRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    // 企业登录
    handleGoLogin() {
      this.$router.push({
        name: 'login'
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.loginHeader {

    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    line-height: 6vh;
    padding: 0 40px;
    box-sizing: border-box;
    color: #2E74D1;
    // background-color: #f90;
    background-color: #fff;
    .fl{float: left;}
    .fr{float: right;}

    .navList{
      &>a{
        float: left;
        color: #2E74D1;
        padding: 0 10px;
        margin: 0 5px;
      }
    }
    .name {
      font-weight:800;
      font-size: 18px;
    }
    .overflow{ overflow: hidden; }

}

.loginHeader.is-active {
  transform: rotate(180deg);
}
</style>
