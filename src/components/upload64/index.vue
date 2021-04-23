<template>
  <div style="">
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
import * as ApiAddress from '@/api/public'
import * as ApiPub from '@/api/public'
export default {
  props: [
    'baseInfo',
    'filed'
  ],
  data() {
    return {
      actionUrl: ''
    }
  },
  methods: {
    beforeAvatarUpload() {},
    getBase64(file) { // 把图片转成base64编码
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    getFile(file, fileList) {
      // 上传头像
      if (file.status == 'ready') {
        return
      }
      const prama = {
        name: file.name
      }
      this.getBase64(file.raw).then(res => {
        prama.base64Data = res.split(',')[1]
        ApiPub.uploadFiles(prama).then(res => {
          const {
            code,
            url,
            msg
          } = res
          // debugger;
          if (code == 200) {
            this.baseInfo[this.filed] = url
            this.$emit('update:baseInfo', {
              ...this.baseInfo,
              logo: url
            })
          }
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
