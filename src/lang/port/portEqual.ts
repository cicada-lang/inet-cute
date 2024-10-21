import { nodeEqual } from "../node/nodeEqual.js"
import { type Port } from "./Port.js"

export function portEqual(x: Port, y: Port): boolean {
  return nodeEqual(x.node, y.node) && x.name === y.name
}
