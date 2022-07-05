/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect } from 'react'
import { Outlet, useLocation, matchPath } from 'react-router-dom'
import { Layout } from 'antd'
import Menu from 'components/Menu'
import routes, { AdminPathName, RouteDataProps } from '../routes'
import Header from 'components/Header'
import { start, registerMicroApps } from 'qiankun'
import './index.scss'

const { Sider, Content } = Layout

export const getAdminRoute: () => RouteDataProps | undefined = () => routes.find((route: RouteDataProps) => route.path === AdminPathName)

const microApps = [
  {
    name: 'csmp',
    entry: `http://localhost:3002/`,
    container: '#qiankun-container',
    activeRule: '/admin/index',
    regionProjectDisabled: false
  }
]

const Admin = () => {
  const location = useLocation()
  useLayoutEffect(() => {
    if (microApps.length && !(window as any).qiankunStarted) {
      console.log('start qiankun')
      registerMicroApps(
        microApps.map((item) => ({
          name: item.name,
          entry: item.entry,
          container: '#qiankun-container',
          activeRule: item.activeRule
        }))
      )
      ;(window as any).qiankunStarted = true
      start({
        sandbox: {
          // experimentalStyleIsolation: true,
        },
        prefetch: 'all'
      })
    }
  }, [microApps])
  const isMicroApp = () => {
    const curPath = location.pathname
    const target = microApps.find((app) => matchPath(curPath, app.activeRule))
    return !!target
  }
  return (
    <Layout className="admin-layout">
      <Sider theme="light" className="admin-sidebar">
        <Layout.Header className="admin-sidebar-logo">Logo</Layout.Header>
        <Content className="admin-menu-container">
          <Menu />
        </Content>
      </Sider>
      <Layout>
        <Header />
        <Content className="admin-content">
          <div
            id="qiankun-container"
            style={{
              height: '100%',
              display: isMicroApp() ? 'block' : 'none'
            }}></div>
          <div
            style={{
              height: '100%',
              display: !isMicroApp() ? 'block' : 'none'
            }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Admin
