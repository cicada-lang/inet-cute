import { Env } from "../env"
import { Mod } from "../mod"

export function createEnv(mod: Mod): Env {
  return {
    mod,
    net: {
      edges: [],
      activeEdges: [],
      nodePortRecordMap: new Map(),
    },
    stack: [],
    locals: new Map(),
  }
}
