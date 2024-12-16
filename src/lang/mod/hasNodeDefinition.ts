import { type NodeWithoutId } from "../node/index.ts"
import { type Mod } from "./Mod.ts"
import { findDefinition } from "./findDefinition.ts"

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
