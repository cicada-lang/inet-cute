import { Port } from "../port"
import { Edge } from "../edge"

export function createEdge(start: Port, end: Port): Edge {
  const edge = { start, end }

  start.connection = { edge, port: end }
  end.connection = { edge, port: start }

  return edge
}
