import { Layout, Breadcrumb, Button } from 'antd'
import React from 'react'
import { getAdminRoute } from 'pages/Admin'
import { matchRoutes, useLocation } from 'react-router-dom'
import { RouteDataProps } from 'pages/routes'
import './index.scss'
import microGlobalActions from 'utils/microGlobalActions'

const HeaderBreadcrumb: React.FC = () => {
  const route = getAdminRoute()
  if (!route) return null
  const location = useLocation()
  const matched = (matchRoutes([route], location) || []).filter((m) => (m.route as RouteDataProps).name)
  return (
    <Breadcrumb separator=">">
      {matched.map((m, i) => {
        const { route } = m
        const { path, name, icon } = route as RouteDataProps
        return (
          <Breadcrumb.Item key={path || i}>
            {icon}
            {name}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

const Header: React.FC = () => {
  return (
    <Layout.Header className="admin-header">
      <HeaderBreadcrumb />
      <Button
        type="link"
        onClick={() => {
          microGlobalActions.setGlobalState({ isLogin: false })
        }}>
        退出登录
      </Button>
    </Layout.Header>
  )
}

export default Header
