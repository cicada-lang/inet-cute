import { Node } from "../node"
import { NodeEntry } from "./Net"

export function createNodeFromNodeEntry(nodeEntry: NodeEntry): Node {
  return {
    id: nodeEntry.id,
    name: nodeEntry.name,
    url: nodeEntry.url,
  }
}
