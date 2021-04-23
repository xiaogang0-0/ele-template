import request from '@/utils/request'

/**
 * 任务详情-获取工单详情接口
 * @param {Number} workOrderTaskId
 * @return {Object} response
 */
export function getWorkOrderDetail (workOrderTaskId) {
  return request({
    url: '/task/a/work-order/detail/' + workOrderTaskId,
    method: 'get',
  })
}

/**
 * 任务详情-获取转发处理人员列表的接口
 * @param {Number} workOrderTaskId
 * @return {Object} response
 */
export function loadSkillGroupUserList (workOrderTaskId) {
  return request({
    url: '/task/c/skill-group/list-users/' + workOrderTaskId,
    method: 'get',
  })
}

/**
 * 任务详情-处理-上传附件
 * @param {Object} data
 * @return {Object} response
 */
export function uploadFileBase64 (data) {
  return request({
    url:'/task/c/upload/upload-base64',
    method: 'post',
    data
  })
}

/**
 * 任务详情-处理-提交/通过/驳回
 * @param {Object} data
 * @return {Object} response
 */
export function handleSubmit (data) {
  return request({
    url:'/task/c/work-order-task/handle',
    method: 'post',
    data
  })
}
