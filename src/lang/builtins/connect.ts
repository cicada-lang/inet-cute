import { Env } from "../env"
import { connect } from "../env/connect"
import { Port } from "../port"
import { SignedType } from "../value"

export function compose(env: Env): void {
  const start = env.stack.pop() as Port
  const end = env.stack.pop() as Port
  connect(env, start, end)
}

export function cut(env: Env): void {
  const x2 = env.stack.pop() as SignedType
  const x1 = env.stack.pop() as SignedType
  // TODO  unifySignedTypes(env, x1, x2)
}
