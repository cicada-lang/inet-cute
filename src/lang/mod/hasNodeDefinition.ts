import { type NodeWithoutId } from "../node/index.js"
import { type Mod } from "./Mod.js"
import { findDefinition } from "./findDefinition.js"

export function hasNodeDefinition(mod: Mod, node: NodeWithoutId): boolean {
  const definition = findDefinition(mod, node.name)
  if (definition === undefined) {
    return false
  }

  if (definition["@kind"] !== "NodeDefinition") {
    return false
  }

  if (definition.mod.url.href !== node.url.href) {
    return false
  }

  return true
}
