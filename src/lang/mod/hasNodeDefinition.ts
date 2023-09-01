import { NodeWithoutId } from "../node"
import { Mod } from "./Mod"
import { findDefinition } from "./findDefinition"

export function hasNodeDefinition(mod: Mod, node: NodeWithoutId): boolean {
  const definition = findDefinition(mod, node.name)
  if (definition === undefined) {
    return false
  }

  if (definition["@kind"] !== "NodeDefinition") {
    return false
  }

  if (definition.mod.url.href !== mod.url.href) {
    return false
  }

  return true
}
