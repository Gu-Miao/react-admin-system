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
