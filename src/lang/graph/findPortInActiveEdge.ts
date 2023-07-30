import { ActiveEdge, Node, Port } from "../graph"

export function findPortInActiveEdge(
  nodeName: string,
  portName: string,
  activeEdge: ActiveEdge,
): Port | undefined {
  if (nodeName === activeEdge.start.node.name) {
    return findPortInNode(portName, activeEdge.start.node)
  }

  if (nodeName === activeEdge.end.node.name) {
    return findPortInNode(portName, activeEdge.end.node)
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
