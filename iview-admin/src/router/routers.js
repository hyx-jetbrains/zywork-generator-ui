import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'zywok-generator - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
      path: '/generator',
      name: '代码生成',
      meta: {
        icon: 'ios-car',
        title: '代码生成'
      },
      component: Main,
      children: [
          {
            path: 'jdbc-config',
            name: 'JDBC配置',
            meta: {
              title: 'JDBC配置',
              icon: 'ios-car'
            },
            component: () => import('@/view/generator/jdbc/jdbc.vue')
          },
          {
            path: 'generator-config',
            name: 'Generator配置',
            meta: {
              title: 'Generator配置',
              icon: 'ios-car'
            },
            component: () => import('@/view/generator/generator/generator.vue')
          },
          {
            path: 'single-table',
            name: '单表代码生成',
            meta: {
              title: '单表代码生成',
              icon: 'ios-car'
            },
            component: () => import('@/view/generator/single-table/single-table.vue')
          },
          {
            path: 'join-table',
            name: '关联表代码生成',
            meta: {
              title: '关联表代码生成',
              icon: 'ios-car'
            },
            component: () => import('@/view/generator/join-table/join-table.vue')
          }
      ]
    },
    {
      path: '/user',
      name: '页面演示',
      meta: {
        icon: 'ios-car',
        title: '页面演示'
      },
      component: Main,
      children: [
        {
          path: 'user-page',
          name: '用户管理',
          meta: {
            title: '用户管理',
            icon: 'ios-car'
          },
          component: () => import('@/view/demo/user/user.vue')
        }
      ]
    },
    {
      path: '/user1',
      name: '页面演示1',
      meta: {
        hideInMenu: true
      },
      component: Main,
      children: [
        {
          path: 'user-page1/:id',
          name: '用户管理1',
          meta: {
            title: '用户管理1',
            notCache: true
          },
          component: () => import('@/view/demo/user/user1.vue')
        }
      ]
    },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
