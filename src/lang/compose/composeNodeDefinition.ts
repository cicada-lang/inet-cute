import { NodeDefinition } from "../definition"
import { Env } from "../env"
import { Node } from "../graph"
import { createNode } from "../graph/createNode"
import { composeNode } from "./composeNode"

export function composeNodeDefinition(
  env: Env,
  definition: NodeDefinition,
): Node {
  const node = createNode(
    definition.mod,
    definition.name,
    definition.input,
    definition.output,
  )

  composeNode(env, node)

  return node
}
