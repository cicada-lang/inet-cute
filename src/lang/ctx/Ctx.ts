import { SignedType, Value } from "../value"

export type Ctx = {
  stack: Array<Value>
  locals: Map<string, Value>
  neutralSignedTypes: Map<string, SignedType>
  substitution: Map<string, Value>
  typeVarCounters: Map<string, number>
}
