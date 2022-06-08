import { StrictMode, Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Nprogress from './components/Nprogress'
import { MantineProvider } from '@mantine/core'
import theme from './theme'

const About = lazy(() => import('@/views/About'))
const Error = lazy(() => import('@/views/Error'))

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <Suspense fallback={<Nprogress />}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </MantineProvider>
      </Provider>
    </StrictMode>
  )
}

export default App
