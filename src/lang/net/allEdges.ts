import { Edge } from "../edge"
import { nodeKeyId } from "../node/nodeKeyId"
import { Port } from "../port"
import { Net } from "./Net"

export function allEdges(net: Net): Array<Edge> {
  const edges: Array<Edge> = []
  const occurred: Set<string> = new Set()

  for (const nodeEntry of net.nodeEntries.values()) {
    const node = {
      id: nodeEntry.id,
      name: nodeEntry.name,
      url: nodeEntry.url,
    }

    for (const portEntry of Object.values(nodeEntry.ports)) {
      if (portEntry.connection) {
        const second = portEntry.connection.port
        const first: Port = {
          "@type": "Value",
          "@kind": "Port",
          node,
          name: portEntry.name,
          sign: portEntry.sign,
          t: portEntry.t,
          isPrincipal: portEntry.isPrincipal,
        }

        const firstOccur = `${nodeKeyId(node)}-${portEntry.name}`
        const secondOccur = `${nodeKeyId(second.node)}-${second.name}`

        if (
          !occurred.has(firstOccur + secondOccur) &&
          !occurred.has(secondOccur + firstOccur)
        ) {
          occurred.add(firstOccur + secondOccur)
          occurred.add(secondOccur + firstOccur)
          edges.push({ first, second })
        }
      }
    }
  }

  return edges
}
