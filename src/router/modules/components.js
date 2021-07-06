/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

// 默认无权限也可查看的路由
const componentsRouter = [
  // +++++++++++++++++++++++ 企业用户端 写在home_1目录下  ++++++++++++++++++++++++//

  // 管理台账
  {
    path: '/accountManagement',
    component: Layout,
    redirect: '/accountManagement/info', // 重定向
    name: 'accountManagement',
    meta: { title: '管理台账', icon: 'peoples' },
    // hidden: true,
    children: [
      {
        path: 'info',
        component: () => import('@/views/home_1/accountManagement/info'),
        name: 'info',
        meta: { title: '基本信息', noCache: true, icon: 'list', activeMenu: '/orderManage/qualityCheckManage' }
        // hidden: true
        // children: []
      }
      // {
      //   path: 'YXKJ_account',
      //   component: () => import('@/views/home_1/accountManagement/YXKJ_account'),
      //   name: 'YXKJ_account',
      //   meta: { title: '单位有限空间台账', noCache: true, icon: 'list', activeMenu: '/orderManage/YXKJ_account' },
      //   // hidden: true
      //   // children: []
      // },

    ]
  }

  // ++++++++++++++++++++++++   平台端 写在home_2目录下 +++++++++++++++++++++++++++++//

]

export default componentsRouter
