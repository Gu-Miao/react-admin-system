import { Title, Text } from '@mantine/core'
import { ReactComponent as NotFound } from '@/assets/images/not-found.svg'
import useStyles from './Error.styles'

function Error() {
  const { classes } = useStyles()
  return (
    <div className={classes.container}>
      <NotFound className={classes.banner} />
      <Title order={1} className={classes.title}>
        404 Not Found
      </Title>
      <Text>The page you visit is not found, please go back home or try again</Text>
    </div>
  )
}
export default Error
