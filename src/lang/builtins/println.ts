import { Ctx } from "../ctx"
import { Env } from "../env"
import { formatValue } from "../value/formatValue"

export function compose(env: Env): void {
  const value = env.stack.pop()
  if (value === undefined) {
    throw new Error(`[println / compose] I expect a value on the stack.`)
  }

  console.log(formatValue(value))
}

export function cut(ctx: Ctx): void {
  const value = ctx.stack.pop()
  if (value === undefined) {
    throw new Error(`[println / cut] I expect a value on the stack.`)
  }
}
