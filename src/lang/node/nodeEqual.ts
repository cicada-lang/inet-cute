import { type Node } from "./Node.ts"

export function nodeEqual(x: Node, y: Node): boolean {
  return x.name === y.name && x.id === y.id
}
