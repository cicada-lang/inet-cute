import { Node } from "."
import { InternalError } from "../errors"
import { Net } from "./Net"
import { removeEdge } from "./removeEdge"
import { removeNode } from "./removeNode"

export function releaseFreePorts(net: Net, closer: Node | undefined): void {
  if (closer === undefined) return

  for (const port of closer.input.reverse()) {
    if (port === undefined) return

    if (port.connection === undefined) {
      throw new InternalError("I expect port to have connection.")
    }

    net.portStack.push(port.connection.port)
    removeEdge(net, port.connection.edge)
  }

  removeNode(net, closer)
}
