import { TypeBuilder } from "."
import { Type } from "../type"

export function buildTypes(words: Array<string>): Array<Type> {
  return new TypeBuilder(words).build()
}
