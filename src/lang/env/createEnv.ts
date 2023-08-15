import { Env } from "../env"
import { Mod } from "../mod"

export function createEnv(mod: Mod): Env {
  const net = {
    edges: [],
    activeEdges: [],
  }

  return {
    mod,
    net,
    stack: [],
    locals: new Map(),
  }
}
