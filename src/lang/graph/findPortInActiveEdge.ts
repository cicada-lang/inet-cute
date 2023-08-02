import { Node, Port } from "../graph"

export function findPortInNodes(
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
