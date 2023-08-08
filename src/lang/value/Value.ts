import { Port } from "../port"

export type Value = Port | SignedType | TypeVar | TypeTerm

// export type Type = {
//   "@type": "Value"
//   "@kind": "Type"
// }

export type TypeVar = {
  "@type": "Value"
  "@kind": "TypeVar"
  name: string
}

export type TypeTerm = {
  "@type": "Value"
  "@kind": "TypeTerm"
  name: string
  args: Array<Value>
}

export type Sign = 1 | 0 | -1

export type SignedType = {
  "@type": "Value"
  "@kind": "SignedType"
  id?: string
  t: Value
  sign: Sign
}
