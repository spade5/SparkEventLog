import { Outlet } from 'react-router-dom'
import { Routes, Route, IndexRouteProps, useLocation } from 'react-router-dom'
import routes, { RouteDataProps } from 'pages/routes'
import { Suspense, useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './App.scss'
import { deleteCookie, setCookie } from 'utils/cookie'

NProgress.configure({
  showSpinner: false
})

const mapRoutes = (routes: RouteDataProps[]) =>
  routes.map((route: RouteDataProps, i: number) => {
    const { path, element, index, children } = route
    const subRoutes = (children && mapRoutes(children)) || null
    if (index) {
      const props: IndexRouteProps = {
        index,
        element
      }
      return <Route key={path || i} {...props} />
    }

    return (
      <Route path={path} key={path} element={element}>
        {subRoutes}
      </Route>
    )
  })

const LazyLoad = () => {
  useEffect(() => {
    console.log('loading begin')
    NProgress.start()
    return () => {
      console.log('loading complete')
      NProgress.done()
    }
  }, [])

  return <></>
}

function App() {
  const location = useLocation()
  useEffect(() => {
    setCookie('authToken', '1234')
    const timer = setInterval(() => {
      deleteCookie('authToken')
      setCookie('authToken', (Math.random() * 1000).toFixed(0) + '')
    }, 15000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="App">
      <Suspense fallback={<LazyLoad />}>
        <Routes location={location}>{mapRoutes(routes)}</Routes>
      </Suspense>
      <Outlet />
    </div>
  )
}

export default App
