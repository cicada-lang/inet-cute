import { Port } from "../port"

export type Value = Port | Type | TypeVar | TypeTerm

export type Type = {
  "@type": "Value"
  "@kind": "Type"
}

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
