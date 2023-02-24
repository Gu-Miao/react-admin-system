import { Link, matchRoutes, useLocation, RouteMatch } from 'react-router-dom'
import { UnstyledButton } from '@mantine/core'
import CollapseMenuItem from './CollapseMenuItem'
import useConst from '@/hooks/useConst'
import router, { routes, RouteData } from '@/router'
import useStyles from './NavbarMenu.styles'

function NavbarMenu() {
  const location = useLocation()
  const [, ...matchedRoutes] = matchRoutes(
    router.routes,
    location,
    process.env.PUBLIC_URL,
  ) as RouteMatch[]
  const topLevelRoutes = useConst(
    routes.find(route => route.path === 'dashboard')?.children as RouteData[],
  )

  return (
    <ul>
      <MenuItems routes={topLevelRoutes} matchedRoutes={matchedRoutes} />
    </ul>
  )
}

interface MenuItemProps {
  routes: RouteData[]
  prefix?: string
  matchedRoutes: RouteMatch[]
}

function MenuItems({ routes, prefix = '', matchedRoutes }: MenuItemProps) {
  const { classes, cx } = useStyles()
  return (
    <>
      {routes.map(route => {
        const path = getPath(route, prefix)
        const [current, ...rest] = matchedRoutes
        const isMatched = current?.route.path === route.path

        if (route.children) {
          return (
            <li key={path}>
              <CollapseMenuItem defaultOpened={isMatched} label={route?.title}>
                <ul>
                  <MenuItems routes={route.children} prefix={path} matchedRoutes={rest} />
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
            >
              {route?.title}
            </UnstyledButton>
          </li>
        )
      })}
    </>
  )
}

function getPath(route: RouteData, prefix: string) {
  if (route.index) return prefix
  if (route.path?.startsWith('/') || prefix === '') return route.path as string
  return prefix.endsWith('/') ? prefix + route.path : `${prefix}/${route.path}`
}

export default NavbarMenu
