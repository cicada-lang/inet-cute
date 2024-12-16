import { stringToSubscript } from "../../utils/stringToSubscript.ts"
import { type Value } from "../value/index.ts"

export function freshenType(
  typeVarCounters: Map<string, number>,
  t: Value,
  occurredNames: Map<string, string>,
): Value {
  switch (t["@kind"]) {
    case "Symbol": {
      const foundName = occurredNames.get(t.name)
      if (foundName === undefined) {
        const subscript = tickSymbolCounter(typeVarCounters, t.name)
        const newName = t.name + stringToSubscript(subscript.toString())
        occurredNames.set(t.name, newName)
        return {
          "@type": "Value",
          "@kind": "Symbol",
          name: newName,
        }
      } else {
        return {
          "@type": "Value",
          "@kind": "Symbol",
          name: foundName,
        }
      }
    }

    case "TypeTerm": {
      return {
        "@type": "Value",
        "@kind": "TypeTerm",
        name: t.name,
        args: t.args.map((arg) =>
          freshenType(typeVarCounters, arg, occurredNames),
        ),
      }
    }

    default: {
      // TODO Maybe we need to handle other values.
      return t
    }
  }
}

export function tickSymbolCounter(
  typeVarCounters: Map<string, number>,
  name: string,
): number {
  const foundCounter = typeVarCounters.get(name)
  if (foundCounter === undefined) {
    typeVarCounters.set(name, 0)
    return 0
  } else {
    typeVarCounters.set(name, foundCounter + 1)
    return foundCounter + 1
  }
}
