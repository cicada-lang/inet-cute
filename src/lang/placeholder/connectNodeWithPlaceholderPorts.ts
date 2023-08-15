import { connect } from "../connect/connect"
import { Mod } from "../mod"
import { Net } from "../net"
import { Node } from "../node"
import { createPlaceholderInputPortForPort } from "./createPlaceholderInputPortForPort"
import { createPlaceholderOutputPortForPort } from "./createPlaceholderOutputPortForPort"

export function connectNodeWithPlaceholderPorts(
  mod: Mod,
  net: Net,
  node: Node,
): void {
  for (const port of node.input) {
    if (!port.isPrincipal) {
      const placeholderPort = createPlaceholderOutputPortForPort(mod, port)
      connect(net, port, placeholderPort)
    }
  }

  for (const port of node.output) {
    if (!port.isPrincipal) {
      const placeholderPort = createPlaceholderInputPortForPort(mod, port)
      connect(net, port, placeholderPort)
    }
  }
}
