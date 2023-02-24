import { AppShell, Container, Text, Group, Button, useMantineTheme } from '@mantine/core'
import { Link, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useRedux'
import { selectUser } from '@/store/user'
import Header from '@/components/Header'
import { MarkGithubIcon } from '@primer/octicons-react'
import { ReactComponent as TitleBanner } from '@/assets/images/title-banner.svg'
import { ReactComponent as Wave } from '@/assets/images/wave.svg'
import useStyles from './Home.styles'

function Home() {
  const user = useAppSelector(selectUser)
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()

  if (user.id) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <AppShell header={<Header />} styles={{ main: { padding: 0 } }}>
      <Container size="lg" className={classes.container}>
        <TitleBanner className={classes.title} />
        <Text className={classes.description}>
          Build admin system using React. Rich features, all are out of the box.
        </Text>
        <Group className={classes.controls}>
          <Button
            component={Link}
            to="auth/login"
            size="xl"
            radius="md"
            className={cx(classes.control, classes.controlPrimary)}
            variant="gradient"
          >
            Get started
          </Button>
          <Button
            component="a"
            href="https://github.com/Gu-Miao/react-admin-system"
            target="_blank"
            rel="noreferrer"
            size="xl"
            variant="outline"
            radius="md"
            className={cx(classes.control, classes.githubControl)}
            color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            leftIcon={<MarkGithubIcon size={20} />}
            styles={{ leftIcon: { marginRight: 12 } }}
          >
            Source Code
          </Button>
        </Group>
      </Container>
      <Wave className={classes.wave} />
    </AppShell>
  )
}
export default Home
