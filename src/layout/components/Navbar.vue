<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">

      <span class="userName el-breadcrumb app-breadcrumb breadcrumb-container">{{ userName ? userName : '' }}</span>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="usImg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="handleOpen(0)">修改密码</span>
          </el-dropdown-item>

          <el-dropdown-item>
            <span style="display:block;" @click="handleOpen(1)">修改手机号</span>
          </el-dropdown-item>

          <!-- <el-dropdown-item divided> -->
          <el-dropdown-item style="padding: 0px;">
            <span style="display:block; padding: 0 17px;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <el-dialog
        title="修改密码"
        :modal-append-to-body="false"
        :visible.sync="centerDialogVisiblepwd"
        width="430px"
        center
      >

        <div class="lay-box">
          <span>手机号</span>
          <el-form-item prop="mobile" class="verificationCode">
            <el-input
              ref="mobile"
              v-model.number="loginForm.mobile"
              placeholder="请输入手机号"
              name="mobile"
              type="text"
              tabindex="1"
            />
          </el-form-item>
        </div>

        <div class="lay-box">
          <span>验证码</span>
          <el-form-item prop="verifyCode" class="verificationCode">
            <el-input
              ref="verifyCode"
              v-model.trim="loginForm.verifyCode"
              placeholder="请输入验证码"
              name="verifyCode"
              type="text"
            />

          </el-form-item>
          <span
            v-show="!isActive"
            class="cblue cursor y-btn"
            @click="handleTime"
          >获取验证码</span>
          <span
            v-show="isActive"
            class="cblue"
          >{{ num ? num + 's': '' }}</span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitNext">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <el-dialog
        title="变更手机号"
        :modal-append-to-body="false"
        :visible.sync="centerDialogVisiblePhone"
        width="430px"
        center
      >

        <div class="lay-box">
          <span class="span-g">原手机号</span>
          <el-form-item prop="mobile" class="verificationCode">
            <el-input
              ref="mobile"
              v-model.number="loginForm.mobile"
              placeholder="请输入手机号"
              name="mobile"
              type="text"
              tabindex="1"
            />
          </el-form-item>
        </div>

        <div class="lay-box">
          <span class="span-g">验证码</span>
          <el-form-item prop="verifyCode" class="verificationCode">
            <el-input
              ref="verifyCode"
              v-model.trim="loginForm.verifyCode"
              placeholder="请输入验证码"
              name="verifyCode"
              type="text"
            />

          </el-form-item>
          <span
            v-show="!isActive"
            class="cblue cursor y-btn"
            @click="handleTime"
          >获取验证码</span>
          <span
            v-show="isActive"
            class="cblue"
          >{{ num ? num + 's': '' }}</span>
        </div>
        <p style="color: red; text-align: center">原手机号不能使用时请联系xm01638552微信号</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitNext">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <el-dialog
        title="变更手机号"
        :modal-append-to-body="false"
        :visible.sync="centerDialogVisiblePhone2"
        width="430px"
        center
      >

        <div class="lay-box">
          <span class="span-g">新手机号</span>
          <el-form-item prop="mobile" class="verificationCode">
            <el-input
              ref="mobile"
              v-model.number="loginForm.mobile"
              placeholder="请输入新手机号"
              name="mobile"
              type="text"
              tabindex="1"
            />
          </el-form-item>
        </div>

        <div class="lay-box">
          <span class="span-g">验证码</span>
          <el-form-item prop="verifyCode" class="verificationCode">
            <el-input
              ref="verifyCode"
              v-model.trim="loginForm.verifyCode"
              placeholder="请输入验证码"
              name="verifyCode"
              type="text"
            />

          </el-form-item>
          <span
            v-show="!isActive"
            class="cblue cursor y-btn"
            @click="handleTime2"
          >获取验证码</span>
          <span
            v-show="isActive"
            class="cblue"
          >{{ num ? num + 's': '' }}</span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitPhone">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>

    <el-dialog
      title="修改密码"
      :modal-append-to-body="false"
      :visible.sync="centerDialogVisible"
      width="430px"
      center
    >
      <div class="password">
        <span>新密码：&nbsp;&nbsp;&nbsp;</span>
        <el-input v-model="password" minlength="6" placeholder="请输入新密码" show-password @blur="changeInput" />
      </div>
      <div class="password">
        <span>再次输入：</span>
        <el-input v-model="confirmPassword" minlength="6" placeholder="请再次输入新密码" show-password @blur="changeInput" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
