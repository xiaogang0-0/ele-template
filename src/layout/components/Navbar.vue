<template>
  <div class="navbar">
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <span class="userName el-breadcrumb app-breadcrumb breadcrumb-container">{{userName}}</span>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="usImg" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
         
          <!-- <el-dropdown-item divided> -->
          <el-dropdown-item>
            <template>
              <span type="text" @click="centerDialogVisible = true">修改密码</span>
            </template>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      class="changeDialog"
      :append-to-body="true"
      width="430px"
      center
    >
      <div class="password">
        <span class="text">旧 &nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span>
        <el-input v-model="oldPassword" minlength="6" placeholder="请输入旧密码" @blur="changeInput" />
      </div>
      <div class="password">
        <span class="text">新 &nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span>
        <el-input
          @blur="changeInput"
          minlength="6"
          v-model="password"
          placeholder="请输入新密码，不少于6位"
          show-password
        />
      </div>
      <div class="password">
        <span class="text">确认新密码：</span>
        <el-input
          @blur="changeInput"
          minlength="6"
          v-model="confirmPassword"
          placeholder="请再次输入新密码"
          show-password
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as Api from "@/api/login";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import usImg from "@/assets/userImg.png";
import { removeToken } from "@/utils/auth";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      centerDialogVisible: false,
      usImg: usImg,
      oldPassword: "",
      password: "",
      confirmPassword: "",
      userName: "",
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  created() {
    this.userName = JSON.parse(localStorage.getItem("ShoppingMall_userInfo"))
      ? JSON.parse(localStorage.getItem("ShoppingMall_userInfo")).username
      : "";
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },

    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // }

    // 退出登陆
    logout() {
      Api.landingExit("")
        .then((res) => {
          // console.log(res)
          if (res.code == 200) {
            //   console.log(res.data.msg);
            removeToken();
            localStorage.removeItem("ShoppingMall_userInfo");
            localStorage.removeItem("ShoppingMall_menuList");
            // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            this.$router.push({ path: "/login" });
          }
        })
        .catch((_) => {
          // console.log(err);
          removeToken();
          localStorage.removeItem("ShoppingMall_userInfo");
          localStorage.removeItem("ShoppingMall_menuList");
          // sessionStorage.removeItem('ShoppingMall_menuList')
          // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          this.$router.push({ path: "/login" });
        });
    },

    changeInput() {
      // console.log(this.oldPassword.length);
    },
    
    // 关闭弹窗
    close() {
      this.centerDialogVisible = false;
    },

    submit() {
      if (
        this.oldPassword.length < 6 ||
        this.password.length < 6 ||
        this.confirmPassword.length < 6
      ) {
        this.centerDialogVisible = true;
        this.$message({
          message: "密码不少于六位",
          type: "warning",
        });
      } else {
        // console.log('调接口');
        var param = {
          oldPassword: this.oldPassword,
          password: this.password,
        };
        if (this.password == this.confirmPassword) {
          Api.changePassword(param)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "密码修改成功",
                  type: "success",
                });
                this.oldPassword ='';
                this.password='';
                this.confirmPassword='';
                // console.log(456);
              } else {
                // console.log(123);

                this.$message({
                  message: res.msg,
                  type: "warning",
                });
              }
              // console.log(res);
            })
            .catch((_) => {
              // console.log(err);
            });
          this.centerDialogVisible = false;
        } else {
          this.$message({
            message: "密码不正确  请检查",
            type: "warning",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.userName {
  // margin-right: 30px;
  line-height: 50px;
}
.changeDialog {
  .text {
    line-height: 40px;
  }
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
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
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
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
  .el-input {
    width: 70%;
    float: left;
    margin-left: 20px;
  }
  .password {
    display: flex;
    margin-bottom: 20px;
    span {
      display: inline-block;
      line-height: 40px;
    }
  }
  .dialog-footer {
    .el-button {
      margin: 0 15px;
    }
  }
}
</style>
