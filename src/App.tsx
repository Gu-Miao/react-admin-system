import { StrictMode, Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import store from '@/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/views/Home'
import { ThemeProvider } from '@mui/material'
import Nprogress from '@/components/Nprogress'
import theme from './theme'

const About = lazy(() => import('@/views/About'))
const Error = lazy(() => import('@/views/Error'))

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Nprogress />}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  )
}

export default App
