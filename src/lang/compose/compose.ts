import { Checking } from "../checking"
import { connectPorts } from "../connect/connectPorts"
import { Env } from "../env"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail"
import { disconnectPort } from "../net/disconnectPort"
import { findPortEntry } from "../net/findPortEntry"
import { Node } from "../node"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition"
import { unifyTypes } from "../unify/unifyTypes"
import { Word } from "../word"
import { formatWord } from "../word/formatWord"
import { composeDefinition } from "./composeDefinition"
import { findCurrentPortOrFail } from "./findCurrentPortOrFail"

export interface ComposeOptions {
  current?: { first: Node; second: Node }
  checking?: Checking
}

export function compose(
  mod: Mod,
  env: Env,
  word: Word,
  options: ComposeOptions,
): null {
  try {
    switch (word["@kind"]) {
      case "Call": {
        const found = env.locals.get(word.name)
        if (found !== undefined) {
          env.stack.push(found)
          env.locals.delete(word.name)
          return null
        } else {
          const definition = findDefinitionOrFail(mod, word.name)
          composeDefinition(env, definition, options)
          return null
        }
      }

      case "LiteralNode": {
        const definition = findDefinitionOrFail(mod, word.name)
        const node = createNodeFromDefinition(env.net, definition)
        env.stack.push(node)
        return null
      }

      case "Builtin": {
        const definition = mod.builtins.get(word.name)
        if (definition === undefined) {
          throw new Error(
            [
              `[compose / Builtin] I meet undefined builtin.`,
              ``,
              `  name: ${word.name}`,
            ].join("\n"),
          )
        }

        composeDefinition(env, definition, options)
        return null
      }

      case "Local": {
        const port = env.stack.pop()
        if (port === undefined) {
          throw new Error(
            `[compose / Local] expect a port on the top of the stack.`,
          )
        }

        env.locals.set(word.name, port)
        return null
      }

      case "PortPush": {
        const currentPort = findCurrentPortOrFail(
          env.net,
          word.nodeName,
          word.portName,
          options,
        )

        const portEntry = findPortEntry(env.net, currentPort)

        if (portEntry?.connection === undefined) {
          throw new Error(
            [
              `[compose / PortPush] I expect the found port to have connection.`,
              ``,
              `  node name: ${word.nodeName}`,
              `  port name: ${word.portName}`,
            ].join("\n"),
          )
        }

        disconnectPort(env.net, currentPort)

        env.stack.push(currentPort)
        return null
      }

      case "PortReconnect": {
        const currentPort = findCurrentPortOrFail(
          env.net,
          word.nodeName,
          word.portName,
          options,
        )

        const portEntry = findPortEntry(env.net, currentPort)

        if (portEntry?.connection === undefined) {
          throw new Error(
            [
              `[compose / PortReconnect] I expect the found port to have connection.`,
              ``,
              `  node name: ${word.nodeName}`,
              `  port name: ${word.portName}`,
            ].join("\n"),
          )
        }

        disconnectPort(env.net, currentPort)

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

        connectPorts(env.net, value, currentPort)
        if (options.checking) {
          unifyTypes(env, options.checking.substitution, value.t, currentPort.t)
        }

        return null
      }

      case "GenerateSymbol": {
        env.stack.push({
          "@type": "Value",
          "@kind": "Symbol",
          name: word.name,
        })

        return null
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

        return null
      }
    }
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[compose] I fail compose word.`,
        ``,
        `  word: ${formatWord(word)}`,
      ].join("\n"),
      context: {
        span: word.span,
        text: mod.text,
      },
    })
  }
}
