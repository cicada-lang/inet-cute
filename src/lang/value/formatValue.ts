import { Value } from "./Value"

export function formatValue(value: Value): string {
  switch (value["@kind"]) {
    case "Port": {
      return `(${value.node.name})-${value.name}`
    }

    case "Type": {
      return "Type"
    }

    case "TypeVar": {
      return `'${value.name}`
    }

    case "TypeTerm": {
      if (value.args.length === 0) {
        return `${value.name}`
      } else {
        const args = value.args.map(formatValue).join(", ")
        return `${value.name}(${args})`
      }
    }

    case "Labeled": {
      if (value.isImportant) {
        return `${formatValue(value.value)} :${value.label}`
      } else {
        return `${formatValue(value.value)} :${value.label}!`
      }
    }
  }
}
