import { Children, ReactNode, ReactElement } from 'react'

/**
 * Sleep
 * @param duration
 * @returns
 */
export function sleep(duration: number): Promise<void> {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, duration * 1000)
  })
}

/** Filter children */
export function filterChildren(children: ReactNode | null, type: any) {
  return (Children.toArray(children) as ReactElement[]).filter(child => child.type === type)
}

/** Filter children */
export function findChildren(children: ReactNode | null, type: any) {
  return (Children.toArray(children) as ReactElement[]).find(child => child.type === type)
}
