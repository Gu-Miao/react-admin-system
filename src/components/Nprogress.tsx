import { useEffect } from 'react'
import {
  setNavigationProgress,
  startNavigationProgress,
  completeNavigationProgress,
} from '@mantine/nprogress'

function Nprogress() {
  useEffect(() => {
    setNavigationProgress(0)
    startNavigationProgress()
    return completeNavigationProgress
  })
  return null
}

export default Nprogress
