import { Node } from "../graph"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Net } from "../net"
import { connect } from "../net/connect"
import { disconnect } from "../net/disconnect"
import { Word } from "../word"
import { composeDefinition } from "./composeDefinition"
import { findCurrentPortOrFail } from "./findCurrentPortOrFail"

export interface ComposeOptions {
  current?: { start: Node; end: Node }
}

export function compose(
  mod: Mod,
  net: Net,
  word: Word,
  options: ComposeOptions,
): void {
  switch (word.kind) {
    case "Call": {
      const definition = lookupDefinitionOrFail(mod, word.name)
      composeDefinition(net, definition, options)
      return
    }

    case "Local": {
      const found = net.locals.get(word.name)
      if (found !== undefined) {
        net.ports.push(found)
        net.locals.delete(word.name)
        return
      } else {
        const port = net.ports.pop()
        if (port === undefined) {
          throw new Error(
            `[compose / Local] expect a port on the top of the stack.`,
          )
        }

        net.locals.set(word.name, port)
        return
      }
    }

    case "PortPush": {
      const currentPort = findCurrentPortOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      disconnect(net, currentPort.connection.edge)

      net.ports.push(currentPort)
      return
    }

    case "PortReconnect": {
      const currentPort = findCurrentPortOrFail(
        word.nodeName,
        word.portName,
        options,
      )

      disconnect(net, currentPort.connection.edge)

      const topPort = net.ports.pop()
      if (topPort === undefined) {
        throw new Error(`[compose / PortReconnect] I expect top port.`)
      }

      connect(net, topPort, currentPort)
      return
    }
  }
}
