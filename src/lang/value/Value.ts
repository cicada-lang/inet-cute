import { Port } from "../port"
import { SignedType } from "../type"

export type Value = Port | Type | SignedType

export type Type = {
  "@type": "Value"
  "@kind": "Type"
}
