import { Value } from "./Value"

export function formatValue(value: Value): string {
  switch (value["@kind"]) {
    case "Port": {
      return `(${value.node.name})-${value.name}`
    }

    case "Type": {
      return "Type"
    }

    case "SignedType": {
      switch (value.sign) {
        case 1: {
          return `+${formatValue(value.t)}`
        }

        case 0: {
          return `±${formatValue(value.t)}`
        }

        case -1: {
          return `-${formatValue(value.t)}`
        }
      }
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
  }
}
