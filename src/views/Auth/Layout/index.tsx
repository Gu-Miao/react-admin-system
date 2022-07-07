import { Outlet, Navigate } from 'react-router-dom'
import { ReactComponent as Wave } from '@/assets/images/wave-gently.svg'
import { useSelector } from 'react-redux'
import useStyles from './index.syltes'
import { selectUser } from '@/store/user'

const Layout = () => {
  const user = useSelector(selectUser)
  const { classes } = useStyles()

  if (user.initializing) {
    return null
  }
  if (user.id) {
    return <Navigate to="/dashboard" replace />
  }
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Outlet />
      </div>
      <Wave className={classes.wave} />
    </div>
  )
}

export default Layout
