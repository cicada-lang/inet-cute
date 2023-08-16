import { Node } from "../node"
import { Net } from "./Net"
import { findPortRecord } from "./findPortRecord"

export function hasNode(net: Net, node: Node): boolean {
  return Boolean(findPortRecord(net, node))
}
