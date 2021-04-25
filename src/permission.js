import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取令牌
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进程配置

// 没有重定向白名单
const whiteList = ['/login', '/dashboard', '/auth-redirect', '/404']

router.beforeEach(async (to, from, next) => {
  // console.log(to)
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()
  if (to.path === '/login' && hasToken) {
    // 如果已登录，请重定向到主页
    next({
      path: from.path,
      query: from.query
    })
    NProgress.done()
  } else {
    // 确定用户是否通过getinfo获取了权限角色
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    if (hasRoles) {
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面。
      try {
        // 获取用户信息
        // 注意：角色必须是对象数组！例如：【管理员】或，【开发人员】、【编辑人员】
        // const { roles } = await store.dispatch('user/getInfo')
        const roles = ['admin']
        store.commit('user/SET_ROLES', roles)
        // 基于角色生成可访问的路由映射
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

        store.commit('permission/SET_ROUTES', accessRoutes)
        router.addRoutes(accessRoutes)

        // 确保addroutes完整的hack方法
        // 设置replace:true，这样导航就不会留下历史记录。
        next({ ...to, replace: true })
      } catch (error) {
        // 删除令牌并转到登录页重新登录
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
