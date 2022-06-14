import { AppShell, Container } from '@mantine/core'
import HomeHeader from './HomeHeader'
import { ReactComponent as TitleBanner } from '@/assets/images/title-banner.svg'
import useStyles from './Home.styles'

function Home() {
  const { classes } = useStyles()
  return (
    <AppShell header={<HomeHeader />}>
      <Container size="lg" className={classes.container}>
        <TitleBanner className={classes.title} />
      </Container>
    </AppShell>
  )
}
export default Home
