import { SignedType, Type } from "../type"

export type Ctx = {
  stack: Array<SignedType>
  localSignedTypes: Map<string, SignedType>
  neutralSignedTypes: Map<string, SignedType>
  substitution: Map<string, Type>
  patternVarCounters: Map<string, number>
}
