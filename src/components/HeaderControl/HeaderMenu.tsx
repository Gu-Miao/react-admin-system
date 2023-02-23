import { useState, PropsWithChildren } from 'react'
import { Menu, MenuProps } from '@mantine/core'
import { findChildren } from '@/utils'
import HeaderControl from './HeaderControl'

interface HeaderMenuProps extends MenuProps {
  tooltip: string
}

function HeaderMenu({ tooltip, children }: HeaderMenuProps) {
  const [opened, setOpened] = useState(false)
  const dropDown = findChildren(children, Menu.Dropdown)
  const control = findChildren(children, HeaderMenuControl)

  return (
    <Menu opened={opened} onChange={setOpened}>
      <Menu.Target>
        <HeaderControl tooltip={tooltip} tooltipDisabled={opened}>
          {control}
        </HeaderControl>
      </Menu.Target>
      {dropDown}
    </Menu>
  )
}

function HeaderMenuControl({ children }: PropsWithChildren) {
  return <>{children}</>
}

HeaderMenu.Dropdown = Menu.Dropdown
HeaderMenu.Control = HeaderMenuControl

export default HeaderMenu
