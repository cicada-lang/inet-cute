import { type Node } from "../node/index.js"
import { type Port } from "../port/index.js"

export type Value = Port | Node | Type | Symbol | TypeTerm | Labeled

export type Type = {
  "@type": "Value"
  "@kind": "Type"
}

export type Symbol = {
  "@type": "Value"
  "@kind": "Symbol"
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
  isImportant?: boolean
}
