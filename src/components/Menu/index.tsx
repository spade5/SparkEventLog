import React from 'react'
import Menu, { MenuProps } from 'antd/es/menu'
import { RouteDataProps } from 'pages/routes'
import { MenuInfo, SubMenuType } from 'rc-menu/lib/interface'
import { Location, useLocation, useNavigate, matchRoutes } from 'react-router-dom'
import { resolvePaths } from './helper'
import { getAdminRoute } from 'pages/Admin'

interface SideMenuProps {
  navigate: (url: string) => void
  location: Location
}

type TitleClickFnType = Required<SubMenuType>['onTitleClick']
type MenuItem = Required<MenuProps>['items'][number]

class SideMenu extends React.Component<SideMenuProps> {
  items: MenuItem[] = []
  baseUrl = '/'
  state: {
    openKeys: string[]
    selectedKeys: string[]
  } = {
    openKeys: [],
    selectedKeys: []
  }

  constructor(props: SideMenuProps) {
    super(props)
    this.init()
  }

  componentDidMount() {
    const matched = matchRoutes(this.routes, this.props.location)
    const keys = (matched || []).map((m) => m.route.path || '')
    this.setState({
      openKeys: keys,
      selectedKeys: keys
    })
  }

  routes: RouteDataProps[] = []
  init() {
    const root = getAdminRoute()
    if (!root) return
    this.routes = [root]
    this.items = this.getMenuItems(root.children || [])
    this.baseUrl = root.path || '/'
  }

  getMenuItems: (routes: RouteDataProps[]) => MenuItem[] = (routes) => {
    return routes.map((route: RouteDataProps) => {
      const { path, children, name, icon } = route
      const subMenu = (children && this.getMenuItems(children)) || null
      const item = {
        key: path || '',
        label: name,
        icon,
        children: subMenu as MenuItem[],
        type: subMenu && subMenu.length > 0 ? 'subMenu' : 'menuItem'
      } as MenuItem
      if (subMenu) {
        ;(item as SubMenuType).onTitleClick = this.onSubMenuClick
      }
      return item
    })
  }

  onClick = (item: MenuInfo) => {
    const { navigate } = this.props
    navigate(resolvePaths([...item.keyPath, this.baseUrl]))

    //如果切换菜单，则需要更新展开的子菜单
    const _openKeys: string[] = []
    const { openKeys } = this.state
    ;(openKeys || []).forEach((key) => {
      if (item.keyPath.includes(key)) {
        _openKeys.push(key)
      }
    })

    this.setState({
      selectedKeys: item.keyPath,
      openKeys: _openKeys
    })
  }
  onSubMenuClick: TitleClickFnType = (info) => {
    this.setState({
      openKeys: [info.key]
    })
  }
  render() {
    const { openKeys, selectedKeys } = this.state
    return <Menu openKeys={openKeys} selectedKeys={selectedKeys} mode="inline" onClick={this.onClick} items={this.items} />
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withNavigate = (Component: React.ComponentType<any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const render = (props: any) => {
    const navigate = useNavigate()
    const location = useLocation()
    return <Component {...props} navigate={navigate} location={location} />
  }
  return render
}

export default withNavigate(SideMenu)
