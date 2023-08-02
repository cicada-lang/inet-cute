import { Node, Port, PortConnection } from "../graph"
import { findPortInNodes } from "../graph/findPortInActiveEdge"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Net } from "../net"
import { connect } from "../net/connect"
import { disconnect } from "../net/disconnect"
import { Word } from "../word"
import { composeDefinition } from "./composeDefinition"

export interface ComposeOptions {
  current?: { start: Node; end: Node }
}

export function compose(
  mod: Mod,
  net: Net,
  word: Word,
  options?: ComposeOptions,
): void {
  switch (word.kind) {
    case "Call": {
      const found = net.localPorts.get(word.name)
      if (found !== undefined) {
        net.ports.push(found)
        net.localPorts.delete(word.name)
        return
      } else {
        const definition = lookupDefinitionOrFail(mod, word.name)
        composeDefinition(net, definition)
        return
      }
    }

    case "LocalSet": {
      const port = net.ports.pop()
      if (port === undefined) {
        throw new Error(
          `[LocalSet.compose] expect a port on the top of the stack`,
        )
      }

      net.localPorts.set(word.name, port)
      return
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
        throw new Error(`[PortReconnect.compose] expect top port`)
      }

      connect(net, topPort, currentPort)
      return
    }
  }
}

function findCurrentPortOrFail(
  nodeName: string,
  portName: string,
  options?: ComposeOptions,
): Port & { connection: PortConnection } {
  const who = "findCurrentPortOrFail"

  const { current } = options || {}

  if (current === undefined) {
    throw new Error(`[${who}] I expect current start and end nodes`)
  }

  const found = findPortInNodes(nodeName, portName, [
    current.start,
    current.end,
  ])

  if (found === undefined) {
    throw new Error(`[${who}] I can not find port: ${portName} in nodes`)
  }

  if (found.connection === undefined) {
    throw new Error(`[${who}] I expect the found port to have connection`)
  }

  return found as Port & { connection: PortConnection }
}
