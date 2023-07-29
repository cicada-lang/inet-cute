import { Node, Port } from "../graph"
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
