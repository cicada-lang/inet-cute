import { composeNode } from "../compose/composeNode"
import { Env } from "../env"
import { Node } from "../node"
import { createNode } from "../node/createNode"
import { Port } from "../port"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(env: Env): Node | undefined {
  if (env.stack.length === 0) {
    return undefined
  }

  const ports = env.stack.filter(
    (value): value is Port => value["@kind"] === "Port",
  )

  const node = createNode(env.mod, "#root", ports, [])

  return composeNode(env, node)
}
