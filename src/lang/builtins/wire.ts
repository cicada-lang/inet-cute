import { ComposeOptions } from "../compose/compose"
import { Env } from "../env"
import { refreshNode } from "../freshen/refreshNode"
import { createNode } from "../node/createNode"
import { Value } from "../value"

export function compose(env: Env, options: ComposeOptions): void {
  const t: Value = {
    "@type": "Value",
    "@kind": "TypeVar",
    name: "a",
  }

  const node = createNode(
    env.mod,
    "wire",
    [],
    [
      { name: "front", t, isPrincipal: false },
      { name: "back", t, isPrincipal: true },
    ],
  )

  if (options.checking) {
    refreshNode(options.checking.typeVarCounters, node)
  }

  env.stack.push(...node.output)

  env.wires.push({
    first: node.output[0],
    second: node.output[1],
  })
}
