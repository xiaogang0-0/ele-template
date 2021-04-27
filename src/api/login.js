import request from '@/utils/request'


// 登录
export function loginInit(data) {
  return request({
    url: '/oauth-server/auth/sys/login',
    method: 'post',
    data
  })
}

// 修改密码
export function changePassword(data) {
  return request({
    url: '/user-center/user/sys/user/password',
    method: 'put',
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


