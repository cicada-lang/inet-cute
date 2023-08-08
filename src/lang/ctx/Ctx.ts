import { SignedType, Type } from "../type"
import { Value } from "../value"

export type Ctx = {
  stack: Array<Value>
  locals: Map<string, Value>
  neutralSignedTypes: Map<string, SignedType>
  substitution: Map<string, Type>
  typeVarCounters: Map<string, number>
}
