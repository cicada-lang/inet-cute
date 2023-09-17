import { Net } from "../net"
import { findHalfEdgeEntry } from "../net/findHalfEdgeEntry"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { findPortEntry } from "../net/findPortEntry"
import { Node } from "../node"
import { Port } from "../port"
import { ComposeOptions } from "./compose"

export function findCurrentPortOrFail(
  net: Net,
  nodeName: string,
  portName: string,
  options?: ComposeOptions,
): Port {
  const who = "findCurrentPortOrFail"

  const { current } = options || {}

  if (current === undefined) {
    throw new Error(
      [
        `[${who}] I expect current first and second nodes in ComposeOptions.`,
        ``,
        `  port name: ${portName}`,
        `  node name: ${nodeName}`,
      ].join("\n"),
    )
  }

  const found = findPortInNodes(net, nodeName, portName, [
    current.first,
    current.second,
  ])

  if (found === undefined) {
    throw new Error(
      [
        `[${who}] I can not find port in node.`,
        ``,
        `  node name: ${nodeName}`,
        `  port name: ${portName}`,
      ].join("\n"),
    )
  }

  return found
}

function findPortInNodes(
  net: Net,
  nodeName: string,
  portName: string,
  nodes: Array<Node>,
): Port | undefined {
  for (const node of nodes) {
    if (nodeName === node.name) {
      return findPortInNode(net, portName, node)
    }
  }
}

function findPortInNode(
  net: Net,
  portName: string,
  node: Node,
): Port | undefined {
  for (const port of findInputPorts(net, node)) {
    if (port.name === portName) {
      return findCorrespondingPort(net, port)
    }
  }

  for (const port of findOutputPorts(net, node)) {
    if (port.name === portName) {
      return findCorrespondingPort(net, port)
    }
  }
}

function findCorrespondingPort(net: Net, port: Port): Port | undefined {
  const portEntry = findPortEntry(net, port)

  if (portEntry === undefined) return
  if (portEntry.connection === undefined) return

  const halfEdge = portEntry.connection.halfEdge
  const halfEdgeEntry = findHalfEdgeEntry(net, halfEdge)

  if (halfEdgeEntry === undefined) return

  const ohterHalfEdgeEntry = findHalfEdgeEntry(net, halfEdgeEntry.otherHalfEdge)

  if (ohterHalfEdgeEntry === undefined) return

  return ohterHalfEdgeEntry.port
}
