import { type Net } from "./Net.js"

export function netIsEmpty(net: Net): boolean {
  return net.activeEdges.length === 0 && net.nodeEntries.size === 0
}
