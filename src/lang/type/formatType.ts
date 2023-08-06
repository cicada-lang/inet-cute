import { Type } from "./Type"

export function formatType(t: Type): string {
  switch (t.kind) {
    case "TypeTerm": {
      if (t.args.length === 0) {
        return `${t.name}`
      } else {
        const args = t.args.map(formatType).join(", ")
        return `${t.name}(${args})`
      }
    }

    case "TypeVar": {
      return `'${t.name}`
    }
  }
}
