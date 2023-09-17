import { HalfEdge } from "../half-edge"
import { Mod } from "../mod"
import { Net } from "../net"

export function addEdge(
  net: Net,
  mod: Mod,
): { first: HalfEdge; second: HalfEdge } {
  const first = { id: "" }
  const second = { id: "" }
  return { first, second }
}
