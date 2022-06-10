import { RouteObject } from 'react-router-dom'
import { Suspense, lazy, ReactNode } from 'react'
import Nprogress from './components/Nprogress'
import Layout from './components/Layout/Layout'
import Home from './views/Home'

/**
 * Get lazy component
 * @param path Component path, relative to `/src/views/`
 */
export function getLazyComponent(path: string): ReactNode {
  const Component = lazy(() => import(`./views/${path}`))

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
    element: <Layout />,
    children: [
      {
        index: true,
        meta: { title: 'Overview' },
        element: <Home />
      },
      {
        path: 'data',
        meta: { title: 'Data' },
        element: <Home />,
        children: [
          { path: 'terrain', meta: { title: 'Terrain' }, element: <Home /> },
          { path: '3d-tiles', meta: { title: '3D Tiles' }, element: <Home /> },
          { path: 'models', meta: { title: 'Models' }, element: <Home /> },
          {
            path: 'materials',
            meta: { title: 'Materials' },
            element: <Home />,
            children: [
              { path: 'ad2', meta: { title: 'Point' }, element: <Home /> },
              { path: 'ad3', meta: { title: 'Polyline' }, element: <Home /> },
              { path: 'ad332', meta: { title: 'Polygon' }, element: <Home /> },
              { path: 'ad52', meta: { title: 'Geometry' }, element: <Home /> }
            ]
          }
        ]
      },
      {
        path: 'test-examples',
        meta: { title: 'Test examples' },
        element: <Home />
      },
      {
        path: 'tasks',
        meta: { title: 'Tasks' },
        element: <Home />,
        children: [{ path: 'management', meta: { title: 'Task Management' }, element: <Home /> }]
      },
      { path: 'preview', meta: { title: 'Preview' }, element: <Home /> }
    ]
  },
  { path: 'about', element: getLazyComponent('About') },
  { path: '*', element: getLazyComponent('Error') }
]

export default routes
