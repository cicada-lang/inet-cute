export type Type = TypeTerm | TypeVar

export type TypeVar = {
  kind: "TypeVar"
  name: string
}

export function TypeVar(name: string): TypeVar {
  return {
    kind: "TypeVar",
    name,
  }
}

export type TypeTerm = {
  kind: "TypeTerm"
  name: string
  args: Array<Type>
}

export function TypeTerm(name: string, args: Array<Type>): TypeTerm {
  return {
    kind: "TypeTerm",
    name,
    args,
  }
}
