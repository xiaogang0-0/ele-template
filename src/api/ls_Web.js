/* 公用接口地址 */

// 上传照片
import request from '@/utils/request'

// 阿里云上传服务端签名接口
export function getAliyunOssSign(data) {
  return request({
    // url: '/admin/a/user/aliyun/oss/sign',
    url: '/admin/a/user/aliyun/oss/sign-client',
    method: 'get',
    params: data
  })
}
