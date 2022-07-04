import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Navigate back home and remove history record as long as
 * the condition is truthy
 * @param condition
 */
export default function useNavigateHome(condition: boolean) {
  const navigate = useNavigate()
  useEffect(() => {
    if (condition) {
      navigate('/', { replace: true })
      navigate(-1)
    }
  }, [navigate, condition])
}
