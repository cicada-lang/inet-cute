import { connect } from "../connect/connect"
import { Mod } from "../mod"
import { Net } from "../net"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node } from "../node"
import { addPlaceholderInputPortForPort } from "./addPlaceholderInputPortForPort"
import { addPlaceholderOutputPortForPort } from "./addPlaceholderOutputPortForPort"

export function connectNodeWithPlaceholderPorts(
  mod: Mod,
  net: Net,
  node: Node,
): void {
  for (const port of findInputPorts(net, node)) {
    if (!port.isPrincipal) {
      const placeholderPort = addPlaceholderOutputPortForPort(net, mod, port)
      connect(net, port, placeholderPort)
    }
  }

  for (const port of findOutputPorts(net, node)) {
    if (!port.isPrincipal) {
      const placeholderPort = addPlaceholderInputPortForPort(net, mod, port)
      connect(net, port, placeholderPort)
    }
  }
}
