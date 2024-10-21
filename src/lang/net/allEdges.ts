import { type Edge } from "../edge/index.js"
import { nodeKey } from "../node/nodeKey.js"
import { type Port } from "../port/index.js"
import { type Net } from "./Net.js"
import { createNodeFromNodeEntry } from "./createNodeFromNodeEntry.js"
import { createPortFromPortEntry } from "./createPortFromPortEntry.js"

export function allEdges(net: Net): Array<Edge> {
  const edges: Array<Edge> = []
  const occurred: Set<string> = new Set()

  for (const nodeEntry of net.nodeEntries.values()) {
    const node = createNodeFromNodeEntry(nodeEntry)

    for (const portEntry of Object.values(nodeEntry.ports)) {
      if (portEntry.connection) {
        const second = portEntry.connection.port
        const first: Port = createPortFromPortEntry(node, portEntry)

        const firstOccur = `${nodeKey(node)}-${portEntry.name}`
        const secondOccur = `${nodeKey(second.node)}-${second.name}`

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
