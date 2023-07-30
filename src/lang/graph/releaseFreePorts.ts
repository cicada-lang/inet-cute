import { InternalError } from "../errors"
import { Net } from "./Net"
import { Node } from "./Node"
import { disconnect } from "./disconnect"
import { removeNode } from "./removeNode"

export function releaseFreePorts(net: Net, closer: Node | undefined): void {
  if (closer === undefined) {
    return
  }

  for (const port of closer.input) {
    if (port === undefined) {
      return
    }

    if (port.connection === undefined) {
      throw new InternalError(
        `[releaseFreePorts] I expect port to have connection.`,
      )
    }

    net.portStack.push(port.connection.port)

    disconnect(net, port.connection.edge)
  }

  removeNode(net, closer)
}
