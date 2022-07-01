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
    element: <Home />
  },
  {
    path: 'dashboard',
    element: getLazyComponent('Dashboard/Layout'),
    children: [
      {
        index: true,
        meta: { title: 'Overview' },
        element: getLazyComponent('Dashboard/Overview')
      },
      {
        path: 'data',
        meta: { title: 'Data' },
        element: getLazyComponent('Dashboard/Overview'),
        children: [
          {
            path: 'map-tiles',
            meta: { title: 'Map tiles' },
            element: getLazyComponent('Dashboard/Overview')
          },
          {
            path: 'terrain',
            meta: { title: 'Terrain' },
            element: getLazyComponent('Dashboard/Overview')
          },
          {
            path: 'labels',
            meta: { title: 'Labels' },
            element: getLazyComponent('Dashboard/Overview')
          },
          {
            path: 'models',
            meta: { title: 'Models' },
            element: getLazyComponent('Dashboard/Overview')
          },
          {
            path: '3d-tiles',
            meta: { title: '3D tiles' },
            element: getLazyComponent('Dashboard/Overview'),
            children: [
              {
                path: 'buildings',
                meta: { title: 'Buildings' },
                element: getLazyComponent('Dashboard/Overview')
              },
              {
                path: 'trees',
                meta: { title: 'Trees' },
                element: getLazyComponent('Dashboard/Overview')
              },
              {
                path: 'highways',
                meta: { title: 'Highways' },
                element: getLazyComponent('Dashboard/Overview')
              }
            ]
          },
          {
            path: 'materials',
            meta: { title: 'Materials' },
            element: getLazyComponent('Dashboard/Overview')
          }
        ]
      },
      {
        path: 'test',
        meta: { title: 'Test' },
        element: getLazyComponent('Dashboard/Overview'),
        children: [
          {
            path: 'test-examples',
            meta: { title: 'Test examples' },
            element: getLazyComponent('Dashboard/Overview')
          },
          {
            path: 'tasks',
            meta: { title: 'Tasks' },
            element: getLazyComponent('Dashboard/Overview')
          }
        ]
      },
      {
        path: 'access-tokens',
        meta: { title: 'Access Tokens' },
        element: getLazyComponent('Dashboard/Overview')
      },
      {
        path: 'document',
        meta: { title: 'Document' },
        element: getLazyComponent('Dashboard/Overview')
      },
      {
        path: 'blogs',
        meta: { title: 'Blogs' },
        element: getLazyComponent('Dashboard/Overview')
      }
    ]
  },
  { path: '*', element: getLazyComponent('Error') }
]

export default routes
