import { FC, PropsWithChildren } from 'react'
import { Accordion } from '@mantine/core'
import useStyles from './CollapseMenuItem.styles'

interface CollapseMenuItemProps extends PropsWithChildren {
  label?: string
  defaultOpened?: boolean
}

const CollapseMenuItem: FC<CollapseMenuItemProps> = ({ label, defaultOpened, children }) => {
  const { classes } = useStyles()

  return (
    <Accordion
      initialItem={defaultOpened ? 0 : undefined}
      classNames={classes}
      iconPosition="right"
    >
      <Accordion.Item label={label}>{children}</Accordion.Item>
    </Accordion>
  )
}

export default CollapseMenuItem
