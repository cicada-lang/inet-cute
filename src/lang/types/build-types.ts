import { Type } from "../type"
import { TypeBuilder } from "../types"

export function buildTypes(exps: Array<string>): Array<Type> {
  return new TypeBuilder(exps).build()
}
