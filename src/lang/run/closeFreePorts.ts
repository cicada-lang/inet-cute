import { composeNode } from "../compose/composeNode"
import { Env } from "../env"
import { Node } from "../node"
import { createNode } from "../node/createNode"
import { Port } from "../port"
import { createSign } from "../port/createSign"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(env: Env): Node | undefined {
  if (env.stack.length === 0) {
    return undefined
  }

  const ports = env.stack
    .filter((value): value is Port => value["@kind"] === "Port")
    .map<Port>((port) => ({
      "@type": "Value",
      "@kind": "Port",
      name: `_root_placeholder_port_for_${port.name}_of_${port.node.name}`,
      node: port.node,
      t: port.t,
      sign: createSign(-port.sign),
      isPrincipal: false,
    }))

  const node = createNode(env.mod, "_root", ports, [])

  return composeNode(env, node, {})
}
