import { Node } from "./Node"

export function nodeEqual(x: Node, y: Node): boolean {
  return x.name === y.name && x.id === y.id
}
