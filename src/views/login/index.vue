<template>
  <div class="login-container">
    <div class="login-head">
      <div class="head-wrap">
        <img src="../../assets/login/logo.png">
      </div>
    </div>


    <div class="content">
        <div class="wrap">
          <div class="wrap-bg"></div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

            <div class="title-container">
              <h3 class="title">和力物联商城登录</h3>
            </div>
            <p class="pd60">账号</p>
            <el-form-item prop="username">
              <!-- <span class="svg-container">
                <svg-icon icon-class="user" />
              </span> -->
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入用户名"
                name="username"
                type="text"
                tabindex="1"
              />
            </el-form-item>
            <p class="pd60">密码</p>

            <el-form-item prop="password">
              <!-- <span class="svg-container">
                <svg-icon icon-class="password" />
              </span> -->
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button :loading="loading" type="primary" 
              style="
                display:block;
                margin:50px 60px;
                width:72%;background:#2E74D1; 
                border-color:#2E74D1;" 
                @click.native.prevent="handleLogin">登 录</el-button>

            <!-- <div style="position:relative">
              <div class="tips">
                <span>Username : admin</span>
                <span>Password : any</span>
              </div>
              <div class="tips">
                <span style="margin-right:18px;">Username : editor</span>
                <span>Password : any</span>
              </div>

            </div> -->
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import componentsRouter from '@/router/modules/components.js'
// import constantRoutes from '@/router/index.js'
import routerIndex from '@/router/index.js'

import { setToken } from '@/utils/auth'
import * as Api from '@/api/login'


export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,



      capsTooltip: false,
      otherQuery: {}
    }
  },
  watch: {},
  created() {
  },
  computed: {
    ...mapGetters([
      'permission_routes',
    ]),
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          var param = {
            "username": this.loginForm.username,
            "password": this.loginForm.password,
            "moduleId":5,
          };
          return
          Api.loginInit(param).then(res => {
            this.loading = false;
            if(res.code == 200) {
              // 本地存储token
              setToken(res.data.access_token)
              
              localStorage.setItem ('Siw-userInfo',JSON.stringify(res.data))
              // 后台获取路由
              Api.getMenu().then(res => {
                let {code,data,msg,total} = res
                
                if(code == 200){
                  // 后台获取回來的路由
                  let menuList = data;
                  localStorage.setItem ('Siw-menuList',JSON.stringify(data))
                  window.location.reload()
                  // console.log(componentsRouter,'本地的目录')
                  return 
                  // 循环后台的权限
                  // menuList.forEach(item => {
                  //   console.log(item,'item后台权限')
                  //   // 循环本地的目录
                  //   componentsRouter.forEach(ele => {
                  //     // 一级导航选中项
                  //     if(item.name == ele.name ){
                  //       // 一级路由设定
                  //       ele.hidden = false;
                  //       item.children.forEach(child => {
                  //         // 循环本地对比
                  //         ele.children.forEach(chd => {
                  //           if(child.name == chd.name ){
                  //             console.log(child,'child.name ')
                  //             chd.hidden = false;
                  //           }else{
                  //             chd.hidden = true;
                  //           }
                  //         });
                  //       });
                  //     }else{
                  //        ele.hidden = true;
                  //     }
                  //   });
                  //   // this.$store.commit('permission/SET_ROUTES', componentsRouter)
                  //   // this.$router.addRoutes(componentsRouter)
                  //   // this.$router.push({path: '/'})
                  //   window.location.reload()
                  // });

                  
                 
                  
                    
                      
            
                }else{
                  localStorage.removeItem('Siw-menuList')
                }
              }).catch( error => {
                localStorage.removeItem('Siw-menuList')
              })

              // this.$router.push({path:'/'})

    
            }

          }).catch( error => {
            localStorage.removeItem('Siw_userInfo');
            localStorage.removeItem('Siw-menuList')
            this.loading = false
          })
            
            
        } else {
          // console.log('请输入账号密码')
          return false
        }
      })
    },
    handleLogin1() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    
    
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      
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
.pd60 {padding: 0 60px; color: #669999; font-size:16px;line-height: 32px;padding-top:20px;margin:0;}

.login-container {
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
    padding: 76px 0 0 0;
}
  .content { 
    // min-width: 1200px; 
    // max-width: 1350px;
    margin: 0 auto;
    min-height: 100%;
    background-color: #2E74D1;
    // background-image: linear-gradient(to top, #2E74D1, #2E74D1);
    overflow: hidden;
    padding-top: 45px;
  }
 
  .wrap-bg {
    width: 742px;
    height: 508px;
    float: left;
    margin-top: -10px;
    background-image: url('../../assets/login/login-bg1.png');
    background-size: 100% 100%;
  }
  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    float: right;
    margin-right:45px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 8px  rgba(0,0,0,0.3);
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
