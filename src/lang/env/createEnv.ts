import { Env } from "../env"
import { Mod } from "../mod"

export function createEnv(mod: Mod): Env {
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
