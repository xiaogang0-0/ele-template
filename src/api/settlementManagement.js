// 结算管理
import request from '@/utils/request'




// 开票品名分页列表
export function getBillTitlePage(data) {
  return request({
    url: '/order-center/order/a/bill-title/page',
    method: 'post',
    data
  })
}

// 获取计量单位
export function getDictionaryUnit() {
  return request({
    url: '/goods-center/goods/sys/goods/dictionary/list/1020',
    method: 'get'
    // ,params: data
  })
}

// 获取会计科目
export function getSubjectData() {
  return request({
    url: '/goods-center/goods/sys/goods/dictionary/list/1106',
    method: 'get'
    // ,params: data
  })
}
// 开票品名--添加
export function subAddBillTitle(data) {
  return request({
    url: '/order-center/order/a/bill-title/saveBillTitle',
    method: 'post',
    data
  })
}

// 开票品名--编辑
export function subEditBillTitle(data) {
  return request({
    url: '/order-center/order/a/bill-title/updateBillTitle',
    method: 'post',
    data
  })
}

// 开票品名--停用/启用
export function editUpdateStatus(data) {
  return request({
    url: '/order-center/order/a/bill-title/updateStatus',
    method: 'post',
    data
  })
}


//   ———————————— 结算管理 ————————————————
// 列表-结算管理
export function getBillReportPage(data) {
  return request({
    url: '/order-center/order/a/bill-report/page',
    method: 'post',
    data
  })
}

// 列表-下拉框-结算单状态
export function getBillReportListStatus() {
  return request({
    url: '/order-center/order/a/bill-report/list-bill-status',
    method: 'get'
    // ,params: data
  })
}

// 列表-下拉框-采购商名称
export function getPageBillCustomerByMap(data) {
  return request({
    url: '/order-center/order/a/bill-report/page-bill-customer-by-map',
    method: 'post',
    data
  })
}

// 列表-下拉框-结算公司
export function getSettlementNameList() {
  return request({
    url: '/order-center/order/a/bill-report/list-bill-settlement',
    method: 'get',
    // ,params: data
  })
}

// 列表-下拉框-开票品名
export function getPageBillTitle(data) {
  return request({
    url: '/order-center/order/a/bill-report/page-bill-title',
    method: 'post',
    data
  })
}

// 编辑页-下拉框-采购商列表
export function getPageCustomerCodeAndName(data) {
  return request({
    url: '/biw-rfq/rfq/vendor/page-customer-code-and-name',
    method: 'post',
    data
  })
}

// 编辑页-下拉框-供应商列表
export function getPageVendorCustomerByMap(data) {
  return request({
    url: '/order-center/order/a/bill-report/page-vendor-for-customer-by-map',
    method: 'post',
    data
  })
}

// 编辑页-查询-获取结算单和结算明细
export function getByMap(data) {
  return request({
    url: '/order-center/order/a/bill-report/get-by-map',
    method: 'post',
    data
  })
}

// 编辑页-保存和提交接口
export function subEditCommitBill(data) {
  return request({
    url: '/order-center/order/a/bill-report/save-or-commit-bill',
    method: 'post',
    data
  })
}


// 详情页-根据凭证号获取详情
export function getByBillDetail(data) {
  return request({
    url: `/order-center/order/a/bill-report/get-by-bill-num/${data.billNum}`,
    method: 'get'
    // ,params: data
  })
}

// 详情页-保存和提交接口
export function sunCommitBill(data) {
  return request({
    url: '/order-center/order/a/bill-report/update-or-commit-bill',
    method: 'post',
    data
  })
}

// 详情页-作废接口
export function setCancelBillNum(data) {
  return request({
    url: `/order-center/order/a/bill-report/cancel-bill-by-bill-num/${data.billNum}`,
    method: 'post',
    data
  })
}

// 列表-导出excel
export function getExportExcel(data) {
  return request({
    url: `/order-center/order/a/bill-export/siw/export-excel`,
    method: 'post',
    data
  })
}

// 结算单详情 ->打印出库单
export function getBillStorage(data) {
  return request({
    url: `/order-center/order/bills/get-bill-outbound`,
    method: 'post',
    data
  })
}

/* 退货结算单 START************************************************************************/

// 详情
export function loadDetailByBillNum(data) {
  return request({
    url: '/order-center/order/a/bill-report/get-by-bill-num/' + data,
    method: 'get'
  })
}

// 保存
export function apiSave(data) {
  return request({
    url: '/order-center/order/a/bill-report/save-refund-settlement',
    method: 'post',
    data
  })
}

// 提交
export function apiSubmit(data) {
  return request({
    url: '/order-center/order/a/bill-report/commit-refund-settlement',
    method: 'post',
    data
  })
}

// 作废
export function apiCancel(data) {
  return request({
    url: '/order-center/order/a/bill-report/cancel-refund-settlement/' + data,
    method: 'post'
  })
}

/* 退货结算单 END************************************************************************/

