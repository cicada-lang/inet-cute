import { Env } from "../env"
import { connect } from "../env/connect"
import { disconnect } from "../env/disconnect"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Node } from "../node"
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
  switch (word.kind) {
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

      const topPort = env.stack.pop()
      if (topPort === undefined) {
        throw new Error(`[compose / PortReconnect] I expect top port.`)
      }

      connect(env, topPort, currentPort)
      return
    }
  }
}
