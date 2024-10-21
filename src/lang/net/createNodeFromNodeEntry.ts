import { type Node } from "../node/index.js"
import { type NodeEntry } from "./Net.js"

export function createNodeFromNodeEntry(nodeEntry: NodeEntry): Node {
  return {
    "@type": "Value",
    "@kind": "Node",
    id: nodeEntry.id,
    name: nodeEntry.name,
    url: nodeEntry.url,
  }
}
