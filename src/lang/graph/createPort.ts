import { Port } from "../graph"
import { Node } from "../node"
import { Type } from "../type"

export function createPort(
  node: Node,
  name: string,
  t: Type,
  isPrincipal: boolean,
): Port {
  return {
    node,
    name,
    t,
    isPrincipal,
  }
}
