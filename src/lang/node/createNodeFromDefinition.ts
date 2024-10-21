import { type Definition } from "../definition/index.js"
import { addNode } from "../net/addNode.js"
import { type Net } from "../net/index.js"
import { type Node } from "../node/index.js"

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
