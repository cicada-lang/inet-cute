import { Net } from "../net"
import { formatNode } from "../node/formatNode"
import { Port } from "./Port"

export function formatPort(net: Net, port: Port): string {
  if (port.isPrincipal) {
    return `(${formatNode(port.node)})-${port.name}!`
  } else {
    return `(${formatNode(port.node)})-${port.name}`
  }
}
