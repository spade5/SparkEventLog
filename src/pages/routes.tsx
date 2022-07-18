import { Navigate, RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import Admin from './Admin'
import Demo1 from './Admin/Demo1'
// import Demo2 from './Admin/Demo1/Demo2'
import Home from './Admin/Home'
import { HomeOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons'

const Demo2 = lazy(() => import('./Admin/Demo1/Demo2'))
export interface RouteDataProps extends RouteObject {
  icon?: React.ReactNode
  children?: RouteDataProps[]
  name?: string
  hideInMenu?: boolean
}

export const AdminPathName = '/'
const microAppRoutes: any = [
  {
    name: '概览',
    path: '/security-management/admin/index'
  },
  {
    name: '我的组件',
    path: '/security-management/admin/security/component'
  },
  {
    name: '安全资源池',
    path: '/security-management/admin/security/pool'
  },
  {
    name: '资产列表',
    path: '/security-management/admin/assets/list'
  },
  {
    name: '服务编排',
    path: '/security-management/admin/assets/server'
  },
  {
    name: '资源监控',
    path: '/security-management/admin/alarm/monitored'
  },
  {
    name: '告警策略',
    path: '/security-management/admin/alarm/strategy'
  },
  {
    name: '告警事件',
    path: '/security-management/admin/alarm/event'
  },
  {
    name: '历史报表',
    path: '/security-management/admin/report/history'
  },
  {
    name: '报表模板',
    path: '/security-management/admin/report/template'
  },
  {
    name: '计费设置',
    path: '/security-management/admin/expense/charge'
  },
  {
    name: '账单',
    path: '/security-management/admin/expense/bill'
  },
  {
    name: '消费记录',
    path: '/security-management/admin/expense/record'
  },
  {
    name: '日志概览',
    path: '/security-management/admin/log/total'
  },
  {
    name: '安全威胁日志',
    path: '/security-management/admin/log/total/log'
  },
  // {
  //   name: '组件日志',
  //   path: '/security-management/admin/log/component/:id'
  // },
  {
    name: '系统对接',
    path: '/security-management/admin/system/dock'
  },
  {
    name: '可用区域管理',
    path: '/security-management/admin/system/region'
  },
  {
    name: '引流设置',
    path: '/security-management/admin/system/drainage'
  },
  {
    name: '授权管理',
    path: '/security-management/admin/system/auth'
  },
  {
    name: '日志存储转发',
    path: '/security-management/admin/system/storage'
  },
  {
    name: '系统日志',
    path: '/security-management/admin/system/log'
  },
  {
    name: '镜像管理',
    path: '/security-management/admin/system/iso'
  }
]
const routes: RouteDataProps[] = [
  {
    path: AdminPathName,
    element: <Admin />, //一级路由，不作为菜单项
    children: [
      {
        element: <Home />, //二级路由，作为菜单项
        index: true,
        name: '首页',
        icon: <HomeOutlined />
      },
      // {
      //   element: <Home />,
      //   name: 'qiankun',
      //   path: '/security-management/admin/security/component?token=123',
      //   icon: <HomeOutlined />
      // },
      ...microAppRoutes,
      {
        path: 'demo1',
        icon: <UserOutlined />,
        element: <Demo1 />,
        name: 'Demo1',
        children: [
          {
            path: '/demo1/demo1-1',
            element: <Demo2 />,
            name: 'Demo1-1',
            icon: <OrderedListOutlined />
          }
        ]
      },
      {
        path: 'demo2',
        element: <Demo1 />,
        name: 'Demo2',
        children: [
          {
            path: 'demo2-1',
            element: <Demo2 />,
            name: 'Demo2-1'
          }
        ]
      },
      {
        path: '*',
        name: '',
        element: 'Not Found...',
        hideInMenu: true
      }
    ]
  },
  {
    path: '/',
    element: <Navigate to={AdminPathName} />
  }
]

export default routes
