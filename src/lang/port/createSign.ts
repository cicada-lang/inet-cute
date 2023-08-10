import { Sign } from "./Sign"

export function createSign(n: number): Sign {
  if (n === 1) return 1
  if (n === 0) return 0
  if (n === -1) return -1

  throw new Error(
    [
      `[createSign] I expect the given number to be 1, +1 or 0.`,
      ``,
      `  given number: ${n}`,
    ].join("\n"),
  )
}
