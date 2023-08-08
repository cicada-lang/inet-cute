export type Type = TypeTerm | TypeVar

export type TypeVar = {
  "@type": "Type"
  "@kind": "TypeVar"
  name: string
}

export type TypeTerm = {
  "@type": "Type"
  "@kind": "TypeTerm"
  name: string
  args: Array<Type>
}
