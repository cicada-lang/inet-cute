export function countStringOccurrences(
  words: Array<string>,
): Map<string, number> {
  const counts = new Map()

  for (const word of words) {
    const count = counts.get(word)
    if (count === undefined) {
      counts.set(word, 1)
    } else {
      counts.set(word, count + 1)
    }
  }

  return counts
}
