import { Node } from "../node"
import { NodeEntry } from "./Net"

export function createNodeFromNodeEntry(nodeEntry: NodeEntry): Node {
  return {
    "@type": "Value",
    "@kind": "Node",
    id: nodeEntry.id,
    name: nodeEntry.name,
    url: nodeEntry.url,
  }
}
