import { Definition } from "../definition"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { Node } from "../node"

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

  return addNode(
    net,
    definition.mod,
    definition.name,
    definition.input,
    definition.output,
  )
}
