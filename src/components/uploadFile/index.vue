// accept=".xls, .xlsx, .docx" 上传文件 https://www.jb51.net/article/159686.htm
<template>
  <div v-if="btnType" style="display:inline-block;">
    <el-tooltip
      class="item"
      effect="dark"
      content="已存在销售目标数据的，导入将会替换之前的数据表，请谨慎操作！！"
      placement="bottom"
    >
      <!-- 上传前的拦截逻辑  后期添加、导入个人目标和导入企业目标判断是否有数据判断依据是不一样的，判断是否已经导入企业目标数据时逻辑不变，判断是否导入个人目标可根据当前页面请求数据时，返回的列表中是否有数据来判断； -->
      <el-upload
        ref="upload"
        :action="actionUrl"
        :show-file-list="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        accept=".xls, .xlsx"
        :auto-upload="false"
        :on-change="getFile"
        class="upload-demo"
      >
        <el-button
          slot="trigger"
          size="mini"
          type="primary"
        >{{ btnType==1 ? '导入个人目标' : btnType==2 ? '导入企业目标' : ''}}</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </el-tooltip>
  </div>
</template>

<script>
import * as Api from "@/api/salesTargetManage";
export default {
  props: ["btnType"],
  data() {
    return {
      actionUrl: "",
      fileList: []
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    getFile(file, fileList) {
      // 取消默认行为 //创建 formData 对象
      event.preventDefault();
      // 向 formData 对象中添加文件
      let formData = new FormData();
      formData.append(
        "file",
        event.target.files[0],
        event.target.files[0].name
      );
      Api.uploadFiles(formData).then(res => {
        const { code, url, msg } = res;
        if (code == 200) {
          // 更新父组件成功函数 function 类型
          let _data = {
            // 七牛云地址
            path: url,
            // 导入目标 type 1.个人 2.企业
            type: this.btnType
          };
          this.$emit("successCBK", _data);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
