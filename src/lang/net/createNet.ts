import { Mod } from "../mod"
import { Net } from "../net"

export function createNet(mod: Mod): Net {
  return {
    mod,
    nodes: [],
    edges: [],
    activeEdges: [],
    ports: [],
    locals: new Map(),
    wires: [],
  }
}
