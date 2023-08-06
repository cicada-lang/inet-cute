import { NodeDefinition } from "../definition"
import { Node } from "../graph"
import { createNode } from "../graph/createNode"
import { Net } from "../net"
import { composeNode } from "./composeNode"

export function composeNodeDefinition(
  net: Net,
  definition: NodeDefinition,
): Node {
  const node = createNode(
    definition.mod,
    definition.name,
    definition.input,
    definition.output,
  )

  composeNode(net, node)

  return node
}
