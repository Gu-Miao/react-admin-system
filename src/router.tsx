import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { Suspense, lazy, ReactNode } from 'react'
import Nprogress from './components/Nprogress'
import Home from './views/Home/Home'

/**
 * Get lazy component
 * @param path Component path, relative to `/src/${prefix}/`
 * @param prefix Component path prefix, default is `views`
 */
function getLazyComponent(factory: Required<RouteData>['lazy']): ReactNode {
  const Component = lazy(factory)

  return (
    <Suspense fallback={<Nprogress />}>
      <Component />
    </Suspense>
  )
}

export type RouteData = Omit<RouteObject, 'children'> & {
  title?: string
  children?: RouteData[]
  lazy?: Parameters<typeof lazy>[0]
}

/** Data of routes */
export const routes: RouteData[] = [
  { path: '/', element: <Home /> },
  {
    path: 'auth',
    lazy: () => import('@/views/Auth/Layout'),
    children: [
      { path: 'login', lazy: () => import('@/views/Auth/Login') },
      { path: 'forget-password', lazy: () => import('@/views/Auth/ForgetPassword') },
      { path: 'register', lazy: () => import('@/views/Auth/Register') },
    ],
  },
  {
    path: 'dashboard',
    lazy: () => import('@/views/Dashboard/Layout'),
    children: [
      { index: true, lazy: () => import('@/views/Dashboard/Overview'), title: 'Overview' },
      { path: 'users', lazy: () => import('@/views/Dashboard/Overview'), title: 'Users' },
      { path: 'roles', lazy: () => import('@/views/Dashboard/Overview'), title: 'Roles' },
      {
        path: 'organization',
        lazy: () => import('@/views/Dashboard/Overview'),
        title: 'Organization',
      },
      { path: 'modules', lazy: () => import('@/views/Dashboard/Overview'), title: 'Modules' },
      {
        path: 'data-dictionary',
        lazy: () => import('@/views/Dashboard/Overview'),
        title: 'Data Dictionary',
      },
      {
        path: 'data',
        title: 'Data',
        children: [
          { path: 'overview', lazy: () => import('@/views/Dashboard/Overview'), title: 'Overview' },
          {
            path: 'map-tiles',
            lazy: () => import('@/views/Dashboard/Overview'),
            title: 'Map Tiles',
          },
          { path: 'terrain', lazy: () => import('@/views/Dashboard/Overview'), title: 'Terrain' },
          { path: 'labels', lazy: () => import('@/views/Dashboard/Overview'), title: 'Labels' },
          { path: 'models', lazy: () => import('@/views/Dashboard/Overview'), title: 'Models' },
          {
            path: '3d-tiles',
            title: '3D Tiles',
            children: [
              {
                path: 'buildings',
                lazy: () => import('@/views/Dashboard/Overview'),
                title: 'Buildings',
              },
              { path: 'trees', lazy: () => import('@/views/Dashboard/Overview'), title: 'Trees' },
              {
                path: 'highways',
                lazy: () => import('@/views/Dashboard/Overview'),
                title: 'Highways',
              },
            ],
          },
          {
            path: 'materials',
            lazy: () => import('@/views/Dashboard/Overview'),
            title: 'Materials',
          },
        ],
      },
      { path: 'records', lazy: () => import('@/views/Dashboard/Overview'), title: 'Records' },
    ],
  },
  { path: '*', lazy: () => import('@/views/Error') },
]

/** Get routes from data */
function getRoutes(routes: RouteData[]): RouteObject[] {
  return routes.map(route => {
    const newRoute = { ...route }
    delete newRoute.title
    if (newRoute.lazy) {
      newRoute.element = getLazyComponent(newRoute.lazy)
      delete newRoute.lazy
    }
    return { ...newRoute, children: route.children && getRoutes(route.children) } as RouteObject
  })
}

export default createBrowserRouter(getRoutes(routes), { basename: import.meta.env.BASE_URL })
