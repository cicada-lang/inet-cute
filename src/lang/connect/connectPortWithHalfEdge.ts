import { edgeEqual } from "../edge"
import { HalfEdge } from "../half-edge"
import { Net } from "../net"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findPortRecordOrFail } from "../net/findPortRecordOrFail"
import { Port } from "../port"

export function connectPortWithHalfEdge(
  net: Net,
  port: Port,
  halfEdge: HalfEdge,
): void {
  const portRecord = findPortRecordOrFail(net, port.node)
  portRecord[port.name].connection = { halfEdge }

  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  if (halfEdgeEntry.port !== undefined) {
    throw new Error(
      `[connectPortWithHalfEdge] halfEdgeEntry is already connected`,
    )
  }

  halfEdgeEntry.port = port

  const otherHalfEdgeEntry = findHalfEdgeEntryOrFail(
    net,
    halfEdgeEntry.otherHalfEdge,
  )

  if (otherHalfEdgeEntry.port !== undefined) {
    if (port.isPrincipal && otherHalfEdgeEntry.port.isPrincipal) {
      const edge = {
        first: port,
        second: otherHalfEdgeEntry.port,
      }

      if (!net.activeEdges.find((activeEdge) => edgeEqual(activeEdge, edge))) {
        net.activeEdges.push(edge)
      }
    }
  }
}
