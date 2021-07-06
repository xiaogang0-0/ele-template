// 首页
<template>
  <div class="dashboard-editor-container">

    <div class="dashboard-text">
      <img :src="imgUrl" alt="">
      <!--只有公司端可以展示底部-->
      <div v-show="this.isShow==0">
        <!-- <Footer /> -->
      </div>
    </div>

  </div>
</template>

<script>
import welcomell from '@/assets/images/welcome.png'

import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { removeToken } from '@/utils/auth'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard
  },
  data() {
    return {
      // 显示哪个首页  user 为客户端   admin 为后台登录
      isShow: 'user',
      img: welcomell,
      lineChartData: lineChartData.newVisitis,
      imgUrl: welcomell
    }
  },
  created() {
    window.location.href = window.location.href
  },
  mounted() {
    // 0是企业用户 1是系统用户,
    this.isShow = localStorage.getItem('YXKJ_userInfo') ? JSON.parse(localStorage.getItem('YXKJ_userInfo')).userType : ''
    console.log(this.isShow, 'userType')
    // 显示哪个首页  0 为客户端   1 为后台登录
    //     if(this.isShow == '0'){
    //         // console.log( JSON.parse(localStorage.getItem('YXKJ_userInfo')).userType)
    //         this.$router.push({
    //         name:'registrationInforMange'
    //       })
    //     }
    //     if(this.isShow == '1'){
    //         // console.log( JSON.parse(localStorage.getItem('YXKJ_userInfo')).userType)
    //         this.$router.push({
    //         name:'companyManagement'
    //       })
    //     }
    //
    //     if(this.isShow == ''){
    //       removeToken();
    //       localStorage.removeItem('YXKJ_userInfo')
    //       localStorage.removeItem('YXKJ_menuList')
    //       // setTimeout(()=>{
    //       //   this.$router.push({path: '/login' })
    //       // },200)
    //     }
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  /*height: 100vh;*/
  background-color: rgb(240, 242, 245);
  position: relative;
  .dashboard-text{
    /*height:100vh;*/
    text-align: center;
    display: flex;
    justify-content:center;
    align-items:Center;
    min-height: calc(100vh - 100px);
    position: relative;
    .img {
      position: absolute;
      top: 0px;
      width:150px;
      height:150px;
      margin:0 0 0 -75px;
      left:50%;
      h3{
        margin:0 0 10px 0;
      }
      img{
        width:150px;
        height:150px;
        display: block;
      }
    }
    .title,.title2 {
      position: absolute;
      top: 85px;
      font-size: 38px;
      font-weight: 600;
      width:600px;
      margin:0 0 0 -300px;
      left:50%;
    }
    .title2 {
      width:600px;
      top: 130px;
      margin:0 0 0 -300px;
      left:50%;
    }
    .inform{
      width:600px;
      position: absolute;
      top:240px;
      left:50%;
      margin:0 0 0 -300px;
      p{
        line-height:30px;
      }
    }
  }
  .welcomeImg {
    width:450px;
    height: 450px;
  }
  .inform {
    width: 660px;
    margin: 0 auto 20px;
    padding: 20px 20px;
    background-color: rgba(255, 195, 0, 1);
    p {
      text-align: center;
      line-height: 20px;
      font-size:20px;
    }
  }
}

</style>
