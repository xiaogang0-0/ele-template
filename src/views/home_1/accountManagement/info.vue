// 人员列表 personnelDatabaseManagement
<template>
  <div class="contentWrap personnelDatabaseManagement">
    <el-form
      ref="ruleForm"
      size="mini"
      :inline="true"
      :model="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item
        label="身份信息:"
        style="margin-bottom: 0"
        class="orderStatus"
      >
        <el-checkbox-group v-model="ruleForm.stationArray">
          <el-checkbox
            v-for="city in stationData"
            :key="city.id"
            :label="city.name"
          >{{ city.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="人员状态:"
        style="margin-bottom: 0"
        class="orderStatus"
      >
        <el-checkbox-group v-model="ruleForm.isWorkArray">
          <el-checkbox
            v-for="city in isWorkArrayData"
            :key="city.id"
            :label="city.id"
          >{{ city.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="人员姓名:">
        <el-input v-model="ruleForm.ename" placeholder="输入人员姓名" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="handleSearch('ruleForm')"
        >查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      size="mini"
      style="width: 100%"
      border
      max-height="450"
      :data="tableList"
    >
      <el-table-column type="index" label="序号" align="center" width="50" />

      <el-table-column
        prop="ename"
        label="姓名"
        align="center"
        min-width="90"
      />

      <el-table-column align="center" prop="sex" min-width="50" label="性别" />

      <el-table-column
        align="center"
        prop="idNum"
        min-width="150"
        label="身份证号"
      />

      <el-table-column
        align="center"
        prop="phone"
        min-width="100"
        label="主联系电话"
      />

      <el-table-column
        align="center"
        prop="phone2"
        min-width="100"
        label="辅联系电话"
      />

      <el-table-column
        align="center"
        prop="station"
        min-width="100"
        label="身份信息"
      />

      <el-table-column
        align="center"
        prop="isWork"
        min-width="70"
        label="人员状态"
      >
        <template slot-scope="scope">
          {{
            scope.row.isWork == 0
              ? "历史人员"
              : scope.row.isWork == 1
                ? "在岗"
                : ""
          }}
          <!-- {{scope.row.createTime.substring(0,16)}} -->
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handeEdit(scope.row)"
          >修改资料
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <paging
      v-if="tableList.length"
      :page="paging.pageNum"
      :size="paging.pageSize"
      :count="total"
      @change="changePage"
    />
  </div>
</template>

<script>
import paging from '@/components/pages/pagination.vue'
import * as Api from '@/api/accountManagement'
import { setToken } from '@/utils/auth'

export default {
  components: {
    paging // 分页
  },
  data() {
    return {
      loading: false,
      ruleForm: {
        // 企业id
        customerId: '',
        // 身份信息
        stationArray: [],
        // 人员状态：0历史人员，1在岗
        isWorkArray: [],
        // 姓名 模糊查询
        ename: ''
      },
      // 身份信息
      stationData: [],
      // 状态数据
      isWorkArrayData: [
        {
          name: '在岗人员',
          id: 1
        },
        {
          name: '历史人员',
          id: 0
        }
      ],
      tableList: [],
      oldForm: {},
      // 页码
      paging: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0
    }
  },

  computed: {},
  watch: {},

  mounted() {},

  created() {
    // this.handleSearch()
  },

  methods: {
    // 搜索
    handleSearch(formName) {
      this.paging.pageNum = 1
      const param = Object.assign({}, this.ruleForm, this.paging)
      // let param =Object.assign({},this.ruleForm,);
      this.oldForm = Object.assign({}, param)
      this.handleGetlist()
    },

    // 重置
    resetForm(formName) {},

    // 请求数据列表
    handleGetlist() {
      this.loading = true
      Api.post(this.oldForm)
        .then((res) => {
          this.loading = false
          const { code, data, msg, total } = res
          if (code == 200) {
            this.tableList = data
            this.total = total
          }
        })
        .catch((error) => {
          this.loading = false
          this.tableList = []
        })
    },

    // 编辑点击
    handeEdit(item) {
      this.$router.push({
        name: '',
        query: {}
      })
    },

    // 页码
    changePage({ type, page, size }) {
      this.paging.pageNum = page
      this.paging.pageSize = size
      this.oldForm = Object.assign({}, this.oldForm, this.paging)
      this.handleGetlist()
    }
  }
}
</script>

<style lang="scss" >
</style>
<style lang="scss" scoped>
.personnelDatabaseManagement {
  padding: 20px;
  .el-form {
    padding: 15px;
    padding-bottom: 0;
    margin-bottom: 10px;
    background: #f7f7f7;
    border-radius: 5px;
  }
}
</style>
