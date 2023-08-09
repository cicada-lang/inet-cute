import { NodeDefinition } from "../definition"
import { Env } from "../env"
import { Node } from "../node"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { composeNode } from "./composeNode"

export function composeNodeDefinition(
  env: Env,
  definition: NodeDefinition,
): Node {
  const node = createNodeFromDefinition(definition)

  composeNode(env, node)

  return node
}
