import { useToggle } from '@mantine/hooks'

/**
 * Use boolean value
 * @param initialValue Initial value, ture or false
 */
export default function useBoolean(initialValue: any) {
  return useToggle<boolean>(Boolean(initialValue), [true, false])
}
