import { Env } from "../env"
import { formatValue } from "../value/formatValue"

export function compose(env: Env): void {
  const first = env.stack.pop()

  if (first === undefined) {
    throw new Error([`[@rot] I expect first value on the stack.`].join("\n"))
  }

  const second = env.stack.pop()

  if (second === undefined) {
    throw new Error(
      [
        `[@rot] I expect a second value on the stack.`,
        ``,
        `  first: ${formatValue(first)}`,
      ].join("\n"),
    )
  }

  const third = env.stack.pop()

  if (third === undefined) {
    throw new Error(
      [
        `[@rot] I expect a third value on the stack.`,
        ``,
        `  first: ${formatValue(first)}`,
        `  second: ${formatValue(second)}`,
      ].join("\n"),
    )
  }

  env.stack.push(second, first, third)
}
