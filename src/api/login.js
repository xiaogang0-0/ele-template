
import request from '@/utils/request'
// 根据手机号获取企业列表
export function getListByMobile(data) {
  return request({
    url: '/admin/a/user/customer/list-by-mobile/' + data,
    method: 'get'
  })
}

// 登录
export function loginInit(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 修改密码
export function changePassword(data) {
  return request({
    url: '/admin/a/user/sys-user/update-my-password',
    method: 'post',
    data
  })
}

// 退出登陆
export function landingExit(data) {
  return request({
    url: '/oauth-server/auth/sys/logout',
    method: 'post',
    data
  })
}

// 注册
export function registerSub(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data
  })
}

// 发送短信验证码 /admin/send-verify-code/{sendType}/{mobile}
export function getSendVerifyCode(data) {
  return request({
    url: '/admin/send-verify-code/' + data.sendType + '/' + data.mobile,
    method: 'get'
    // params: data1
  })
}

// 修改密码时发送短信验证码 /admin/a/user/sys-user/pre-update-my-password/{mobile}
export function getPasswordSendVerifyCode(data) {
  console.log(data.mobile)
  return request({
    url: '/admin/a/user/sys-user/pre-update-my-password/' + data.mobile,
    method: 'post'
  })
}

// 修改手机号时发送短信验证码 /admin/a/user/sys-user/pre-update-new-mobile/{mobile}
export function getPhoneSendVerifyCode(data) {
  console.log(data.mobile)
  return request({
    url: '/admin/a/user/sys-user/pre-update-new-mobile/' + data.mobile,
    method: 'post'
  })
}

// 验证手机验证码 /admin/verify-code/{mobile}/{verifyCode}
export function getVerifyCode(data) {
  return request({
    url: '/admin/verify-code/' + data.mobile + '/' + data.verifyCode,
    method: 'post'
  })
}

// 修改密码时发送验证手机验证码 /admin/a/user/sys-user/verify-update-my-password/{mobile}/{verifyCode}
export function getPasswordVerifyCode(data) {
  return request({
    url: '/admin/a/user/sys-user/verify-update-my-password/' + data.mobile + '/' + data.verifyCode,
    method: 'post'
  })
}

// 修改手机号时发送验证手机验证码 /admin/a/user/sys-user/verify-update-my-mobile/{mobile}/{verifyCode}
export function getPhoneVerifyCode(data) {
  return request({
    url: '/admin/a/user/sys-user/verify-update-my-mobile/' + data.mobile + '/' + data.verifyCode,
    method: 'post'
  })
}

// 修改手机号完成 /admin/a/user/sys-user/update-my-mobile
export function submitPhone(data) {
  return request({
    url: '/admin/a/user/sys-user/update-my-mobile',
    method: 'post',
    data
  })
}

// 获取菜单
export function getMenu(data) {
  return request({
    url: '/admin/a/user/customer/list-by-mobile/' + data,
    method: 'get'
    // headers: headers_
  })
}

// 根据页面模块code获取图片列表 /admin/a/gzh/module/list-img-by-code/{moduleCode}
export function getBgImgUrlArr(data) {
  return request({
    url: '/admin/a/gzh/module/list-img-by-code/' + data,
    method: 'get'
    // headers: headers_
  })
}
