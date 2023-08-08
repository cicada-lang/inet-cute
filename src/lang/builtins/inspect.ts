import { Env } from "../env"
import { formatNetFromEnv } from "../env/formatNetFromEnv"
import { formatValue } from "../value/formatValue"

export function compose(env: Env): void {
  const value = env.stack[env.stack.length - 1]
  if (value === undefined) {
    throw new Error(`[println / compose] I expect a value on the stack.`)
  }

  if (value["@kind"] === "Port") {
    console.log(formatNetFromEnv(env))
    return
  }

  console.log(formatValue(value))
}

export function cut(env: Env): void {
  const value = env.stack[env.stack.length - 1]
  if (value === undefined) {
    throw new Error(`[println / cut] I expect a value on the stack.`)
  }
}
