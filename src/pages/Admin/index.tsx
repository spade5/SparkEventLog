import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Menu from 'components/Menu'

import './index.scss'

const { Sider, Content, Header } = Layout

const Admin = () => {
  return (
    <Layout className="admin-layout">
      <Sider theme="light" className="admin-sidebar">
        <Header className="admin-sidebar-logo">Logo</Header>
        <Content className="admin-menu-container">
          <Menu />
        </Content>
      </Sider>
      <Layout>
        <Header>header</Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Admin
