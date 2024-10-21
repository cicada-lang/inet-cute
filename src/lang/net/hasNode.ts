import { type Node } from "../node/index.js"
import { type Net } from "./Net.js"
import { findPortRecord } from "./findPortRecord.js"

export function hasNode(net: Net, node: Node): boolean {
  return Boolean(findPortRecord(net, node))
}
