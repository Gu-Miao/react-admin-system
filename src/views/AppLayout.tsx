import { useState } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Center,
  Group,
  Title,
  Text,
  Tooltip,
  ActionIcon,
  Avatar,
  MediaQuery,
  Burger,
  useMantineTheme
} from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { ReactComponent as ReactSvg } from '@/assets/images/react.svg'
import { BrandGithub, TextDirectionLtr, TextDirectionRtl, Moon, Sun } from 'tabler-icons-react'
import useBoolean from '@/hooks/useBoolean'

function AppLayout() {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [enableRTL, toggleEnableRTL] = useBoolean(false)
  const [enableDarkMode, toggleEnableDarkMode] = useBoolean(false)
  return (
    <AppShell
      fixed
      header={
        <Header height={70} p="md">
          <div className="flex items-center h-full">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group className="w-full" position="apart">
              <Group spacing={0}>
                <ReactSvg className="w-12 h-auto" />
                <Title order={1} className="text-2xl">
                  React Admin
                </Title>
              </Group>
              <Group spacing="sm">
                <Tooltip label="Github" transition="fade">
                  <ActionIcon size="xl" radius="md" variant="light">
                    <BrandGithub />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="RTL" transition="fade">
                  <ActionIcon
                    size="xl"
                    radius="md"
                    variant="light"
                    onClick={() => toggleEnableRTL()}
                  >
                    {enableRTL ? <TextDirectionLtr /> : <TextDirectionRtl />}
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Dark" transition="fade">
                  <ActionIcon
                    size="xl"
                    radius="md"
                    variant="light"
                    onClick={() => toggleEnableDarkMode()}
                  >
                    {enableDarkMode ? <Sun /> : <Moon />}
                  </ActionIcon>
                </Tooltip>
                <Avatar
                  radius={999}
                  size="md"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
              </Group>
            </Group>
          </div>
        </Header>
      }
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          <Center>
            <Text>
              Made by{' '}
              <Text
                variant="link"
                component="a"
                href="https://github.com/Gu-Miao"
                target="_blank"
                rel="noreferrer"
              >
                Gu Miao
              </Text>
            </Text>
          </Center>
        </Footer>
      }
    >
      <Outlet />
    </AppShell>
  )
}

export default AppLayout
