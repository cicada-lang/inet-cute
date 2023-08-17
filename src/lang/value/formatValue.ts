import { formatNode } from "../node/formatNode"
import { Value } from "./Value"

export function formatValue(value: Value): string {
  switch (value["@kind"]) {
    case "Port": {
      if (value.isPrincipal) {
        return `(${formatNode(value.node)})-${value.name}!`
      } else {
        return `(${formatNode(value.node)})-${value.name}`
      }
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
        const args = [...value.args].reverse().map(formatValue).join(" ")
        return `${args} ${value.name}`
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
