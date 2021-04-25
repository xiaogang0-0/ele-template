/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = [
  // 这里配置页面的路由
  // 模版
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '', // 重定向
  //   name: '',
  //   meta: { title: '', icon: 'documentation' },
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/login/index'),
  //       name: '',
  //       meta: { title: '', icon: 'list' },
  //       children: []
  //     },
  //   ]
  // },

    {
    path: '/home',
    component: Layout,
    name: 'home',
    meta: { title: '', icon: 'documentation' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: 'home页', icon: 'list' },
        children: []
      },
    ]
  },

 
  

 

]

export default componentsRouter
