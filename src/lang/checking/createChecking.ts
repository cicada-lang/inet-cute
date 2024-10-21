import { type Checking } from "./Checking.js"

export function createChecking(): Checking {
  return {
    substitution: new Map(),
    typeVarCounters: new Map(),
  }
}
