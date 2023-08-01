import { InternalError } from "../errors"
import { Node } from "../graph/Node"
import { Net } from "../net"
import { disconnect } from "../net/disconnect"
import { removeNode } from "../net/removeNode"

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

    net.ports.push(port.connection.port)

    disconnect(net, port.connection.edge)
  }

  removeNode(net, closer)
}
