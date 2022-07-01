import { useEffect } from 'react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({
  showSpinner: false
})

function Nprogress() {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  })
  return null
}
export default Nprogress
