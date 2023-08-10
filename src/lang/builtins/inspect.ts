import { Env } from "../env"
import { formatNetFromEnv } from "../env/formatNetFromEnv"
import { formatValue } from "../value/formatValue"

export function compose(env: Env): void {
  const value = env.stack[env.stack.length - 1]
  if (value === undefined) {
    throw new Error(`[inspect (builtin)] I expect a value on the stack.`)
  }

  if (value["@kind"] === "Port") {
    console.log(formatNetFromEnv(env))
    console.log()
    return
  }

  console.log(formatValue(value))
  console.log()
}