// import { changePassword,landingExit } from '@/api/login'
import * as Api from '@/api/login'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import usImg from '@/assets/images/userImg.png'
import { removeToken } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    Search
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
    return {
      getTypeVerifyCode: 0, // 0 是改密码时 1是该手机号时
      loading: false,
      // 是否进行了点击操作
      isActive: false,
      num: 59,
      centerDialogVisiblepwd: false,
      centerDialogVisiblePhone: false,
      centerDialogVisiblePhone2: false,
      centerDialogVisible: false,
      usImg: usImg,
      oldPassword: '',
      password: '',
      confirmPassword: '',
      userName: '',
      userType: '',
      loginForm: {
        // 手机号
        mobile: '',
        // 验证码
        verifyCode: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validatePhoneNumber }]
        // verifyCode: [{ required: true, trigger: 'blur', message: '验证码不能为空'}]
      },
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    const data = localStorage.getItem('YXKJ_userInfo')
    if (data) {
      // console.log(JSON.parse(data),'22222')
      this.userType = JSON.parse(data).userType
      if (this.userType == 1) {
        this.userName = JSON.parse(data).realName
      } else {
        this.userName = JSON.parse(data).customerName
      }
    }
    // this.userName = JSON.parse(localStorage.getItem('YXKJ_userInfo')) ? JSON.parse(localStorage.getItem('YXKJ_userInfo')).username : '';
  },
  methods: {
    // init
    init() {
      this.isActive = false
      this.num = 59
      clearInterval(this.timer)
      this.loginForm.mobile = ''
      this.loginForm.verifyCode = ''
    },
    // 倒计时
    handleTime() {
      // console.log(this.userType) //  === 0 是login端

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isActive = true

          this.handeleGetVerifyCode()

          this.timer = setInterval(() => {
            if (this.num < 1) {
              this.isActive = false
              this.num = 59
              clearInterval(this.timer)
            }
            this.num--
          }, 1000)
        } else {
          // console.log('请输入账号密码')
          return false
        }
      })
    },
    // 更改手机号时获取验证码
    handleTime2() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isActive = true

          // 修改手机号时获取第二个验证码
          const param = {
            mobile: this.loginForm.mobile,
            verifyCode: this.loginForm.verifyCode
          }
          Api.getPhoneSendVerifyCode(param,).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '验证码已发送至' + this.loginForm.mobile + '上请注意查收',
                type: 'success'
              })
            }
          }).catch(error => {
          })

          this.timer = setInterval(() => {
            if (this.num < 1) {
              this.isActive = false
              this.num = 59
              clearInterval(this.timer)
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
      // 修改密码时走的验证码
      if (this.getTypeVerifyCode == 0) {
        const param = {
          mobile: this.loginForm.mobile
        }
        Api.getPasswordSendVerifyCode(param,).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '验证码已发送至' + this.loginForm.mobile + '上请注意查收',
              type: 'success'
            })
          }
        }).catch(error => {
        })
      } else {
        // 修改手机号时获取的验证码
        const param = {
          mobile: this.loginForm.mobile,
          verifyCode: this.loginForm.verifyCode
        }
        Api.getPhoneSendVerifyCode(param,).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '验证码已发送至' + this.loginForm.mobile + '上请注意查收',
              type: 'success'
            })
          }
        }).catch(error => {
        })
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // }

    // 退出登陆
    logout() {
      removeToken()
      localStorage.removeItem('YXKJ_userInfo')
      localStorage.removeItem('YXKJ_menuList')

      if (this.userType == 0) {
        setTimeout(() => {
          this.$router.push({ path: '/login' })
        }, 200)
      }

      if (this.userType == 1) {
        setTimeout(() => {
          this.$router.push({ path: '/home' })
        }, 200)
      }

      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      return

      // sessionStorage.removeItem('YXKJ_menuList')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)

      Api.landingExit('').then(res => {
        // console.log(res)
        if (res.code == 200) {
        //   console.log(res.data.msg);
          removeToken()
          localStorage.removeItem('YXKJ_userInfo')
          localStorage.removeItem('YXKJ_menuList')
          // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          this.$router.push({ path: '/login' })
        }
      }).catch(err => {
        // console.log(err);
        removeToken()
        localStorage.removeItem('YXKJ_userInfo')
        localStorage.removeItem('YXKJ_menuList')
        // sessionStorage.removeItem('YXKJ_menuList')
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.$router.push({ path: '/login' })
      })
    },

    changeInput() {
      // console.log(this.oldPassword.length);
    },
    // 修改密码时及修改手机号时
    handleOpen(v) {
      // console.log(v)
      this.getTypeVerifyCode = v
      // 修改密码
      if (this.getTypeVerifyCode == 0) {
        this.centerDialogVisiblepwd = true
        this.getTypeVerifyCode = 0
      } else {
        // 修改手机号
        this.centerDialogVisiblePhone = true
        this.getTypeVerifyCode = 1
      }
    },
    // 关闭弹窗
    close() {
      this.centerDialogVisible = false
      this.centerDialogVisiblepwd = false
    },
    // 点击修改密码 - 校验验证码
    submitNext() {
      // 修改密码时验证修改密码的验证码
      if (this.getTypeVerifyCode == 0) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
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
            // 向服务器校验验证码
            Api.getPasswordVerifyCode(param).then(res => {
              this.loading = false
              if (res.code == 200) {
              // 关闭第一个弹窗
                this.centerDialogVisiblepwd = false
                // 验证码有效通过
                this.centerDialogVisible = true
                // 清除验证码倒计时及手机号验证码为空
                this.init()
              }
            }).catch(error => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      } else {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
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
            // 向服务器校验验证码
            Api.getPhoneVerifyCode(param).then(res => {
              this.loading = false
              if (res.code == 200) {
                // 关闭第一个弹窗
                this.centerDialogVisiblePhone = false
                // 验证码有效通过打开第二个
                this.centerDialogVisiblePhone2 = true
                // 清除验证码倒计时及手机号验证码为空
                this.init()
              }
            }).catch(error => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    },
    // 修改按钮完成
    submit() {
      if (this.password.length < 6 || this.confirmPassword.length < 6) {
        this.centerDialogVisible = true
        this.$message({
          message: '密码大于六位',
          type: 'warning'
        })
      } else {
        // console.log('调接口');
        var param = {
          // 'oldPassword': this.oldPassword,
          'password': this.password
        }
        if (this.password == this.confirmPassword) {
          Api.changePassword(param).then(res => {
            if (res.code == 200) {
              this.logout()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
            // console.log(res);
          }).catch(err => {
            // console.log(err);

          })
          this.centerDialogVisible = false
        } else {
          this.$message({
            message: '密码不正确  请检查',
            type: 'warning'
          })
        }
      }
    },

    // 修改手机号完成
    submitPhone() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
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

          Api.submitPhone(param).then(res => {
            if (res.code == 200) {
              // 验证码有效通过打开第二个
              this.centerDialogVisiblePhone2 = false
              // 清除验证码倒计时及手机号验证码为空
              this.init()
              return this.$message({
                message: '手机号变更成功',
                type: 'warning'
              })
            }
          }).catch(err => {
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

<style lang="scss" scoped>
.title {
  line-height: 50px;
  width: 50vw;
  font-weight: 800;
  color: #409eff;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
}
.userName{
  // margin-right: 30px;
  line-height: 50px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .el-input{
    width: 84%;
    float: left;
    margin-left: 20px;
  }
  .password{
    display: flex;
    margin-bottom: 20px;
    span{
      display: inline-block;
      line-height: 40px;
    }
  }
  .lay-box {
    display: flex;
    span{
      display: inline-block;
      line-height: 40px;
    }
    .span-g{
      width:56px;
    }
    .verificationCode {
      width:240px;
    }
    .y-btn {
      display: inline-block;
      vertical-align: middle;
      width: 75px;
    }
  }
  .dialog-footer {
    .el-button {margin: 0 15px}
  }
}
</style>
