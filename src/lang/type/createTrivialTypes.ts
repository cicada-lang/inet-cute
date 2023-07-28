import { Type } from "./Type"

export function createTrivialTypes(arity: number): Array<Type> {
  return Array(arity).fill({})
}
