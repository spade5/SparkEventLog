import React from 'react'
import Menu, { MenuProps } from 'antd/es/menu'
import routes, { RouteDataProps } from 'pages/routes'
import { MenuInfo } from 'rc-menu/lib/interface'

type MenuItem = Required<MenuProps>['items'][number]

const resolvePath: (basePath: string, path: string | undefined) => string = (basePath, path) => {
  if (!path) return basePath
  if (path.startsWith('/')) {
    return path
  }
  return basePath + (basePath.endsWith('/') ? '' : '/') + path
}

const resolvePaths: (paths: string[]) => string = (paths) => {
  let path = paths[0]
  if (path.startsWith('/')) return path
  for (let i = 1; i < paths.length; i++) {
    if (path.startsWith('/')) return path
    path = resolvePath(paths[i], path)
  }
  return (path.startsWith('/') ? '' : '/') + path
}

const getMenuItems: (routes: RouteDataProps[]) => MenuItem[] = (routes) => {
  return routes.map((route: RouteDataProps) => {
    const { path, routes: children, name } = route
    const subMenu = (children && getMenuItems(children)) || null
    return {
      key: path || '',
      label: name,
      children: subMenu as MenuItem[],
      type: subMenu && subMenu.length > 0 ? 'subMenu' : 'menuItem'
    } as MenuItem
  })
}

export default class SideMenu extends React.Component {
  baseUrl = '/'
  get menuItems(): MenuItem[] {
    const root = routes.find((r) => r.menuRoot)
    if (!root) return []
    this.baseUrl = root.path || '/'
    return getMenuItems(root.routes || [])
  }
  onClick = (item: MenuInfo) => {
    console.log(item, resolvePaths([...item.keyPath, this.baseUrl]))
  }
  render() {
    return <Menu onClick={this.onClick} items={this.menuItems} />
  }
}
