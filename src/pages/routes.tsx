import { ReactElement } from 'react'
import Admin from './Admin'
import Demo1 from './Admin/Demo1'
import Demo2 from './Admin/Demo1/Demo2'
import Home from './Admin/Home'

export interface RouteDataProps {
  path?: string
  component: ReactElement
  exact?: boolean
  index?: boolean
  routes?: RouteDataProps[]
  name?: string
  hideInMenu?: boolean
  menuRoot?: boolean
}

const routes: RouteDataProps[] = [
  {
    path: '/admin',
    menuRoot: true,
    component: <Admin />, //一级路由，不作为菜单项
    routes: [
      {
        component: <Home />, //二级路由，作为菜单项
        index: true,
        name: '首页'
      },
      {
        path: 'demo1',
        component: <Demo1 />,
        name: 'Demo1',
        routes: [
          {
            path: '/admin/demo1/demo1-1',
            component: <Demo2 />,
            name: 'Demo1-1'
          }
        ]
      },
      {
        path: 'demo2',
        component: <Demo1 />,
        name: 'Demo2',
        routes: [
          {
            path: 'demo2-1',
            component: <Demo2 />,
            name: 'Demo2-1'
          }
        ]
      }
    ]
  }
]

export default routes
