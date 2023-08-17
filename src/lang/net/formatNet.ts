import { formatEdge } from "../edge/formatEdge"
import { Net } from "./Net"
import { allEdges } from "./allEdges"

export function formatNet(net: Net): string {
  return allEdges(net).map(formatEdge).join("\n")
}
