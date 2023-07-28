import { InternalError } from "../errors"
import { Node } from "../graph"
import { Net } from "./Net"
import { netRemoveEdge } from "./netRemoveEdge"
import { netRemoveNode } from "./netRemoveNode"

export function netReleaseFreePorts(net: Net, closer: Node | undefined): void {
  if (closer === undefined) return

  for (const port of closer.input.reverse()) {
    if (port === undefined) return

    if (port.connection === undefined) {
      throw new InternalError("I expect port to have connection.")
    }

    net.portStack.push(port.connection.port)
    netRemoveEdge(net, port.connection.edge)
  }

  netRemoveNode(net, closer)
}
