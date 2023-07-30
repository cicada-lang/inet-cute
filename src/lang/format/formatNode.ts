import { Node } from "../graph"

export function formatNode(node: Node): string {
  const subscript = [...node.id.toString()]
    .map((c) => numberSubscripts[c] || c)
    .join("")

  return `${node.name}${subscript}`
}

const numberSubscripts: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
}
