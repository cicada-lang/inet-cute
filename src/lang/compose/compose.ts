import { Node } from "../graph"
import { findPortInNodes } from "../graph/findPortInActiveEdge"
import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Net } from "../net"
import { connect } from "../net/connect"
import { disconnect } from "../net/disconnect"
import { Word } from "../word"

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
        lookupDefinitionOrFail(mod, word.name).compose(net)
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
      const { current } = options || {}

      if (current === undefined) {
        throw new Error(`[PortPush.compose] expect current activeEdge`)
      }

      const found = findPortInNodes(word.nodeName, word.portName, [
        current.start,
        current.end,
      ])

      if (found === undefined) {
        throw new Error(
          `[PortPush.compose] can not find port: ${word.portName} in active edge`,
        )
      }

      if (found.connection === undefined) {
        throw new Error(
          `[PortPush.compose] I expect the found port to have connection`,
        )
      }

      disconnect(net, found.connection.edge)

      net.ports.push(found)

      return
    }

    case "PortReconnect": {
      const { current } = options || {}

      if (current === undefined) {
        throw new Error(`[PortReconnect.compose] expect current activeEdge`)
      }

      const found = findPortInNodes(word.nodeName, word.portName, [
        current.start,
        current.end,
      ])

      if (found === undefined) {
        throw new Error(
          `[PortReconnect.compose] can not find port: ${word.portName} in active edge`,
        )
      }

      if (found.connection === undefined) {
        throw new Error(
          `[PortReconnect.compose] I expect the found port to have connection`,
        )
      }

      disconnect(net, found.connection.edge)

      const topPort = net.ports.pop()

      if (topPort === undefined) {
        throw new Error(`[PortReconnect.compose] expect top port`)
      }

      connect(net, topPort, found)

      return
    }
  }
}
