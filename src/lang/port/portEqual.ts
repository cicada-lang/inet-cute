import { nodeEqual } from "../node/nodeEqual"
import { Port } from "./Port"

export function portEqual(x: Port, y: Port): boolean {
  return nodeEqual(x.node, y.node) && x.name === y.name
}
