import { TypeBuilder } from "."
import { Type } from "../type"

export function buildTypes(exps: Array<string>): Array<Type> {
  return new TypeBuilder(exps).build()
}
