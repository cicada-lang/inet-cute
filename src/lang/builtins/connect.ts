import { Env } from "../env"
import { Port } from "../port"
import { connect } from "../utils/connect"

export function compose(env: Env): void {
  const start = env.stack.pop() as Port
  const end = env.stack.pop() as Port
  connect(env, start, end)
}

export function cut(env: Env): void {
  const x2 = env.stack.pop()
  const x1 = env.stack.pop()
  // TODO  unifySignedTypes(env, x1, x2)
}
