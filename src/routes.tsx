import { RouteObject } from 'react-router-dom'
import { Suspense, lazy, ReactNode } from 'react'
import Nprogress from './components/Nprogress'
import AppLayout from './views/AppLayout'
import Home from './views/Home'

/**
 * Get lazy component
 * @param path Component path, relative to `/src/views/`
 */
function getLazyComponent(path: string): ReactNode {
  const Component = lazy(() => import(`./views/${path}`))

  return (
    <Suspense fallback={<Nprogress />}>
      <Component />
    </Suspense>
  )
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: 'about',
    element: getLazyComponent('About')
  },
  {
    path: '*',
    element: getLazyComponent('Error')
  }
]

export default routes
