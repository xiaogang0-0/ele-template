import request from '@/utils/request'

/**
 * 任务管理-获取工单类型列表接口
 * @return {Object} response
 */
export function loadCategoryOptions () {
  return request({
    url: '/task/c/work-order-category/tree/0',
    method: 'get',
  })
}

/**
 * 任务管理-获取任务分页列表接口
 * @param {Object} data
 * @return {Object} response
 */
export function getTaskTableData (data) {
  return request({
    url: '/task/a/work-order/my-task',
    method: 'post',
    data
  })
}

/**
 * 任务管理-领取任务接口
 * @param {Number} workOrderTaskId
 * @return {Object} response
 */
export function receiveTask (workOrderTaskId) {
  return request({
    url: '/task/a/work-order-task/accept/' + workOrderTaskId,
    method: 'post'
  })
}
