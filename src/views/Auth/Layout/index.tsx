import { Outlet } from 'react-router-dom'
import { ReactComponent as Wave } from '@/assets/images/wave-gently.svg'
import useStyles from './index.syltes'

const Layout = () => {
  const { classes } = useStyles()
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
