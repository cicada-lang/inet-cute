import { formatEdge } from "../edge/formatEdge.js"
import { type Net } from "./Net.js"
import { allEdges } from "./allEdges.js"

export function formatNet(net: Net): string {
  return allEdges(net).map(formatEdge).join("\n")
}
