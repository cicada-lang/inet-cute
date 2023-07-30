import { Net, Node } from "."

export function removeNode(net: Net, node: Node): void {
  const index = net.nodes.indexOf(node)
  if (index !== -1) {
    net.nodes.splice(index, 1)
  }
}
