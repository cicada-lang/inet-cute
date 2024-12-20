import { type Checking } from "../checking/index.ts"
import { connect } from "../connect/connect.ts"
import { type Env } from "../env/index.ts"
import { appendReport } from "../errors/appendReport.ts"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail.ts"
import { type Mod } from "../mod/index.ts"
import { disconnectPort } from "../net/disconnectPort.ts"
import { findPortEntry } from "../net/findPortEntry.ts"
import { createNodeFromDefinition } from "../node/createNodeFromDefinition.ts"
import { type Node } from "../node/index.ts"
import { unifyTypes } from "../unify/unifyTypes.ts"
import { formatWord } from "../word/formatWord.ts"
import { type Word } from "../word/index.ts"
import { composeDefinition } from "./composeDefinition.ts"
import { findCurrentPortOrFail } from "./findCurrentPortOrFail.ts"

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

        disconnectPort(env.net, portEntry.connection.port)

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

        disconnectPort(env.net, portEntry.connection.port)

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

        connect(env.net, value, currentPort)
        if (options.checking) {
          unifyTypes(options.checking.substitution, value.t, currentPort.t)
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
