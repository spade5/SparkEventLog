import { Layout, Breadcrumb } from 'antd'
import React from 'react'
import { getAdminRoute } from 'pages/Admin'
import { matchRoutes, useLocation } from 'react-router-dom'
import { RouteDataProps } from 'pages/routes'

import './index.scss'

const HeaderBreadcrumb: React.FC = () => {
  const route = getAdminRoute()
  if (!route) return null
  const location = useLocation()
  const matched = (matchRoutes([route], location) || []).filter((m) => (m.route as RouteDataProps).name)
  return (
    <Breadcrumb separator=">">
      {matched.map((m) => {
        const { route } = m
        const { path, name, icon } = route as RouteDataProps
        return (
          <Breadcrumb.Item key={path}>
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
    </Layout.Header>
  )
}

export default Header
