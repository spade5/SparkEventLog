import { Outlet } from 'react-router-dom'
import { Routes, Route, HashRouter, IndexRouteProps } from 'react-router-dom'
import routes, { RouteDataProps } from 'pages/routes'

import './App.scss'

const mapRoutes = (routes: RouteDataProps[]) =>
  routes.map((route: RouteDataProps) => {
    const { path, component, index, routes: children } = route
    const subRoutes = (children && mapRoutes(children)) || null
    if (index) {
      const props: IndexRouteProps = {
        index,
        element: component
      }
      return <Route key="index" {...props} />
    }

    return (
      <Route path={path} key={path} element={component}>
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
