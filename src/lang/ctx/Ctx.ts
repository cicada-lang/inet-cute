import { Type } from "../type"

export type Sign = 1 | -1

export type SignedType = {
  t: Type
  sign: Sign
}

export type Ctx = {
  signedTypes: Array<SignedType>
  localSignedTypes: Map<string, SignedType>
}
