import request from '@/utils/request'
// var headers_ = { 'token': sessionStorage.getItem('hlwl_token') }
// var headers_ = { 'Authorization': 'Bearer ' + sessionStorage.getItem('hlwl_token') } 

// 物料纠错管理列表
export function getMenu() {
  return request({
    url: '/user-center/user/sys/resource/menu',
    method: 'get',
    // headers: headers_
  })
}
// 物料纠错管理列表
export function getList(data) {
  return request({
    url: '/goods-center/goods/sys/goods/correction/correctionlist',
    method: 'post',
    data,
    // headers: headers_
  })
}
// 我的提醒、我的任务
export function getList2(data) {
  return request({
    url: '/goods-center/goods/sys/goods/correction/messagetask',
    method: 'post',
    data,
    // headers: headers_
  })
}
// 查看审批单
export function lookList2(data) {
  return request({
    url: '/goods-center/goods/sys/goods/correction/viewapproval',
    method: 'post',
    data,
    // headers: headers_
  })
}
// 展示审批流程
export function showList2(data) {
  return request({
    url: '/goods-center/goods/sys/goods/correction/showapproval',
    method: 'post',
    data,
    // headers: headers_
  })
}
// 审批
export function examineList2(data) {
  return request({
    url: '/goods-center/goods/sys/goods/correction/approval',
    method: 'post',
    data,
    // headers: headers_
  })
}
// 申报纠错单
export function correctionList(data) {
  return request({
    url: '/goods-center/goods/sys/goods/correction/save',
    method: 'post',
    data,
    // headers: headers_
  })
}
// 上传文件
export function webcloud(data) {
  return request({
    url: '/goods-center/goods/sys/file/uploadBase64',
    method: 'post',
    data,
    // headers: headers_
  })
}
// 查询申请人
export function searchApplicant(data) {
  return request({
    url: '/goods-center/goods/sys/goods/correction/correctionuserall',
    method: 'post',
    data,
    // headers: headers_
  })
}
