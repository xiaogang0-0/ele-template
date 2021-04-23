import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: '超级管理员。有权查看所有页面',
    routes: routes
  }
  // {
  //   key: 'editor',
  //   name: 'editor',
  //   description: '普通编辑器。可以查看除权限页以外的所有页',
  //   routes: routes.filter(i => i.path !== '/permission')// just a mock
  // },
  // {
  //   key: 'visitor',
  //   name: 'visitor',
  //   description: '只是个访客。只能查看主页和文档页',
  //   routes: [{
  //     path: '',
  //     redirect: 'dashboard',
  //     children: [
  //       {
  //         path: 'dashboard',
  //         name: 'Dashboard',
  //         meta: { title: 'dashboard', icon: 'dashboard' }
  //       }
  //     ]
  //   }]
  // }
]

export default [
  // 模拟获取所有路由表单服务器
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // 模拟从服务器获取所有角色
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // 添加角色
  {
    url: '/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // 更新角色
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // 删除角色
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
