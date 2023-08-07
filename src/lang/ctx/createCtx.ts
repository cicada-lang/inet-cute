import { Ctx } from "./Ctx"

export function createCtx(): Ctx {
  return {
    stack: [],
    locals: new Map(),
    neutralSignedTypes: new Map(),
    substitution: new Map(),
    patternVarCounters: new Map(),
  }
}
