// 忘记密码
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
              <h3 class="title">忘记密码</h3>
            </div>

            <p class="pd60">手机号</p>
            <el-form-item prop="mobile">
              <el-input
                ref="mobile"
                v-model.trim="loginForm.mobile"
                placeholder="请输入手机号"
                name="mobile"
                type="text"
                tabindex="1"
              />
            </el-form-item>

            <p class="pd60">验证码</p>
            <el-form-item prop="verifyCode" class="verificationCode">
              <el-input
                ref="verifyCode"
                v-model.trim="loginForm.verifyCode"
                placeholder="请输入验证码"
                name="verifyCode"
                type="text"
              />

              <span
                v-show="!isActive"
                class="cblue cursor"
                @click="handleTime"
              >获取验证码</span>
              <span
                v-show="isActive"
                class="cblue"
              >{{ num ? num + 's': '' }}</span>
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
            >登 录</el-button>

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
    const validatePhoneNumber = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号码有误，请重填'))
      } else {
        callback()
      }
    }

    const validateVerifyCode = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/
      if (!value) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 1是系统用户, 0是企业用户
      userType: '0',
      // 是否进行了点击操作
      isActive: false,
      num: 59,
      loginForm: {
        // 注册时(register), 登录时(login), 找回密码时(update-password), 修改资料时(update-customer)
        sendType: 'update-password',
        // 企业名称
        customerName: '',
        mobile: '',
        // 验证码
        verifyCode: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validatePhoneNumber }]
        // verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
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
  },
  mounted() {
    // if (this.loginForm.customerName === '' && this.userType == 1) {
    //   this.$refs.customerName.focus()
    // }else
    if (this.loginForm.mobile === '') {
      this.$refs.mobile.focus()
    } else if (this.loginForm.verifyCode === '') {
      this.$refs.verifyCode.focus()
    }
  },
  methods: {
    // 倒计时
    handleTime() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // if(this.userType == 1 && !this.loginForm.customerName){
          //   return this.$message({
          //     message: '企业名称不能为空',
          //     type: 'warning'
          //   });
          // }

          this.isActive = true
          // 获取验证码
          this.handeleGetVerifyCode()
          const timer = setInterval(() => {
            if (this.num < 1) {
              this.isActive = false
              this.num = 59
              clearInterval(timer)
            }
            this.num--
          }, 1000)
        } else {
          // console.log('请输入账号密码')
          return false
        }
      })
    },

    // 获取验证码
    handeleGetVerifyCode() {
      const param = {
        sendType: this.loginForm.sendType,
        mobile: this.loginForm.mobile
      }
      // 平台用户带参数
      // let param1 ={customerName:''}
      // if(this.userType == 1){
      //   param1.customerName = this.loginForm.customerName
      // }
      Api.getSendVerifyCode(param).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '验证码已发送至' + this.loginForm.mobile + '上请注意查收',
            type: 'success'
          })
        }
      }).catch(error => {
      })
    },

    // 提交
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // if(this.userType == 1 && !this.loginForm.customerName){
          //   return this.$message({
          //     message: '企业名称不能为空',
          //     type: 'warning'
          //   });
          // }
          if (!this.loginForm.verifyCode) {
            return this.$message({
              message: '验证码不能为空',
              type: 'warning'
            })
          }

          const param = {
            mobile: this.loginForm.mobile,
            verifyCode: this.loginForm.verifyCode
          }
          this.loading = true
          Api.getVerifyCode(param).then(res => {
            this.loading = false
            if (res.code == 200) {
              // let username = this.userType == 0 ? this.loginForm.mobile :
              //                this.userType == 1 ? this.loginForm.customerName : ''
              this.$router.push({
                name: 'changePassword',
                // 用户名, 企业用户为手机号, 系统用户为用户名
                query: { userType: this.userType,
                  username: this.loginForm.mobile
                }
                // {userType:this.userType,
                // username:username}
              })
            }
          }).catch(error => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.divBody {
  overflow-y: hidden;
  height: 100vh;
}

/* reset element-ui css */
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
  .el-input {
    display: inline-block;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
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

.verificationCode .el-input{
  width: 190px;
}
.pd60 {padding: 0 60px; color: #669999; font-size:16px;line-height: 32px;padding-top:10px;margin:0;}
.pdt0 {padding-top: 0;}
.cblue{ color: #1890ff;}
.cursor{cursor:pointer;}
.login-container {
  // min-height: 100%;
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
    min-width: 1200px;
    max-width: 1350px;
    margin: 0 auto;
    overflow: hidden;
    padding: 6vh 0 0 0;
}
  .content {
    height:100vh;
    /*min-height:840px;*/
    /*max-height:1120px;*/
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
    margin-top:40px;
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
    top: 7px;
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
