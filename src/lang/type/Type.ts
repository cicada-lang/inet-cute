export type Type = TypeTerm | TypeVar

export type TypeVar = {
  kind: "TypeVar"
  name: string
}

export type TypeTerm = {
  kind: "TypeTerm"
  name: string
  args: Array<Type>
}
