import { Ctx } from "./Ctx"

export function createCtx(): Ctx {
  return {
    signedTypes: [],
    localSignedTypes: new Map(),
    neutralSignedTypes: new Map(),
    substitution: new Map(),
    variableCounters: new Map(),
  }
}
