// 首页
<template>
  <div class="app-container dashboard-success-container">
    <!--     
    <div class="dashboard-text">
      <img class="welcomeImg" :src='img'/>
    </div> -->

    <el-row>
      <el-col :span="24">
        <BarChart />
      </el-col>
      <el-col :span="24">
        <BoxCard />
      </el-col>

      <el-col :span="24">
        <PanelGroup />
      </el-col>

      <el-col :span="12">
        <RaddarChart />
      </el-col>
      <el-col :span="12">
        <PieChart />
      </el-col>

      <el-col :span="24">
        <TodoList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import welcomell from "@/assets/welcome.png";
import BarChart from "./components/BarChart";
import BoxCard from "./components/BoxCard";
import LineChart from "./components/LineChart";
import PanelGroup from "./components/PanelGroup";
import PieChart from "./components/PieChart";
import RaddarChart from "./components/RaddarChart";
import TodoList from "./components/TodoList";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard,
  },
  data() {
    return {
      img: welcomell,
      lineChartData: lineChartData.newVisitis,
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-success-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .dashboard-text {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: Center;
    min-height: calc(100vh - 114px);
  }
  .welcomeImg {
    width: 450px;
    height: 450px;
  }
}
</style>
