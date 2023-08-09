import { Checking } from "./Checking"

export function createChecking(): Checking {
  return {
    substitution: new Map(),
  }
}
