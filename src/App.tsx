import { Outlet } from 'react-router-dom'
import { Routes, Route, HashRouter } from 'react-router-dom'
import routes, { RouteDataProps } from 'pages/routes'

import './App.scss'

const mapRoutes = (routes: RouteDataProps[]) =>
  routes.map((route: RouteDataProps) => {
    const { path, component, index, routes: children } = route
    const props: any = {
      element: component
    }
    if (index) {
      props.index = true
    } else {
      props.path = path
    }
    const subRoutes = (children && mapRoutes(children)) || null
    return (
      <Route key={path || 'index'} {...props}>
        {subRoutes}
      </Route>
    )
  })

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>{mapRoutes(routes)}</Routes>
      </HashRouter>
      <Outlet />
    </div>
  )
}

export default App
