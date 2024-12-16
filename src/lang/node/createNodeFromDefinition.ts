import { type Definition } from "../definition/index.ts"
import { addNode } from "../net/addNode.ts"
import { type Net } from "../net/index.ts"
import { type Node } from "../node/index.ts"

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
