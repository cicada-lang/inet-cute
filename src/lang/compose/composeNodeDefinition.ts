import { NodeDefinition } from "../definition"
import { Env } from "../env"
import { Node } from "../graph"
import { createNode } from "../graph/createNode"
import { composeNode } from "./composeNode"

export function composeNodeDefinition(
  net: Env,
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
