import {
  Header as MantineHeader,
  UnstyledButton,
  Group,
  MediaQuery,
  Title,
  Menu,
  Avatar,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { Link, useLocation } from 'react-router-dom'
import MobileNav from './MobileNav'
import SearchControl from '@/components/SearchControl'
import { HeaderControl, HeaderLink, HeaderMenu } from '@/components/HeaderControl'
import {
  TextDirectionLtr,
  TextDirectionRtl,
  Moon,
  Sun,
  LanguageHiragana,
  User,
  Star,
  ClipboardList,
  ChartBar,
  History,
  Settings,
  InfoCircle,
  Logout,
} from 'tabler-icons-react'
import { MarkGithubIcon } from '@primer/octicons-react'
import { ReactComponent as React } from '@/assets/images/react.svg'
import { useMediaQuery } from '@mantine/hooks'
import useBoolean from '@/hooks/useBoolean'
import { useDirectionContext } from '@/contexts/DirectionContext'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { setUserInfo, selectUser } from '@/store/user'
import forage from '@/utils/forage'
import useStyles from './Header.styles'

function Header() {
  const modals = useModals()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [enableDarkMode, toggleEnableDarkMode] = useBoolean(false)
  const { dir, toggleDirection } = useDirectionContext()
  const { classes } = useStyles()
  const location = useLocation()
  const theme = useMantineTheme()
  const matchs = useMediaQuery(`((max-width: ${theme.breakpoints.sm}px))`)

  function handleLogOutClick() {
    modals.openConfirmModal({
      title: <Text size="xl">Confirm log out?</Text>,
      confirmProps: { color: 'red' },
      labels: {
        confirm: 'Yes, quit now',
        cancel: 'Wait, later',
      },
      onConfirm() {
        dispatch(setUserInfo())
        forage.removeItem('user')
      },
    })
  }

  return (
    <MantineHeader height={60} p="sm">
      <Group spacing={0} position="apart">
        {location.pathname.startsWith('/dashboard') && matchs && <MobileNav />}
        <UnstyledButton component={Link} to="/">
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
          <HeaderLink tooltip="Github" link="https://github.com/Gu-Miao/react-admin">
            <MarkGithubIcon size={20} />
          </HeaderLink>
          <HeaderMenu tooltip="Select language">
            <HeaderMenu.Control>
              <LanguageHiragana />
            </HeaderMenu.Control>
            <HeaderMenu.Dropdown>
              <Menu.Item>简体中文</Menu.Item>
              <Menu.Item>English</Menu.Item>
              <Menu.Item>日本語</Menu.Item>
            </HeaderMenu.Dropdown>
          </HeaderMenu>
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
          {user.id && (
            <HeaderMenu tooltip="admin">
              <HeaderMenu.Control>
                <Avatar
                  className=" cursor-pointer"
                  radius={999}
                  size="md"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
              </HeaderMenu.Control>
              <HeaderMenu.Dropdown>
                <Menu.Item icon={<User size={16} />}>Profile</Menu.Item>
                <Menu.Item icon={<Star size={16} />}>Your stars</Menu.Item>
                <Menu.Item icon={<ClipboardList size={16} />}>Your sumbits</Menu.Item>
                <Menu.Item icon={<ChartBar size={16} />}>Your audits</Menu.Item>
                <Menu.Item icon={<History size={16} />}>History</Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<Settings size={16} />}>Settings</Menu.Item>
                <Menu.Item icon={<InfoCircle size={16} />}>About</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" icon={<Logout size={16} />} onClick={handleLogOutClick}>
                  Log out
                </Menu.Item>
              </HeaderMenu.Dropdown>
            </HeaderMenu>
          )}
        </Group>
      </Group>
    </MantineHeader>
  )
}

export default Header
