import { Port } from "../port"

export type Value = Port | Type

export type Type = {
  "@type": "Value"
  "@kind": "Type"
}
