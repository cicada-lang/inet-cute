import { InternalError } from "../errors"
import { Node } from "../graph"
import { Net } from "./Net"

export function netReleaseFreePorts(net: Net, closer: Node | undefined): void {
  if (closer === undefined) return

  for (const port of closer.input.reverse()) {
    if (port === undefined) return

    if (port.connection === undefined) {
      throw new InternalError("I expect port to have connection.")
    }

    net.portStack.push(port.connection.port)
    net.removeEdge(port.connection.edge)
  }

  net.removeNode(closer)
}
