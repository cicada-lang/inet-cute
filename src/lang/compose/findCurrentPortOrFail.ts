import { Net } from "../net"
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
  for (const port of node.input) {
    if (port.name === portName) {
      const portEntry = findPortEntry(net, port)
      return portEntry?.connection?.port
    }
  }

  for (const port of node.output) {
    if (port.name === portName) {
      const portEntry = findPortEntry(net, port)
      return portEntry?.connection?.port
    }
  }
}
