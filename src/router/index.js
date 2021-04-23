import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目将不会显示在边栏中（默认值为false）
 * alwaysShow: true               如果设置为真，将始终显示根菜单
 *                                如果未设置AlwaysShow，则当项具有多个子路由时,
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，则不会在breadcrumb中重定向
 * name:'router-name'             名称由<keep-alive>使用（必须设置！！！！）
 * meta : {
    roles: ['admin','editor']     控制页面角色（可以设置多个角色）
    title: 'title'                侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'              图标显示在侧边栏中
    noCache: true                 如果设置为true，则不会缓存该页（默认值为false）
    affix: true                   如果设置为真，则标签将粘贴在“标签”视图中。
    breadcrumb: false             如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'   如果设置路径，侧边栏将突出显示您设置的路径。
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

]

/**
 * 异步路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [

  /** 当路由图太长时，可以将其拆分为小模块。 **/
  ...componentsRouter,

  // 404 页面必须放在末尾！！！！
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // mode: 'history'，// 需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 详情请参见: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由器
}

export default router
