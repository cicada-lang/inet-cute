export function arrayPopMany<A>(array: Array<A>, n: number): Array<A> {
  const results: Array<A> = []
  while (n > 0) {
    const value = array.pop()
    if (value === undefined) {
      break
    } else {
      results.push(value)
    }

    n--
  }

  return results
}
