/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import Menu from 'components/Menu'
import routes, { AdminPathName, RouteDataProps } from '../routes'
import Header from 'components/Header'
import { start, registerMicroApps } from 'qiankun'
import './index.scss'
import microGlobalActions from 'utils/microGlobalActions'

const { Sider, Content } = Layout

export const getAdminRoute: () => RouteDataProps | undefined = () => routes.find((route: RouteDataProps) => route.path === AdminPathName)

const microApps = [
  {
    name: 'csmp', // 和微应用package.json中的name保持一致
    entry: `http://localhost:3002/`,
    container: '#qiankun-container',
    // activeRule: '/security-management/admin/security/component',
    activeRule: (location: any) => location.pathname?.startsWith('/security-management'), // 主框架的路由前缀'/app' + 微应用的页面访问路由
    regionProjectDisabled: false
  }
]

const Admin = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const globalStateRef = useRef<any>({})
  useEffect(() => {
    // microGlobalActions.onGlobalStateChange((state: any, prev: any) => {
    //   console.log('主应用当前state', state)
    //   console.log('主应用上一次state', prev)
    // })

    const state: any = { isLogin: true }
    // if (!isEqual(state, globalStateRef.current)) {
    globalStateRef.current = state
    microGlobalActions.setGlobalState(state)
    // }

    return () => {
      microGlobalActions.offGlobalStateChange()
    }
  }, [])
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
          experimentalStyleIsolation: true
        },
        prefetch: 'all'
      })
    }
  }, [microApps])
  const isMicroApp = () => {
    const curPath = location.pathname
    // const target = microApps.find((app) => matchPath(curPath, app.activeRule))
    const target = microApps.find((app) => app.activeRule(location))
    return !!target
  }
  return (
    <Layout className="admin-layout">
      <Sider
        theme="light"
        className="admin-sidebar"
        onCollapse={(value) => setCollapsed(value)}
        width={220}
        collapsible
        collapsed={collapsed}>
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
