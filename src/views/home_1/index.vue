//用户登录页 login
<template>
  <div class="divBody">
    <div class="login-container">
      <div class="content">
        <!-- 公用表头 -->
        <!-- <loginHeader /> -->
        <div class="wrap">
          <div class="wrap-bg">
            <img
              v-show="bgImgUrlArr"
              :src="bgImgUrlArr"
              alt=""
              class="bgImgUrl"
            />
          </div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">欢迎登录</h3>
            </div>

            <p class="pd60">手机号</p>
            <el-form-item prop="phoneNumber">
              <el-input
                ref="phoneNumber"
                v-model.trim="loginForm.phoneNumber"
                placeholder="请输入手机号"
                name="phoneNumber"
                type="text"
                tabindex="1"
              />
            </el-form-item>

            <p class="pd60">企业名称</p>
            <el-form-item prop="customerName" class="customerName">
              <el-select
                ref="customerName"
                v-model="loginForm.customerName"
                placeholder="请选择登录的企业"
              >
                <el-option
                  v-for="item in enterpriseData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>

            <p class="pd60">登录密码</p>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model.trim="loginForm.password"
                :type="passwordType"
                name="password"
                placeholder="请输入密码"
                tabindex="2"
                autocomplete="new-password"
                disableautocomplete
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <!-- <p class="pd60">验证码</p>
            <el-form-item prop="verifyCode" class="verificationCode">
             <el-input
                ref="verificationCode"
                v-model="loginForm.verifyCode"
                placeholder="请输入验证码"
                name="verificationCode"
                type="text"
              />

              <span class="cblue cursor">获取验证码</span>
            </el-form-item> -->

            <p class="pd60">
              <el-button type="text" @click="handleForgetPassword"
                >忘记密码</el-button
              >
            </p>
            <el-button
              :loading="loading"
              type="primary"
              style="
                display: block;
                margin: 10px 60px 50px;
                width: 72%;
                background: #2e74d1;
                border-color: #2e74d1;
              "
              @click.native.prevent="handleLogin"
              >登 录</el-button
            >

            <p
              class="pd60"
              style="
                text-align: center;
                margin: -45px 0 12px;
                cursor: pointer;
                color: #1890ff;
              "
              @click="handleRegister"
            >
              企业注册
            </p>
          </el-form>
        </div>
        <!--公用底部-->
        <!-- <LoginFooter /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import componentsRouter from "@/router/modules/components.js";
// import constantRoutes from '@/router/index.js'
import routerIndex from "@/router/index.js";

import { setToken } from "@/utils/auth";
import * as Api from "@/api/login";
import LoginHeader from "@/components/loginHeader";
import LoginFooter from "@/components/loginFooter";
// 权限目录
import menuList from "@/api/menuList.json";
import bgimg from "@/assets/images/login/login-bg1.jpg";

