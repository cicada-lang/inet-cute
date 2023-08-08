import { Env } from "../env"
import { Port } from "../port"
import { SignedType } from "../value"

export function compose(env: Env): void {
  const x2 = env.stack.pop() as Port
  const x1 = env.stack.pop() as Port
  const x0 = env.stack.pop() as Port
  env.stack.push(x1, x2, x0)
}

export function cut(env: Env): void {
  const x2 = env.stack.pop() as SignedType
  const x1 = env.stack.pop() as SignedType
  const x0 = env.stack.pop() as SignedType
  env.stack.push(x1, x2, x0)
}
