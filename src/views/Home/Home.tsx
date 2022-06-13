import { AppShell, Title, Text } from '@mantine/core'
import HomeHeader from './HomeHeader'
import useStyles from './Home.styles'

function Home() {
  const { classes } = useStyles()
  return (
    <AppShell header={<HomeHeader />}>
      <div>
        <Title order={1} className={classes.title}>
          A{' '}
          <Text
            className={classes.gradient}
            component="span"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          >
            fully featured
          </Text>{' '}
          admin
          <br />
          system built by react
        </Title>
      </div>
    </AppShell>
  )
}
export default Home
