// 单张图片上传阿里云
// 自定义样式 之后调用该组件 this.$refs[`uploadPDF`].$refs["uploadFile"].$refs[
//         "upload-inner"
//       ].handleClick();
<template>
  <div>
    <!-- 样式0 -->
    <div v-if="!styleType" class="styleType0">
      <el-upload
        :disabled="loading"
        class="avatar-uploader"
        :action="actionUrl"
        :accept="accept"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-change="getFile"
        style="position: relative"
      >
        <img
          v-if="baseInfo[filed] && !upType"
          :src="baseInfo[filed]"
          class="avatar"
        >
        <!-- <img :src="baseInfo[filed]" class="avatar" /> -->
        <div
          v-else-if="baseInfo[filed] && upType == 2"
          style="margin-bottom:100px z-index:100"
        >
          <!-- {{baseInfo[filed]}} -->
          <span class="videoBtn">重新上传</span>
          <video controls class="video fr" width="128" height="86">
            <source :src="baseInfo[filed]" type="video/mp4">
            您的浏览器不支持 HTML5 video 标签。
          </video>
        </div>
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
    <!-- 样式1 -->
    <div v-if="styleType == 1" class="styleType1">
      <el-upload
        class="avatar-uploader"
        :action="actionUrl"
        :accept="accept"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-change="getFile"
      >
        <el-button type="primary" size="mini" :loading="loading">{{
          textContent || "上传"
        }}</el-button>
      </el-upload>
    </div>

    <!-- 样式3  文件-->
    <div v-if="styleType == 3" class="styleType3">
      <el-upload
        ref="uploadFile"
        class="avatar-uploader"
        :action="actionUrl"
        :accept="accept"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-change="getFile"
      >
        <i class="el-icon-plus avatar-uploader-icon" />
        <div class="el-upload__text">上传文件格式为：pdf,doc</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api/ls_Web'
import OSS from 'ali-oss'
export default {
  // styleType样式选择 默认空 可不传
  // upType 0图片(默认可不传) 1.视频图片都可以 2.视频 3.pdf 4.压缩文件 5.图片或图片压缩文件
  // upType ==1 时 必须 styleType  ==1
  // limitSize 限制图片大小
  props: [
    'baseInfo',
    'filed',
    'styleType',
    'upType',
    'textContent',
    'limitSize',
    'isDisable'
  ],
  data() {
    return {
      loading: false,
      accept: '',
      actionUrl: '',
      // 阿里云上传服务端签名
      aliyunOssSign: {
        accessid: '',
        policy: '',
        signature: '',
        dir: '',
        host: '',
        expire: ''
      },
      msg: ''
    }
  },
  created() {
    this.loading = this.isDisable
    this.accept = !this.upType
      ? 'image/jpeg, image/gif, image/png'
      : this.upType == 1
        ? 'image/jpeg, image/gif, image/png, video/*'
        : this.upType == 2
          ? 'video/*'
          : this.upType == 3
            ? 'application/pdf,.doc'
            : this.upType == 4
              ? '.rar,.zip'
              : this.upType == 5
                ? 'image/jpeg, image/gif, image/png,.rar,.zip'
                : 'image/jpeg, image/gif, image/png'
    this.msg =
      this.upType == 0
        ? '照片上传失败！'
        : this.upType == 2
          ? '视频上传失败！'
          : this.upType == 3
            ? 'PDF上传失败！'
            : '上传失败！'
    // console.log(this.upType,'tihis.upType')
    // console.log(this.accept,'tihis.accept')
    // console.log(this.styleType,'tihis.styleType')
  },

  methods: {
    beforeAvatarUpload() {},
    // 阿里云上传服务端签名接口
    handleGetAliyunOssSign(file) {
      // 设置类型
      // this.handleSetType(file.type);
      if (this.limitSize) {
        const isLimit = file.size / 1024 / 1024 < this.limitSize
        if (!isLimit) {
          return this.$message.error(
            '上传图片大小不能超过' + this.limitSize + 'M'
          )
        }
      }

      Api.getAliyunOssSign()
        .then((res) => {
          // let {accessid, policy, signature, dir, host, expire } = res.data
          // return
          this.loading = true
          const {
            accessKeySecret,
            assessKeyId,
            bucket,
            path,
            region,
            stsToken
          } = res.data
          const client = new OSS.Wrapper({
            accessKeyId: assessKeyId,
            accessKeySecret: accessKeySecret,
            stsToken: stsToken,
            region,
            bucket,
            secure: true
          })
          // 上传到阿里云
          const name = new Date().getTime() + ''
          const suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
          client
            .multipartUpload(`${path}/${name}.${suffix}`, file, {
              progress: function * (percentage) {}
            })
            .then((res) => {
              this.loading = false

              this.$message({
                message: '上传成功！！',
                type: 'success'
              })
              // console.log(222222,'imgUrl')
              const imgUrl = `https://${bucket}.${region}.aliyuncs.com/${res.name}`
              // console.log(imgUrl, "imgUrl");
              this.baseInfo[this.filed] = imgUrl
              this.$emit('update:baseInfo', this.baseInfo)
            })
            .catch((_) => {
              this.loading = false

              this.$message({
                message: this.msg,
                type: 'error'
              })
              // 请求错误时 应该删除
              // this.removeUplodFileList(file.name);
            })
        })
        .catch((_) => {})
    },

    // 设置类型
    handleSetType(fileType) {
      // image  video
      const _type = fileType.split('/')
      // ["image", "jpeg"] "_type"
      //  ["application", "pdf"] "_type"
      // ["video", "mp4"] "_type"
      // console.log(fileType, "_type");

      return _type
    },

    getFile(file, fileList) {
      // 上传头像
      if (file.status == 'ready') {
        return
      }
      // 获取阿里云上传服务端签名接口
      this.handleGetAliyunOssSign(file.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
.styleType0,
.styleType3 {
  .avatar-uploader {
    width: 128px;
    height: 86px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: content-box;
  }

  .imgLogoWrap {
    width: 128px;
    height: 86px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 86px;
    line-height: 86px;
    text-align: center;
  }

  .avatar {
    width: 128px;
    height: 86px;
    display: block;
  }
  .videoBtn {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
    top: 0;
    color: #fff;
    // padding-top:8px;
    // line-height: 20px;
    opacity: 0.8;
    cursor: pointer;
  }
  .videoBtn:hover {
    z-index: 100;
    // padding-bottom:8px;
    background: rgba(0, 0, 0, 0.8);
  }
}
.styleType1 {
}
.video {
  background: rgba(0, 0, 0, 0.7);
}

.styleType3 /deep/ .el-upload {
  width: 100%;
  height: 100%;
}
.styleType3 .el-upload__text {
  color: #333;
}
</style>
