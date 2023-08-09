import { Node } from "../node"
import { freshenType } from "./freshenType"

export function refreshNode(
  typeVarCounters: Map<string, number>,
  node: Node,
): void {
  const occurredNames = new Map()

  for (const port of [...node.input, ...node.output]) {
    port.t = freshenType(typeVarCounters, port.t, occurredNames)
  }
}