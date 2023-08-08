import { NodeDefinition } from "../definition"
import { Env } from "../env"
import { Node } from "../node"
import { createNode } from "../node/createNode"
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
