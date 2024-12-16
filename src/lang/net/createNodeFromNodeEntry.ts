import { type Node } from "../node/index.ts"
import { type NodeEntry } from "./Net.ts"

export function createNodeFromNodeEntry(nodeEntry: NodeEntry): Node {
  return {
    "@type": "Value",
    "@kind": "Node",
    id: nodeEntry.id,
    name: nodeEntry.name,
    url: nodeEntry.url,
  }
}
