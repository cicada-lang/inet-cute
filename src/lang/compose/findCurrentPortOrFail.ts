import { Node } from "../node"
import { Port, PortConnection } from "../port"
import { ComposeOptions } from "./compose"

export function findCurrentPortOrFail(
  nodeName: string,
  portName: string,
  options?: ComposeOptions,
): Port & { connection: PortConnection } {
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

  const found = findPortInNodes(nodeName, portName, [
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

  if (found.connection === undefined) {
    throw new Error(
      [
        `[${who}] I expect the found port to have connection.`,
        ``,
        `  node name: ${nodeName}`,
        `  port name: ${portName}`,
      ].join("\n"),
    )
  }

  return found as Port & { connection: PortConnection }
}

function findPortInNodes(
  nodeName: string,
  portName: string,
  nodes: Array<Node>,
): Port | undefined {
  for (const node of nodes) {
    if (nodeName === node.name) {
      return findPortInNode(portName, node)
    }
  }
}

function findPortInNode(portName: string, node: Node): Port | undefined {
  for (const port of node.input) {
    if (port.name === portName) {
      return port.connection?.port
    }
  }

  for (const port of node.output) {
    if (port.name === portName) {
      return port.connection?.port
    }
  }
}
