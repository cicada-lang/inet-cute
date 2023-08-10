import { Word } from "./Word"

export function formatWord(word: Word): string {
  switch (word["@kind"]) {
    case "Call": {
      return word.name
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

    case "TypeVar": {
      return `'${word.name}`
    }

    case "Label": {
      if (word.isImportant) {
        return `:${word.label}!`
      } else {
        return `:${word.label}`
      }
    }

    case "NodeRearrange": {
      const input = word.input.map((name) => `:${name}`).join("")
      const output = word.output.map((name) => `:${name}`).join("")

      let s = word.name

      if (input.length > 0) {
        s = `${input} ${s}`
      }

      if (output.length > 0) {
        s = `${s} ${output}`
      }

      return `(${s})`
    }
  }
}
