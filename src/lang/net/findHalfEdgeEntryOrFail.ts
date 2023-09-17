import { HalfEdge } from "../half-edge"
import { HalfEdgeEntry, Net } from "./Net"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry"

export function findHalfEdgeEntryOrFail(
  net: Net,
  halfEdge: HalfEdge,
): HalfEdgeEntry {
  const halfEdgeEntry = findHalfEdgeEntry(net, halfEdge)
  if (halfEdgeEntry === undefined) {
    throw new Error(`[findHalfEdgeEntryOrFail] Undefined halfEdgeEntry`)
  }

  return halfEdgeEntry
}
