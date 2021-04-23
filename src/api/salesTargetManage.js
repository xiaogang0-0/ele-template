// 销售目标管理

import request from '@/utils/request'

// 目标类型下拉框获取
export function getType1100(data) {
  return request({
    url: '/goods-center/goods/sys/goods/dictionary/list/1100',
    method: 'get'
    // ,params: data
  })
}

// 部门组织机构暂定为
export function getParent1200(data) {
  return request({
    url: '/user-center/user/sys/org/list-by-parent-id/' + data,
    method: 'get'
    // ,params: data
  })
}

// 销售目标设置-列表  /
export function getSettingPage(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/setting/page',
    method: 'get',
    params: data
  })
}

// 销售目标设置-保存
export function setAddTarget(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/setting/save',
    method: 'post',
    data
  })
}

// 销售目标设置-删除 /hlwl-crm/crm/a/sales-target/setting/delete/{salesTargetSettingId}
export function removeitem(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/setting/delete/' + data,
    method: 'post',
    // data
  })
}

// 销售目标设置-获取单个详情  /hlwl-crm/crm/a/sales-target/setting/get-by-id/{salesTargetSettingId}
export function getTargetPersonalInfo(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/setting/get-by-id/' + data,
    method: 'get'
  })
}

// 销售目标拆分  /hlwl-crm/crm/a/sales-target/list-sales-target-personal/{salesTargetSettingId}
export function getTargetPersonalList(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/list-sales-target-personal/' + data,
    method: 'get'
  })
}





// 销售目标拆分-是否有按钮操作权限
export function getIsAuthority() {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/get-sales-target-authority',
    method: 'get'
  })
}

// 销售目标-个人目标excel导入  /hlwl-crm/crm/a/sales-target/import-sales-target-personal-excel
export function upSalesTargetPersonalExcel(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/import-sales-target-personal-excel',
    method: 'post',
    data
  })
}

// 销售目标-企业目标excel导入  /hlwl-crm/crm/a/sales-target/import-sales-target-enterprise-excel
export function upSalesTargetEnterpriseExcel(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/import-sales-target-enterprise-excel',
    method: 'post',
    data
  })
}

// 个人目标设置-列表 /hlwl-crm/crm/a/sales-target/personal-sales-target/{salesTargetPersonalId}
export function getPersonalListTargetOne(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target/personal-sales-target/' + data,
    method: 'get'
  })
}

// 商品导入购物车excel上传  /biw-rfq/rfq/sys/file/file-upload
export function uploadFiles(data) {
  return request({
    url: '/biw-rfq/rfq/sys/file/file-upload',
    method: 'post',
    data
  })
}

// 查询七牛云配置 /biw-rfq/rfq/system/settings/map/qiniuyun_config
// export function getQiniuyunConfig() {
//   return request({
//     url: '/biw-rfq/rfq/system/settings/map/qiniuyun_config',
//     method: 'get'
//   })
// }

// 专基目标进度-销售目标下拉框 /hlwl-crm/crm/a/sales-target-search/list-sales-target-setting-name
export function getTargetSettingName(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target-search/list-sales-target-setting-name',
    method: 'get',
    params: data
  })
}

// 获取销售经理  /user-center/user/sys/user/list-by-sys-organization-id/{sysOrganizationId}
export function getOrganizationId(data) {
  return request({
    url: '/user-center/user/sys/user/list-by-sys-organization-id/' + data,
    method: 'get'
  })
}

// 专项目标进度-分页报表  /hlwl-crm/crm/a/sales-target-search/page-special
export function getSalesTargetSearch(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target-search/page-special',
    method: 'post',
    data
  })
}

// 专项目标进度-总计  /hlwl-crm/crm/a/sales-target-search/sum-special
export function getSalesTargetSumSpecial(data) {
  return request({
    url: '/hlwl-crm/crm/a/sales-target-search/sum-special',
    method: 'post',
    data
  })
}

// 区域下拉框获取
export function getProvinceArea() {
  return request({
    url: '/goods-center/goods/sys/goods/dictionary/list/1033',
    method: 'get'
    // ,params: data
  })
}


// // 开票品名分页列表
// export function getBillTitlePage(data) {
//   return request({
//     url: '/order-center/order/a/bill-title/page',
//     method: 'post',
//     data
//   })
// }

// // 获取计量单位
// export function getDictionaryUnit() {
//   return request({
//     url: '/goods-center/goods/sys/goods/dictionary/list/1020',
//     method: 'get'
//     // ,params: data
//   })
// }

// // 获取会计科目
// export function getSubjectData() {
//   return request({
//     url: '/goods-center/goods/sys/goods/dictionary/list/1106',
//     method: 'get'
//     // ,params: data
//   })
// }
// // 开票品名--添加
// export function subAddBillTitle(data) {
//   return request({
//     url: '/order-center/order/a/bill-title/saveBillTitle',
//     method: 'post',
//     data
//   })
// }

// // 开票品名--编辑
// export function subEditBillTitle(data) {
//   return request({
//     url: '/order-center/order/a/bill-title/updateBillTitle',
//     method: 'post',
//     data
//   })
// }

// // 开票品名--停用/启用  
// export function editUpdateStatus(data) {
//   return request({
//     url: '/order-center/order/a/bill-title/updateStatus',
//     method: 'post',
//     data
//   })
// }


