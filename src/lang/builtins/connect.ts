import { ComposeOptions } from "../compose/compose"
import { connect } from "../connect/connect"
import { Env } from "../env"
import { Port } from "../port"
import { unifyTypes } from "../unify/unifyTypes"

export function compose(env: Env, options: ComposeOptions): void {
  const first = env.stack.pop() as Port
  const second = env.stack.pop() as Port
  connect(env, first, second)
  if (options.checking) {
    unifyTypes(options.checking.substitution, first.t, second.t)
  }
}
