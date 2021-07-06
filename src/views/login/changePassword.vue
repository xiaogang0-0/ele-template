// 修改密码
<template>
  <div class="divBody">
    <div class="login-container">

      <div class="content">
        <!-- 公用表头 -->
        <!-- <loginHeader /> -->
        <div class="wrap">
          <div class="wrap-bg" />
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
              <h3 class="title">修改密码</h3>
            </div>

            <p class="pd60">新密码</p>
            <el-form-item prop="password1">
              <el-input
                :key="passwordType"
                ref="password1"
                v-model.trim="loginForm.password1"
                :type="passwordType"
                placeholder="请输入新密码"
                name="password"
                tabindex="2"
                autocomplete="on"
              />
            <!-- <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span> -->
            </el-form-item>

            <p class="pd60">再次输入</p>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model.trim="loginForm.password"
                :type="passwordType"
                placeholder="再次输入新密码"
                name="password"
                tabindex="2"
                autocomplete="on"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="
                display:block;
                margin:50px 60px 50px;
                width:72%;background:#2E74D1;
                border-color:#2E74D1;"
              @click.native.prevent="handleLogin"
            >完 成</el-button>

          </el-form>
        </div>
        <!--公用底部-->
        <!-- <LoginFooter /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import componentsRouter from '@/router/modules/components.js'
import routerIndex from '@/router/index.js'
import { setToken } from '@/utils/auth'
import * as Api from '@/api/login'
import LoginHeader from '@/components/loginHeader'
import LoginFooter from '@/components/loginFooter'

export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/
      if (value.length < 8 || !reg.test(value)) {
        callback(new Error('使用大小写英文字母与数字组合，不低于8位数'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (this.loginForm.password != this.loginForm.password1) {
        callback(new Error('两次输入的不一致'))
      } else {
        callback()
      }
    }
    return {
      // 1是系统用户, 0是企业用户
      userType: '',
      loginForm: {
        // 用户名, 企业用户为手机号, 系统用户为用户名
        username: '',
        // 新密码
        password: '',

        password1: ''
      },
      loginRules: {
        password1: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  computed: {},
  watch: {},
  created() {
    window.location.href = window.location.href
    this.userType = this.$route.query.userType
    this.loginForm.username = this.$route.query.username
  },
  mounted() {
    if (this.loginForm.password1 == '') {
      this.$refs.password1.focus()
    } else if (this.loginForm.password == '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    // 修改密码
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          var param = {
            'username': this.loginForm.username,
            'password': this.loginForm.password
          }
          // console.log(param)
          Api.changePassword(param).then(res => {
            this.loading = false
            if (res.code == 200) {
              setTimeout(() => {
                if (this.userType == 0) {
                  this.$router.push({
                    name: 'login'
                  })
                }

                if (this.userType == 1) {
                  this.$router.push({
                    name: 'home'
                  })
                }
              }, 1000)
            }
          }).catch(error => {
            this.loading = false
          })
        } else {
          // console.log('请输入账号密码')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

.divBody {
  overflow-y: hidden;
  height: 100vh;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  min-height: 810px;
  .el-input {
    display: inline-block;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: #000;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ccc;
    background: #fff;
    margin: 0 60px;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>

$bg:#2E74D1;
$dark_gray:#889aa4;
$light_gray:#eee;
.pd60 {padding: 0 60px; color: #669999; font-size:16px;line-height: 32px;padding-top:10px;margin:0;}
.pdt0 {padding-top: 0;}

.login-container {
  min-height: 810px;
  .loginHeader {
    position: relative;
    z-index:2;
  }
  .login-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin:0;
  }
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-head {
    // width: 1200px;
    margin: 0 auto;
    width: 100%;
    background: #fff;
    .head-wrap {
      width: 1200px;
      height: 135px;
      margin: 0 auto;
      padding: 37px 0 0 11px;
      img {
        width:203px;
        height:68px;
      }
    }
  }
  .wrap {
    // width: 1200px;
    min-width: 1200px;
    max-width: 1350px;
    margin: 0 auto;
    overflow: hidden;
    padding: 6vh 0 0 0;
}
  .content {
    height: 100vh;
    // min-height:900px;
    // max-height:1120px;
    margin: 0 auto;
    background-color: #2E74D1;
    overflow: hidden;
    overflow-y: auto;
    position: relative;

  }

  .wrap-bg {
    min-width:40%;
    width:66%;
    height: 456px;
    float: left;
    // background-image: url('../../assets/login/login-bg1.jpg');
    background-size: 100% 100%;
  }
  .login-form {
    position: relative;
    width: 30%;
    max-width: 100%;
    float: right;
    margin-right:45px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 8px  rgba(0,0,0,0.3);
    margin-top:45px;
  }
  .svg-container[data-v-37dfd6fc]{display: none;}
  // .login-form {
  //   position: relative;
  //   width: 428px;
  //   max-width: 100%;
  //   float: right;
  //   margin-right:4px;
  //   overflow: hidden;
  //   background: #fff;
  //   box-shadow: 0 0 8px  rgba(0,0,0,0.3);
  // }
  // .tips {
  //   font-size: 14px;
  //   color: #fff;
  //   margin-bottom: 10px;
  //   span {
  //     &:first-of-type {
  //       margin-right: 16px;
  //     }
  //   }
  // }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      // font-size: 26px;
      // color: $light_gray;
      // margin: 0px auto 40px auto;
      // text-align: center;
      // font-weight: bold;

       height: 64px;
      line-height: 64px;
      margin: 0;
      font-size: 24px;
      color: #2E74D1;
      background: #fff;
      font-weight: 700;
      box-shadow: 0 -8px 8px rgba(204,204,204,0.4) inset;
      overflow: hidden;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
