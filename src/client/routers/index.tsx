import React, { useState, useEffect, lazy } from 'react'

import { Outlet, useRoutes, useLocation, useNavigate } from "react-router-dom"

const Home = lazy(() => import('@/components/home' /* webpackPrefetch: true */))
const Category = lazy(() => import('@/components/category' /* webpackPrefetch: true */))
const Detail = lazy(() => import('@/components/category/Detail' /* webpackPrefetch: true */))
const Cart = lazy(() => import('@/components/cart' /* webpackPrefetch: true */))
const Mine = lazy(() => import('@/components/mine' /* webpackPrefetch: true */))
const OrderList = lazy(() => import('@/components/mine/order' /* webpackPrefetch: true */))
const NotFound = lazy(() => import('@/components/common/404' /* webpackPrefetch: true */))
const Signin = lazy(() => import('@/components/common/Signin' /* webpackPrefetch: true */))

const routes:any = [
  {
    path: '/',
    element: <Home />,
    // component: lazy(() => import('@/components/home' /* webpackPrefetch: true */)),
  },
  {
    path: '/category',
    element: <Category />,
  },
  {
    path: '/category/:id',
    element: <Detail />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/mine',
    element: <Mine />,
    meta: {
      auth: true,
    }
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/mine/order',
    element: <OrderList />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export const RouterBeforeEach = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    const token = localStorage.token
    const route = getRouteByPath(routes, location.pathname)
    if (route.meta?.auth && !token) {
      setAuth(true)
      navigate('/signin', { replace: true })
    } else {
      setAuth(false)
    }
  })
  // }, [location.pathname])
  return auth ? <Outlet /> : null
}

const getRouteByPath = (routes, path) => {
  for (const route of routes) {
    if (route.path === path) return route

    const arr1 = route.path.match(/([^/]+)/g)
    const arr2 = path.match(/([^/]+)/g)
    const arrParams = route.path.match(/(:[\w]+)/g)
    if (arr1?.length === arr2?.length && arrParams?.length) return route
    
    if (route.children) {
      const res = getRouteByPath(routes.children, path)
      if (res) return res
    }
  }
  return null
}

export default routes