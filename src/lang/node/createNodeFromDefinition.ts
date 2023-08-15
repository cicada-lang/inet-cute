import { Definition } from "../definition"
import { Net } from "../net"
import { Node } from "../node"
import { createNode } from "../node/createNode"

export function createNodeFromDefinition(
  net: Net,
  definition: Definition,
): Node {
  if (definition["@kind"] !== "NodeDefinition") {
    throw new Error(
      [
        `[createNodeFromDefinition] I expect the definition to be NodeDefinition.`,
        ``,
        `  definition kind: ${definition["@kind"]}`,
      ].join("\n"),
    )
  }

  return createNode(
    net,
    definition.mod,
    definition.name,
    definition.input,
    definition.output,
  )
}
