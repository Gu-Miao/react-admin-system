import { FC, PropsWithChildren } from 'react'
import { Accordion } from '@mantine/core'
import useStyles from './CollapseMenuItem.styles'

interface CollapseMenuItemProps extends PropsWithChildren {
  defaultOpened?: boolean
  label?: string
}

const CollapseMenuItem: FC<CollapseMenuItemProps> = ({ defaultOpened, label, children }) => {
  const { classes } = useStyles()

  return (
    <Accordion defaultValue={defaultOpened ? '0' : undefined} classNames={classes}>
      <Accordion.Item value="0">
        <Accordion.Control>{label}</Accordion.Control>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export default CollapseMenuItem
