import { Net } from "../graph"
import { Mod } from "../mod"

export function createNet(mod: Mod): Net {
  return {
    mod,
    nodes: [],
    edges: [],
    actions: [],
    portStack: [],
    portStore: new Map(),
    wires: [],
  }
}