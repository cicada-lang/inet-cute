import { Mod } from "../mod"

export function createHalfEdgeId(mod: Mod): string {
  const n = mod.halfEdgeCounter++
  return n.toString()
}
