<!-- demo -->
<template>
  <div class="contentWrap demo">
    <!-- 公用表头 -->
    <loginHeader />
    <el-form
      ref="ruleForm"
      label-width="150px"
      :model="ruleForm"
      sizi="mini"
      :inline="false"
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="单张上传:">
        <img
          v-if="ruleForm.oneImg"
          class="imgWrap"
          :src="ruleForm.oneImg"
          @click="handlePreviewImg(ruleForm.oneImg)"
        >
        <uploadImg
          :base-info.sync="ruleForm"
          :filed="'oneImg'"
          :up-type="1"
          :style-type="1"
          :text-content="'点击上传'"
        />
      </el-form-item>
      <el-form-item label="父组件调用子组件">
        <uploadImg
          v-show="false"
          ref="uploadPDF"
          :base-info.sync="ruleForm"
          :filed="'jobProjectUrl'"
          :up-type="3"
          :style-type="3"
          :text-content="'上传PDF'"
        />
        <el-button
          v-if="ruleForm.jobProjectUrl"
          type="text"
          class="green"
          @click="handleLooK(ruleForm.jobProjectUrl)"
        >查看PDF</el-button>

        <el-button type="text" class="green" @click="changeFile">{{
          ruleForm.jobProjectUrl ? "重新上传" : "上传PDF"
        }}</el-button>
      </el-form-item>

      <el-form-item label="阿里图标:">
        <i class="yxkj yxkj-tuichu" />
      </el-form-item>

      <el-form-item label="动态组件 is:">
        <component is="LoginHeader" />
      </el-form-item>

      <el-form-item label="表格高度:" />

      <el-table
        ref="staffTable"
        v-loading="loading"
        :height="tableHeight"
        :data="tableList"
        style="width: 100%"
        size="mini"
        border
      >
        <el-table-column
          label="姓名"
          align="center"
          min-width="100"
          prop="realName"
        />

        <el-table-column
          label="手机号"
          align="center"
          min-width="120"
          prop="mobile"
        />
      </el-table>
    </el-form>

    <!-- 图片预览弹窗 -->
    <el-dialog
      title="图片预览"
      :visible.sync="dialogTablePreview"
      class="previewImg"
    >
      <img :src="PreviewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import imgUrl from '@/assets/images/null.png'
import LoginHeader from '@/components/loginHeader'
import uploadImg from '@/components/uploadImg/index.vue'
import nullImg from '@/assets/images/nullImg.png'
import {
  getToken,
  removeToken,
  setToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo
} from '@/utils/auth' // 从cookie获取令牌

import { tabHeight } from '@/utils'

export default {
  name: 'Demo',
  components: {
    LoginHeader,
    uploadImg
  },
  data() {
    // 身份证号验证
    const validateIdNum = (rule, value, callback) => {
      // 正则
      const idNumReg =
        /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      if (!value) {
        callback(new Error('请输入法人身份证号'))
      } else if (!idNumReg.test(value)) {
        callback(new Error('身份证格式有误,请重新填写...'))
      } else {
        callback()
      }
    }

    // 手机号正则
    const validateContactTel = (rule, value, callback) => {
      // 固话正则
      // const contactTelReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
      // 手机号正则
      const contactPhoneReg = /^1[3456789]\d{9}$/
      if (!this.ruleForm.contactPhone) {
        callback(new Error('请填写手机号码！！'))
      } else if (
        this.ruleForm.contactPhone &&
        !contactPhoneReg.test(this.ruleForm.contactPhone)
      ) {
        callback(new Error('手机号码有误，请重填'))
      } else {
        callback()
      }
    }

    // 大写T 加 4位数字
    const validateCertificateNum = (rule, value, callback) => {
      const certificateNumlReg = /^[T]\d{4}$/
      if (value == '') {
        callback(new Error('请输入'))
      } else if (value && !certificateNumlReg.test(value)) {
        callback(new Error('格式不正确,正确格式大写T加4位数字'))
      } else {
        callback()
      }
    }

    // 大写D 加 4位数字
    const validateQualificationNum = (rule, value, callback) => {
      const certificateNumlReg = /^[D]\d{9}$/
      if (value && !certificateNumlReg.test(value)) {
        callback(new Error('格式不正确,正确格式大写D加9位数字'))
      } else {
        callback()
      }
    }
    // 大写英文’+‘-’+ ‘数字
    const validateXhQualificationNum = (rule, value, callback) => {
      const certificateNumlReg = /^[A-Z]{0,13}\-[0-9]{0,13}$/

      if (value && !certificateNumlReg.test(value)) {
        callback(new Error('格式不正确,正确格式大写英文-数字'))
      } else {
        callback()
      }
    }
    // 数字和英文字母 限定位数
    const validateCreditCode = (rule, value, callback) => {
      const res = /^[A-Z0-9]{18}$/
      if (!value) {
        callback(new Error('统一社会信用代码不能为空'))
      } else if (value && !res.test(value)) {
        callback(new Error('格式不正确,正确格式18位数字或大写字母组成'))
      } else {
        callback()
      }
    }

    return {
      dialogTablePreview: false,
      loading: false,
      imgUrl: imgUrl,
      ruleForm: {
        oneImg: '',
        jobProjectUrl: ''
      },
      tableHeight: 50,

      tableList: [],

      rules: {
        oneImg: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'change'
          }
        ]
      },
      PreviewImgUrl: ''
    }
  },
  computed: {},
  watch: {},

  mounted() {
    this.$nextTick(function() {
      // 表格高度自适应
      this.tableHeight = tabHeight(
        this.tableHeight,
        this.$refs.staffTable.$el.offsetTop
      )
    })
  },

  created() {
    console.log(this.init(2))
    console.log(this.$store.getters.token, '调取')
  },

  methods: {
    init(type) {
      let role = ''
      switch (type) {
        case 2:
          role = '11'
          break
        case 3:
          role = '122'
          break
        case 4:
          role = '333'
          break
      }
      return role
    },

    // 更新PDF
    changeFile() {
      this.$refs[`uploadPDF`].$refs['uploadFile'].$refs[
        'upload-inner'
      ].handleClick()
    },

    // 查看pdf
    handleLooK(url) {
      window.open(url, '_blank')
    },

    // 图片预览
    handlePreviewImg(imgUrl) {
      this.PreviewImgUrl = imgUrl.url || imgUrl
      this.dialogTablePreview = true
    }
  }
}
</script>
<style lang="scss">
.demo {
  padding-top: 60px;
  .loginHeader {
    background-color: #2e74d1;
    color: #fff;

    .navList > a {
      color: #fff;
    }
  }
}
</style>

<style lang="scss" scoped>
.demo {
  // 背景自适应·
  // background-size: cover
}
</style>
