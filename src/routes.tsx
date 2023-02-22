import { RouteObject } from 'react-router-dom'
import { Suspense, lazy, ReactNode } from 'react'
import Nprogress from './components/Nprogress'
import Home from './views/Home'

/**
 * Get lazy component
 * @param path Component path, relative to `/src/${prefix}/`
 * @param prefix Component path prefix, default is `views`
 */
export function getLazyComponent(path: string, prefix = 'views'): ReactNode {
  const Component = lazy(() => import(`./${prefix}/${path}`))

  return (
    <Suspense fallback={<Nprogress />}>
      <Component />
    </Suspense>
  )
}

export interface RouteWithMeta extends RouteObject {
  meta?: {
    title?: string
    [key: string]: any
  }
  children?: RouteWithMeta[]
}

const routes: RouteWithMeta[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'auth',
    element: getLazyComponent('Auth/Layout'),
    children: [
      {
        path: 'login',
        element: getLazyComponent('Auth/Login'),
      },
      {
        path: 'forget-password',
        element: getLazyComponent('Auth/ForgetPassword'),
      },
    ],
  },
  {
    path: 'dashboard',
    element: getLazyComponent('Dashboard/Layout'),
    children: [
      {
        index: true,
        meta: { title: 'Overview' },
        element: getLazyComponent('Dashboard/Overview'),
      },
      {
        path: 'users',
        meta: { title: 'Users' },
        element: getLazyComponent('Dashboard/Overview'),
      },
      {
        path: 'roles',
        meta: { title: 'Roles' },
        element: getLazyComponent('Dashboard/Overview'),
      },
      {
        path: 'organization',
        meta: { title: 'Organization' },
        element: getLazyComponent('Dashboard/Overview'),
      },
      {
        path: 'modules',
        meta: { title: 'Modules' },
        element: getLazyComponent('Dashboard/Overview'),
      },
      {
        path: 'data-dictionary',
        meta: { title: 'Data Dictionary' },
        element: getLazyComponent('Dashboard/Overview'),
      },
      {
        path: 'data',
        meta: { title: 'Data' },
        children: [
          {
            path: 'overview',
            meta: { title: 'Overview' },
            element: getLazyComponent('Dashboard/Overview'),
          },
          {
            path: 'map-tiles',
            meta: { title: 'Map Tiles' },
            element: getLazyComponent('Dashboard/Overview'),
          },
          {
            path: 'terrain',
            meta: { title: 'Terrain' },
            element: getLazyComponent('Dashboard/Overview'),
          },
          {
            path: 'labels',
            meta: { title: 'Labels' },
            element: getLazyComponent('Dashboard/Overview'),
          },
          {
            path: 'models',
            meta: { title: 'Models' },
            element: getLazyComponent('Dashboard/Overview'),
          },
          {
            path: '3d-tiles',
            meta: { title: '3D Tiles' },
            children: [
              {
                path: 'buildings',
                meta: { title: 'Buildings' },
                element: getLazyComponent('Dashboard/Overview'),
              },
              {
                path: 'trees',
                meta: { title: 'Trees' },
                element: getLazyComponent('Dashboard/Overview'),
              },
              {
                path: 'highways',
                meta: { title: 'Highways' },
                element: getLazyComponent('Dashboard/Overview'),
              },
            ],
          },
          {
            path: 'materials',
            meta: { title: 'Materials' },
            element: getLazyComponent('Dashboard/Overview'),
          },
        ],
      },
      {
        path: 'records',
        meta: { title: 'Records' },
        element: getLazyComponent('Dashboard/Overview'),
      },
    ],
  },
  { path: '*', element: getLazyComponent('Error') },
]

export default routes
