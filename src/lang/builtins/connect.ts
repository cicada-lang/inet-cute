import { Env } from "../env"
import { connect } from "../env/connect"
import { Port } from "../port"

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
