import { Edge } from "../edge"
import { Node } from "../node"
import { Type } from "../type"
import { Port } from "../port"

export function createPort(node: Node, index: number): Port {
  const t = node.types[index]

  return {
    node,
    index,
    t,
    isPrincipal: t.isPrincipal(),
  }
}
