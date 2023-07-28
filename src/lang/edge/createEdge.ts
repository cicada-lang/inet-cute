import { Edge } from "../edge"
import { Port } from "../port"

export function createEdge(start: Port, end: Port): Edge {
  const edge = { start, end }

  start.connection = { edge, port: end }
  end.connection = { edge, port: start }

  return edge
}
