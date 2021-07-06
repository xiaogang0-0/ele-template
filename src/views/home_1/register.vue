<!-- 注册页  -->
<template>
  <div class="contentWrap register">
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
      <el-form-item label="单张上传:" prop="businessLicense">
        <img
          v-if="ruleForm.oneImg"
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
// import * as Api from "@/api/....";

export default {
  name: 'Register',
  components: {
    LoginHeader,
    uploadImg
  },
  data() {
    return {
      dialogTablePreview: false,
      imgUrl: imgUrl,
      ruleForm: {
        oneImg: ''
      },

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

  mounted() {},

  created() {},

  methods: {
    init() {},

    // 图片预览
    handlePreviewImg(imgUrl) {
      this.PreviewImgUrl = imgUrl.url || imgUrl
      this.dialogTablePreview = true
    }
  }
}
</script>
<style lang="scss">
.register {
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
.register {
}
</style>
