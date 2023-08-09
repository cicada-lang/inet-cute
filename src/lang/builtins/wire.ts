import { ComposeOptions } from "../compose/compose"
import { Env } from "../env"
import { refreshNode } from "../freshen/refreshNode"
import { createWire } from "../wire/createWire"

export function compose(env: Env, options: ComposeOptions): void {
  const { node, first, second } = createWire(env)

  if (options.checking) {
    refreshNode(options.checking.typeVarCounters, node)
  }

  env.stack.push(first)
  env.stack.push(second)

  env.wires.push({ first, second })
}
