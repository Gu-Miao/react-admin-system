import { memo, FC, MouseEventHandler } from 'react'
import {
  Header,
  Group,
  Title,
  UnstyledButton,
  Avatar,
  Menu,
  Divider,
  MediaQuery,
  Burger,
  useMantineTheme
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { ReactComponent as ReactSvg } from '@/assets/images/react.svg'
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
  Logout
} from 'tabler-icons-react'
import { MarkGithubIcon } from '@primer/octicons-react'
import SearchControl from './SearchControl'
import HeaderControl from './HeaderControl'
import useBoolean from '@/hooks/useBoolean'
import { useDirectionContext } from '../DirectionContext'

type AppHeaderProps = {
  opened: boolean
  onOpenedChange: MouseEventHandler<HTMLButtonElement>
}

const AppHeader: FC<AppHeaderProps> = ({ opened, onOpenedChange }) => {
  const theme = useMantineTheme()
  const [enableDarkMode, toggleEnableDarkMode] = useBoolean(false)
  const { dir, toggleDirection } = useDirectionContext()

  return (
    <Header height={60} p="sm">
      <Group position="apart">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={onOpenedChange}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <UnstyledButton component={Link} to="/">
          <Group spacing={0}>
            <ReactSvg className="w-12 h-auto" />
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Title order={1} className="text-2xl leading-snug">
                React Admin
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
          <Menu
            control={
              <Avatar
                className=" cursor-pointer"
                radius={999}
                size="md"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              />
            }
          >
            <Menu.Item icon={<User size={16} />}>Profile</Menu.Item>
            <Menu.Item icon={<Star size={16} />}>Your stars</Menu.Item>
            <Menu.Item icon={<ClipboardList size={16} />}>Your sumbits</Menu.Item>
            <Menu.Item icon={<ChartBar size={16} />}>Your audits</Menu.Item>
            <Menu.Item icon={<History size={16} />}>History</Menu.Item>
            <Divider />
            <Menu.Item icon={<Settings size={16} />}>Settings</Menu.Item>
            <Menu.Item icon={<InfoCircle size={16} />}>About</Menu.Item>
            <Divider />
            <Menu.Item color="red" icon={<Logout size={16} />}>
              Log out
            </Menu.Item>
          </Menu>
        </Group>
      </Group>
    </Header>
  )
}

export default memo(AppHeader)
