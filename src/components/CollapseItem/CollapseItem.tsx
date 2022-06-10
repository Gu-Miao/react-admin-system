import { FC, PropsWithChildren, ReactNode } from 'react'
import { UnstyledButton, Group, Collapse } from '@mantine/core'
import { ChevronRight } from 'tabler-icons-react'
import useStyles from './CollapseItem.styles'
import useBoolean from '@/hooks/useBoolean'

interface CollapseItemProps {
  label?: ReactNode
  open?: boolean
}

const CollapseItem: FC<PropsWithChildren<CollapseItemProps>> = ({
  label,
  open = false,
  children
}) => {
  const [show, toggleShow] = useBoolean(open)
  const { classes } = useStyles({ show })
  return (
    <div className={classes.item}>
      <h3 className={classes.itemTitle}>
        <UnstyledButton className={classes.control} onClick={() => toggleShow()}>
          <Group spacing={0} position="apart">
            <div>{label}</div>
            <ChevronRight className={classes.icon} size={16} />
          </Group>
        </UnstyledButton>
      </h3>
      <Collapse in={show}>
        <div className={classes.content}>{children}</div>
      </Collapse>
    </div>
  )
}
export default CollapseItem
