import { Env } from "../env"
import { formatValue } from "../value/formatValue"

export function compose(env: Env): void {
  const first = env.stack.pop()

  if (first === undefined) {
    throw new Error([`[@swap] I expect first value on the stack.`].join("\n"))
  }

  const second = env.stack.pop()

  if (second === undefined) {
    throw new Error(
      [
        `[@swap] I expect a second value on the stack.`,
        ``,
        `  first: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  env.stack.push(first, second)
}
