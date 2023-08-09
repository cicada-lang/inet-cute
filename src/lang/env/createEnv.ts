import { Env } from "../env"
import { Mod } from "../mod"

export function createEnv(mod: Mod): Env {
  return {
    mod,
    edges: [],
    activeEdges: [],
    stack: [],
    locals: new Map(),
    wires: [],
  }
}
