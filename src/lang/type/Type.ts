export type Type = TypeTerm | PatternVar

export type PatternVar = {
  kind: "PatternVar"
  name: string
}

export function PatternVar(name: string): PatternVar {
  return {
    kind: "PatternVar",
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
