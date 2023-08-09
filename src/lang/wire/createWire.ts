import { Env } from "../env"
import { Node } from "../node"
import { createNode } from "../node/createNode"
import { Port } from "../port"
import { Value } from "../value"

export function createWire(env: Env): {
  node: Node
  first: Port
  second: Port
} {
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

  const first = node.output[0]
  first.sign = 0

  const second = node.output[1]
  second.sign = 0

  return {
    node,
    first,
    second,
  }
}
