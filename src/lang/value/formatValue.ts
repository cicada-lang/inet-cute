import { Env } from "../env"
import { formatNode } from "../node/formatNode"
import { formatPort } from "../port/formatPort"
import { Value } from "./Value"

export function formatValue(env: Env, value: Value): string {
  switch (value["@kind"]) {
    case "Port": {
      return formatPort(env.net, value)
    }

    case "Node": {
      return `(${formatNode(env.net, value)})`
    }

    case "Type": {
      return "Type"
    }

    case "Symbol": {
      return `'${value.name}`
    }

    case "TypeTerm": {
      if (value.args.length === 0) {
        return `${value.name}`
      } else {
        const args = [...value.args]
          .reverse()
          .map((arg) => formatValue(env, arg))
          .join(" ")

        return `${args} ${value.name}`
      }
    }

    case "Labeled": {
      if (value.isImportant) {
        return `${formatValue(env, value.value)} :${value.label}`
      } else {
        return `${formatValue(env, value.value)} :${value.label}!`
      }
    }
  }
}
