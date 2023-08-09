import { Env } from "../env"
import { Port } from "../port"
import { connect } from "../utils/connect"

export function compose(env: Env): void {
  const start = env.stack.pop() as Port
  const end = env.stack.pop() as Port
  connect(env, start, end)
}
