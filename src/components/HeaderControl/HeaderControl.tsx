import { forwardRef, ComponentPropsWithoutRef } from 'react'
import { UnstyledButton } from '@mantine/core'
import HeaderTooltip from './HeaderTooltip'
import useStyles from './HeaderControl.styles'

interface HeaderControlProps extends ComponentPropsWithoutRef<'button'> {
  tooltip: string
  tooltipDisabled?: boolean
}

const HeaderControl = forwardRef<HTMLButtonElement, HeaderControlProps>(
  ({ className, tooltip, tooltipDisabled, ...others }, ref) => {
    const { classes } = useStyles()

    return (
      <HeaderTooltip label={tooltip} disabled={tooltipDisabled}>
        <UnstyledButton ref={ref} className={classes.control} {...others} />
      </HeaderTooltip>
    )
  },
)

export default HeaderControl
