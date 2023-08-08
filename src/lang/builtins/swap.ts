import { Env } from "../env"
import { Value } from "../value"

export function compose(env: Env): void {
  const x1 = env.stack.pop() as Value
  const x0 = env.stack.pop() as Value
  env.stack.push(x1, x0)
}

export function cut(env: Env): void {
  const x1 = env.stack.pop() as Value
  const x0 = env.stack.pop() as Value
  env.stack.push(x1, x0)
}
