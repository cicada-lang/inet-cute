import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net } from "./Net"
import { clonePortRecord } from "./clonePortRecord"
import { findPortRecordOrFail } from "./findPortRecordOrFail"

export function copyNode(source: Net, target: Net, node: Node): void {
  const portRecord = findPortRecordOrFail(source, node)
  target.nodePortRecords.set(nodeKeyId(node), clonePortRecord(portRecord))
}
