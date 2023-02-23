import { Tooltip, TooltipProps } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from './HeaderControl.styles'

function HeaderTooltip({ children, label, disabled, ...others }: TooltipProps) {
  const { theme } = useStyles()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
    <Tooltip
      label={label}
      disabled={isMobile || disabled}
      transition="fade"
      openDelay={300}
      events={{ hover: true, focus: true, touch: false }}
      {...others}
    >
      {children}
    </Tooltip>
  )
}
export default HeaderTooltip
