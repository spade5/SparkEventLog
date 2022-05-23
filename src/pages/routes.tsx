import { Navigate, RouteObject } from 'react-router-dom'
import Admin from './Admin'
import Demo1 from './Admin/Demo1'
import Demo2 from './Admin/Demo1/Demo2'
import Home from './Admin/Home'
import { HomeOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons'

export interface RouteDataProps extends RouteObject {
  icon?: React.ReactNode
  children?: RouteDataProps[]
  name?: string
  hideInMenu?: boolean
}

export const AdminPathName = '/admin'

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
      {
        path: 'demo1',
        icon: <UserOutlined />,
        element: <Demo1 />,
        name: 'Demo1',
        children: [
          {
            path: '/admin/demo1/demo1-1',
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
        name: '404 Not Found',
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
