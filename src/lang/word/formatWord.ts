import { Word } from "./Word"

export function formatWord(word: Word): string {
  switch (word.kind) {
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
  }
}
