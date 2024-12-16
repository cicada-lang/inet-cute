import { nodeEqual } from "../node/nodeEqual.ts"
import { type Port } from "./Port.ts"

export function portEqual(x: Port, y: Port): boolean {
  return nodeEqual(x.node, y.node) && x.name === y.name
}
