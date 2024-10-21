import { type Net } from "./Net.js"

export function createNet(): Net {
  return {
    activeEdges: [],
    nodeEntries: new Map(),
  }
}
