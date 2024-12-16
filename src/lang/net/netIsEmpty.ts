import { type Net } from "./Net.ts"

export function netIsEmpty(net: Net): boolean {
  return net.activeEdges.length === 0 && net.nodeEntries.size === 0
}
