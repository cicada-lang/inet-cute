import { composeNode } from "../compose/composeNode"
import { Env } from "../env"
import { Node } from "../node"
import { createNode } from "../node/createNode"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(env: Env): Node | undefined {
  if (env.stack.length === 0) {
    return undefined
  }

  const node = createNode(env.mod, "*root*", [...env.stack], [])
  return composeNode(env, node)
}
