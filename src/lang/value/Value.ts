import { Port } from "../port"

export type Value = Port | Type | TypeVar | TypeTerm | Labeled

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

export type Labeled = {
  "@type": "Value"
  "@kind": "Labeled"
  value: Value
  label: string
}
