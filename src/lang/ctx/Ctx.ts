import { Type } from "../type"

export type Sign = 1 | 0 | -1

export type SignedType = {
  id?: string
  t: Type
  sign: Sign
}

export type Ctx = {
  signedTypes: Array<SignedType>
  localSignedTypes: Map<string, SignedType>
  neutralSignedTypes: Map<string, SignedType>
  substitution: Map<string, Type>
  variableCounters: Map<string, number>
}
