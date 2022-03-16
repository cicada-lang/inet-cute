import { Type } from "../type"
import { TypeBuilder } from "../types"

export function buildTypes(words: Array<string>): Array<Type> {
  return new TypeBuilder(words).build()
}