export default {
  name: "Login",
  components: {
    LoginHeader,
    LoginFooter,
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;
      if (value.length < 8 || !reg.test(value)) {
        callback(new Error("使用大小写英文字母与数字组合，不低于8位数"));
      } else {
        callback();
      }
    };
    const validatePhoneNumber = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
        this.handleGetListByMobile();
      }
    };
    return {
      // 1是系统用户, 0是企业用户
      userType: "0",
      // 企业端登录页主图
      bgImgUrlArr: "",
      loginForm: {
        // 18600639069
        phoneNumber: "",
        customerName: "",
        // baidu111111
        password: "",
        // verifyCode:''
      },
      // 企业列表
      enterpriseData: [
        // {
        //   name:'',
        //   status:''
        // }
      ],

      loginRules: {
        phoneNumber: [
          { required: true, trigger: "blur", validator: validatePhoneNumber },
        ],
        customerName: [
          { required: true, trigger: "change", message: "请选择登录的企业" },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        // verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码'}],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,

      capsTooltip: false,
      otherQuery: {},
    };
  },
  watch: {},

  created() {
    // 处理兼容性
    //    document.getElementsByTagName("body")[0].className="equipment-body";
  },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
  mounted() {
    document.querySelector("#app").overflowY = "hidden";
    if (this.loginForm.phoneNumber === "") {
      this.$refs.phoneNumber.focus();
    } else if (this.loginForm.customerName === "") {
      this.$refs.customerName.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
    // 根据页面模块code获取图片列表
    this.handeGetBgImgUrlArr();
  },
  methods: {
    // 根据页面模块code获取图片列表
    handeGetBgImgUrlArr() {
      // 16000 PC企业端登录页主图
      // 17000 PC企业端注册页主图
      // 18000 PC平台端登录页主图
      const param = 16000;
      Api.getBgImgUrlArr(param)
        .then((res) => {
          const { code, data, msg, total } = res;
          this.bgImgUrlArr = data.length ? data[0].imgUrl : bgimg;
          // this.bgImgUrlArr = data.length ? data[0].imgUrl : ''
        })
        .catch((_) => {});
    },

    // 根据手机号获取企业列表
    handleGetListByMobile() {
      const param = this.loginForm.phoneNumber;
      Api.getListByMobile(param)
        .then((res) => {
          const { code, data, msg, total } = res;
          this.enterpriseData = data;
        })
        .catch((_) => {
          this.enterpriseData = [];
        });
    },

    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          var param = {
            username: this.loginForm.phoneNumber,
            // 企业名称, 平台登录时不需要此参数
            customerName: this.loginForm.customerName,
            password: this.loginForm.password,
            // "phoneNumber":this.loginForm.phoneNumber,
          };
          Api.loginInit(param)
            .then((res) => {
              this.loading = false;
              if (res.code == 200) {
                // 本地存储token
                setToken(res.data.accessToken);
                localStorage.setItem("YXKJ_userInfo", JSON.stringify(res.data));
                // ++++++++模拟后端权限+++++++
                if (res.data.userType == 1) {
                  // 后台登录
                  localStorage.setItem(
                    "YXKJ_menuList",
                    JSON.stringify(menuList.home)
                  );
                } else {
                  // 客户端
                  localStorage.setItem(
                    "YXKJ_menuList",
                    JSON.stringify(menuList.login)
                  );
                }
                window.location.reload();

                // ++++++++模拟后端权限over+++++++
              }
            })
            .catch(() => {
              localStorage.removeItem("YXKJ_userInfo");
              localStorage.removeItem("YXKJ_menuList");
              this.loading = false;
            });
        } else {
          // console.log('请输入账号密码')
          return false;
        }
      });
    },

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({
        name: "forgetPassword",
        query: { userType: this.userType },
      });
    },
    // 企业注册
    handleRegister() {
      this.$router.push({
        name: "register",
      });
    },

    handleLogin1() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          // console.log('error submit!!')
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.divBody {
  overflow-y: hidden;
  height: 100vh;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  min-height: 810px;
  // max-height: 1120px;
  .loginHeader {
    position: relative;
    z-index: 2;
  }
  .login-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
  }
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: #000;
      // height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .customerName {
    .el-select,
    .el-input {
      width: 100%;
    }
  }

  .el-form-item {
    // border: 1px solid #ccc;
    background: #fff;
    margin: 0 60px;
    border-radius: 5px;
    color: #454545;
  }
  .el-input__inner {
    border: 0;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2e74d1;
$dark_gray: #889aa4;
$light_gray: #eee;
.pd60 {
  padding: 0 60px;
  color: #669999;
  font-size: 16px;
  line-height: 32px;
  padding-top: 10px;
  margin: 0;
}
.pdt0 {
  padding-top: 0;
}
.cblue {
  color: #1890ff;
}
.cursor {
  cursor: pointer;
}
.verificationCode .el-input {
  width: 190px;
}
.login-container {
  // min-height: 100%;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  .login-head {
    margin: 0 auto;
    width: 100%;
    background: #fff;
    .head-wrap {
      width: 1200px;
      height: 135px;
      margin: 0 auto;
      padding: 37px 0 0 11px;
      img {
        width: 203px;
        height: 68px;
      }
    }
  }
  .wrap {
    min-width: 1200px;
    max-width: 1350px;
    margin: 0 auto;
    overflow: hidden;
    padding: 20vh 0 0 20px;
  }
  .content {
    height: 100vh;
    /*min-height:840px;*/
    /*max-height:1120px;*/
    margin: 0 auto;
    background-color: #2e74d1;
    overflow: hidden;
    overflow-y: auto;
    position: relative;
  }

  .wrap-bg {
    min-width: 40%;
    width: 66%;
    height: 456px;
    float: left;
    // background-image: url('../../assets/images/login/login-bg1.jpg');
    // background-size: 100% 100%;

    .bgImgUrl {
      width: 100%;
      height: 456px;
    }
  }

  .login-form {
    position: relative;
    width: 30%;
    max-width: 100%;
    float: right;
    margin-right: 45px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
  .svg-container[data-v-37dfd6fc] {
    display: none;
  }

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
      height: 64px;
      line-height: 64px;
      margin: 0;
      font-size: 24px;
      color: #2e74d1;
      background: #fff;
      font-weight: 700;
      box-shadow: 0 -8px 8px rgba(204, 204, 204, 0.4) inset;
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

