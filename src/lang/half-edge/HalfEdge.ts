import { Port } from "../port"

export type HalfEdge = {
  id: string
  port: Port
  otherHalf: HalfEdge
}
