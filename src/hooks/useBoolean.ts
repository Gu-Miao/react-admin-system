import { useToggle } from '@mantine/hooks'

/**
 * Use boolean value
 * @param initialValue Initial value, ture or false
 */
export default function useBoolean(initialValue: boolean) {
  return useToggle<boolean>(initialValue, [true, false])
}
