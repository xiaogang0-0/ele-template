// 单张图片上传阿里云
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="actionUrl"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-change="getFile"
    >
      <img v-if="baseInfo[filed]" :src="baseInfo[filed]" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>

  </div>
</template>

<script>
import * as Api from '@/api/ls_Web'
import OSS from 'ali-oss'
export default {
  props: [
    'baseInfo',
    'filed',
    'type'
  ],
  data() {
    return {
      actionUrl: '',
      // 阿里云上传服务端签名
      aliyunOssSign: {
        accessid: '',
        policy: '',
        signature: '',
        dir: '',
        host: '',
        expire: ''
      }
    }
  },

  methods: {
    beforeAvatarUpload() {},
    // 阿里云上传服务端签名接口
    handleGetAliyunOssSign(file) {
      Api.getAliyunOssSign().then(res => {
        // let {accessid, policy, signature, dir, host, expire } = res.data
        const { accessKeySecret, assessKeyId, bucket, path, region, stsToken } = res.data
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
        client.multipartUpload(`${path}/${name}.${suffix}`, file, {
          progress: function * (percentage) {}
        })
          .then(res => {
            const imgUrl = `https://${bucket}.${region}.aliyuncs.com/${res.name}`
            this.baseInfo[this.filed] = imgUrl
            this.$emit('update:baseInfo', this.baseInfo,)
          })
          .catch(_ => {
            this.$message({
              message: '照片上传失败！',
              type: 'error'
            })
            // 请求错误时 应该删除
            this.removeUplodFileList(file.name)
          })
      }).catch(_ => {})
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
.avatar-uploader{
  width: 128px;
  height: 86px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
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
</style>
