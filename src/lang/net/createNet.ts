import { type Net } from "./Net.ts"

export function createNet(): Net {
  return {
    activeEdges: [],
    nodeEntries: new Map(),
  }
}
