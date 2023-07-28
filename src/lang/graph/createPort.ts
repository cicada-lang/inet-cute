import { Node, Port } from "../graph"

export function createPort(node: Node, index: number): Port {
  const t = node.types[index]

  return {
    node,
    index,
    t,
    isPrincipal: t.isPrincipal(),
  }
}
