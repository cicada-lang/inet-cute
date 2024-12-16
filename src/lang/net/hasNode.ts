import { type Node } from "../node/index.ts"
import { type Net } from "./Net.ts"
import { findPortRecord } from "./findPortRecord.ts"

export function hasNode(net: Net, node: Node): boolean {
  return Boolean(findPortRecord(net, node))
}
