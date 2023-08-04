import { Type } from "../type"

export type Sign = 1 | 0 | -1

export type SignedType = {
  id?: string
  t: Type
  sign: Sign
}
