import request from '@/utils/request'

/**
 * 创建任务-获取任务类型列表接口
 * @return {Object} response
 */
export function loadTaskModuleOptions() {
  return request({
    url: '/task/a/task-module/list/2', // 1：biw，2:siw，3:c端
    method: 'get'
  })
}

/**
 * 创建任务-获取任务数据的查询条件和列头集合接口
 * @param {Object} taskModuleId
 * @return {Object} response
 */
export function getTaskTableHeadersAndCondition(taskModuleId) {
  return request({
    url: '/task/a/task-source/headers-and-condition/' + taskModuleId,
    method: 'post'
  })
}

/**
 * 创建任务-获取任务数据分页查询接口
 * @param {Object} data
 * @return {Object} response
 */
export function getTaskTablePageData(data) {
  return request({
    url: '/task/a/task-source/page',
    method: 'post',
    data
  })
}

/**
 * 创建任务-获取工单类型列表接口
 * @param {Object} taskModuleId
 * @return {Object} response
 */
export function loadCategoryOptions(taskModuleId) {
  return request({
    url: '/task/c/work-order-category/tree/' + taskModuleId,
    method: 'get'
  })
}

/**
 * 创建任务-获取任务动态表单数据接口
 * @param {Number} data
 * @return {Object} response
 */
export function getDynamicFormData(data) {
  return request({
    url: '/task/a/record-sheet/to-create',
    method: 'post',
    data
  })
}

/**
 * 创建任务-处理-上传附件
 * @param {Object} data
 * @return {Object} response
 */
export function uploadFileBase64(data) {
  return request({
    url: '/task/c/upload/upload-base64',
    method: 'post',
    data
  })
}

/**
 * 创建任务-提交
 * @param {Object} data
 * @return {Object} response
 */
export function handleSubmit(data) {
  return request({
    url: '/task/a/record-sheet/save',
    method: 'post',
    data
  })
}
