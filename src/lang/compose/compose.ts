import { Env } from "../env"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Node } from "../node"
import { connect } from "../utils/connect"
import { disconnect } from "../utils/disconnect"
import { Word } from "../word"
import { composeDefinition } from "./composeDefinition"
import { findCurrentPortOrFail } from "./findCurrentPortOrFail"

export interface ComposeOptions {
  current?: { start: Node; end: Node }
}

export function compose(
  mod: Mod,
  env: Env,
  word: Word,
  options: ComposeOptions,
): void {
  switch (word["@kind"]) {
    case "Call": {
      const found = env.locals.get(word.name)
      if (found !== undefined) {
        env.stack.push(found)
        env.locals.delete(word.name)
        return
      } else {
        const definition = lookupDefinitionOrFail(mod, word.name)
        composeDefinition(env, definition, options)
        return
      }
    }

    case "Local": {
      const port = env.stack.pop()
      if (port === undefined) {
        throw new Error(
          `[compose / Local] expect a port on the top of the stack.`,
        )
      }

      env.locals.set(word.name, port)
      return
    }

    case "PortPush": {
      const currentPort = findCurrentPortOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      disconnect(env, currentPort.connection.edge)

      env.stack.push(currentPort)
      return
    }

    case "PortReconnect": {
      const currentPort = findCurrentPortOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      disconnect(env, currentPort.connection.edge)

      const value = env.stack.pop()
      if (value === undefined) {
        throw new Error(
          `[compose / PortReconnect] I expect top value on the stack.`,
        )
      }

      if (value["@kind"] !== "Port") {
        throw new Error(
          [
            `[compose / PortReconnect] I expect the top value to be a Port.`,
            ``,
            `  value['@kind']: ${value["@kind"]}`,
          ].join("\n"),
        )
      }

      connect(env, value, currentPort)
      return
    }

    case "TypeVar": {
      env.stack.push({
        "@type": "Value",
        "@kind": "TypeVar",
        name: word.name,
      })

      return
    }

    case "Label": {
      const value = env.stack.pop()
      if (value === undefined) {
        throw new Error(`[compose / Label] I expect top value on the stack.`)
      }

      env.stack.push({
        "@type": "Value",
        "@kind": "Labeled",
        value,
        label: word.label,
        isImportant: word.isImportant,
      })

      return
    }
  }
}
