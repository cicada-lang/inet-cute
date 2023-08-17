import { Mod } from "../mod"
import { Net } from "../net"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node } from "../node"
import { connectPlaceholderInputPort } from "./connectPlaceholderInputPort"
import { connectPlaceholderOutputPort } from "./connectPlaceholderOutputPort"

export function connectPlaceholderPorts(mod: Mod, net: Net, node: Node): void {
  for (const port of findInputPorts(net, node)) {
    if (!port.isPrincipal) {
      connectPlaceholderOutputPort(net, mod, port)
    }
  }

  for (const port of findOutputPorts(net, node)) {
    if (!port.isPrincipal) {
      connectPlaceholderInputPort(net, mod, port)
    }
  }
}
