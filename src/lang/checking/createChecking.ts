import { type Checking } from "./Checking.ts"

export function createChecking(): Checking {
  return {
    substitution: new Map(),
    typeVarCounters: new Map(),
  }
}
