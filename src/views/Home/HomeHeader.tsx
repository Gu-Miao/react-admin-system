import { Header, UnstyledButton, Group, MediaQuery, Title, Menu } from '@mantine/core'
import { Link } from 'react-router-dom'
import SearchControl from '@/components/Layout/AppHeader/SearchControl'
import HeaderControl from '@/components/Layout/AppHeader/HeaderControl'
import { ReactComponent as React } from '@/assets/images/react.svg'
import { TextDirectionLtr, TextDirectionRtl, Moon, Sun, LanguageHiragana } from 'tabler-icons-react'
import { MarkGithubIcon } from '@primer/octicons-react'
import useBoolean from '@/hooks/useBoolean'
import { useDirectionContext } from '@/contexts/DirectionContext'
import useStyles from './HomeHeader.styles'

function HomeHeader() {
  const [enableDarkMode, toggleEnableDarkMode] = useBoolean(false)
  const { dir, toggleDirection } = useDirectionContext()
  const { classes } = useStyles()
  return (
    <Header height={60} p="sm">
      <Group spacing={0} position="apart">
        <UnstyledButton component={Link} to="/dashboard">
          <Group spacing={0}>
            <React className={classes.logo} />
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Title order={1} className={classes.title}>
                React Admin System
              </Title>
            </MediaQuery>
          </Group>
        </UnstyledButton>
        <Group spacing="sm">
          <SearchControl />
          <HeaderControl tooltip="Github" link="https://github.com/Gu-Miao/react-admin">
            <MarkGithubIcon size={20} />
          </HeaderControl>
          <Menu
            control={
              <HeaderControl tooltip="Select language">
                <LanguageHiragana />
              </HeaderControl>
            }
          >
            <Menu.Item>简体中文</Menu.Item>
            <Menu.Item>English</Menu.Item>
            <Menu.Item>日本語</Menu.Item>
          </Menu>
          <HeaderControl
            tooltip={`${dir.toUpperCase()} direction`}
            onClick={() => toggleDirection()}
          >
            {dir === 'rtl' ? <TextDirectionLtr /> : <TextDirectionRtl />}
          </HeaderControl>
          <HeaderControl
            tooltip={enableDarkMode ? 'Light mode' : 'Dark mode'}
            onClick={() => toggleEnableDarkMode()}
          >
            {enableDarkMode ? <Sun /> : <Moon />}
          </HeaderControl>
        </Group>
      </Group>
    </Header>
  )
}

export default HomeHeader
