import { Word } from "./Word"

export function formatWord(word: Word): string {
  switch (word["@kind"]) {
    case "Call": {
      return word.name
    }

    case "LiteralNode": {
      return `(${word.name})`
    }

    case "Builtin": {
      return `@${word.name}`
    }

    case "Local": {
      return `$${word.name}`
    }

    case "PortPush": {
      return `(${word.nodeName})-${word.portName}`
    }

    case "PortReconnect": {
      return `${word.portName}-(${word.nodeName})`
    }

    case "GenerateSymbol": {
      return `'${word.name}`
    }

    case "Label": {
      if (word.isImportant) {
        return `:${word.label}!`
      } else {
        return `:${word.label}`
      }
    }
  }
}
