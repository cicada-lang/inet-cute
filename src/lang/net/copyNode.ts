import { Node } from "../node"
import { Net } from "./Net"
import { findPortRecordOrFail } from "./findPortRecordOrFail"

export function copyNode(source: Net, target: Net, node: Node): void {
  const portRecord = findPortRecordOrFail(source, node)
  // clonePortRecord(portRecord)
}
