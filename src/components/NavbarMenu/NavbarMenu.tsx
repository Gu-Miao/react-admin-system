import { useRef, useEffect, MouseEventHandler, MutableRefObject } from 'react'
import { Link, matchRoutes, useLocation, RouteMatch } from 'react-router-dom'
import { UnstyledButton } from '@mantine/core'
import CollapseMenuItem from './CollapseMenuItem'
import useConst from '@/hooks/useConst'
import router, { routes, RouteData } from '@/router'
import useStyles from './NavbarMenu.styles'

type NavbarMenuProps = {
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function NavbarMenu({ onClick }: NavbarMenuProps) {
  const location = useLocation()
  const { classes } = useStyles()
  const [, ...matchedRoutes] = matchRoutes(
    router.routes,
    location,
    process.env.PUBLIC_URL,
  ) as RouteMatch[]
  const topLevelRoutes = useConst(
    routes.find(route => route.path === 'dashboard')?.children as RouteData[],
  )

  return (
    <ul className={classes.list}>
      <MenuItems onClick={onClick} routes={topLevelRoutes} matchedRoutes={matchedRoutes} />
    </ul>
  )
}

interface MenuItemProps {
  routes: RouteData[]
  base?: string
  matchedRoutes: RouteMatch[]
  onClick?: NavbarMenuProps['onClick']
}

function MenuItems({ routes, base = '', matchedRoutes, onClick }: MenuItemProps) {
  const { classes, cx } = useStyles()
  const activeRef = useRef<HTMLAnchorElement>()

  useEffect(() => {
    if (activeRef.current) {
      // For scrolling to the position of active menu item and don't show the
      // style of focus
      activeRef.current.focus()
      activeRef.current.blur()
    }
  }, [])

  return (
    <>
      {routes.map(route => {
        const path = joinPath(route, base)
        const [current, ...rest] = matchedRoutes
        const isMatched = current?.route.path === route.path

        if (route.children) {
          return (
            <li key={path}>
              <CollapseMenuItem defaultOpened={isMatched} label={route?.title}>
                {/* There are children, so the recursive rendering is required */}
                <ul>
                  <MenuItems
                    onClick={onClick}
                    routes={route.children}
                    base={path}
                    matchedRoutes={rest}
                  />
                </ul>
              </CollapseMenuItem>
            </li>
          )
        }

        return (
          <li key={path}>
            <UnstyledButton
              component={Link}
              to={path}
              className={cx(classes.menuItem, isMatched && classes.active)}
              onClick={onClick}
              // ActiveRef must be on the matching menu item of the last loop
              // So it must be a anchor
              ref={isMatched ? (activeRef as MutableRefObject<HTMLAnchorElement>) : undefined}
            >
              {route?.title}
            </UnstyledButton>
          </li>
        )
      })}
    </>
  )
}

/**
 * Join the path with route data and base
 * @param route Data of single route
 * @param base Base path
 * @returns Complete path
 */
function joinPath(route: RouteData, base: string) {
  if (route.index) return base
  if (route.path?.startsWith('/') || base === '') return route.path as string
  return base.endsWith('/') ? base + route.path : `${base}/${route.path}`
}

export default NavbarMenu
