import { Env } from "../env"
import { Port } from "../port"
import { connect } from "../utils/connect"

export function compose(env: Env): void {
  const first = env.stack.pop() as Port
  const second = env.stack.pop() as Port
  connect(env, first, second)
}
