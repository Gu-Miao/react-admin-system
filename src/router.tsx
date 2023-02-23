import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { Suspense, lazy, ReactNode } from 'react'
import Nprogress from './components/Nprogress'
import Home from './views/Home/Home'

/**
 * Get lazy component
 * @param path Component path, relative to `/src/${prefix}/`
 * @param prefix Component path prefix, default is `views`
 */
function getLazyComponent(path: string, prefix = 'views'): ReactNode {
  const Component = lazy(() => import(`./${prefix}/${path}`))

  return (
    <Suspense fallback={<Nprogress />}>
      <Component />
    </Suspense>
  )
}

export type RouteData = Omit<RouteObject, 'children'> & {
  title?: string
  children?: RouteData[]
}

/** Data of routes */
export const routes: RouteData[] = [
  { path: '/', element: <Home /> },
  {
    path: 'auth',
    element: getLazyComponent('Auth/Layout'),
    children: [
      { path: 'login', element: getLazyComponent('Auth/Login') },
      { path: 'forget-password', element: getLazyComponent('Auth/ForgetPassword') },
    ],
  },
  {
    path: 'dashboard',
    element: getLazyComponent('Dashboard/Layout'),
    children: [
      { index: true, element: getLazyComponent('Dashboard/Overview'), title: 'Overview' },
      { path: 'users', element: getLazyComponent('Dashboard/Overview'), title: 'Users' },
      { path: 'roles', element: getLazyComponent('Dashboard/Overview'), title: 'Roles' },
      {
        path: 'organization',
        element: getLazyComponent('Dashboard/Overview'),
        title: 'Organization',
      },
      { path: 'modules', element: getLazyComponent('Dashboard/Overview'), title: 'Modules' },
      {
        path: 'data-dictionary',
        element: getLazyComponent('Dashboard/Overview'),
        title: 'Data Dictionary',
      },
      {
        path: 'data',
        title: 'Data',
        children: [
          { path: 'overview', element: getLazyComponent('Dashboard/Overview'), title: 'Overview' },
          {
            path: 'map-tiles',
            element: getLazyComponent('Dashboard/Overview'),
            title: 'Map Tiles',
          },
          { path: 'terrain', element: getLazyComponent('Dashboard/Overview'), title: 'Terrain' },
          { path: 'labels', element: getLazyComponent('Dashboard/Overview'), title: 'Labels' },
          { path: 'models', element: getLazyComponent('Dashboard/Overview'), title: 'Models' },
          {
            path: '3d-tiles',
            title: '3D Tiles',
            children: [
              {
                path: 'buildings',
                element: getLazyComponent('Dashboard/Overview'),
                title: 'Buildings',
              },
              { path: 'trees', element: getLazyComponent('Dashboard/Overview'), title: 'Trees' },
              {
                path: 'highways',
                element: getLazyComponent('Dashboard/Overview'),
                title: 'Highways',
              },
            ],
          },
          {
            path: 'materials',
            element: getLazyComponent('Dashboard/Overview'),
            title: 'Materials',
          },
        ],
      },
      { path: 'records', element: getLazyComponent('Dashboard/Overview'), title: 'Records' },
    ],
  },
  { path: '*', element: getLazyComponent('Error') },
]

/** Get routes from data */
function getRoutes(routes: RouteData[]): RouteObject[] {
  return routes.map(route => {
    const newRoute = { ...route }
    delete newRoute.title
    return { ...newRoute, children: route.children && getRoutes(route.children) } as RouteObject
  })
}

export default createBrowserRouter(getRoutes(routes), { basename: process.env.PUBLIC_URL })
