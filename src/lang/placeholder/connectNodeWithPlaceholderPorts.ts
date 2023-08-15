import { connect } from "../connect/connect"
import { Mod } from "../mod"
import { Net } from "../net"
import { nodeInputPorts } from "../net/nodeInputPorts"
import { nodeOutputPorts } from "../net/nodeOutputPorts"
import { Node } from "../node"
import { addPlaceholderInputPortForPort } from "./addPlaceholderInputPortForPort"
import { addPlaceholderOutputPortForPort } from "./addPlaceholderOutputPortForPort"

export function connectNodeWithPlaceholderPorts(
  mod: Mod,
  net: Net,
  node: Node,
): void {
  for (const port of nodeInputPorts(net, node)) {
    if (!port.isPrincipal) {
      const placeholderPort = addPlaceholderOutputPortForPort(net, mod, port)
      connect(net, port, placeholderPort)
    }
  }

  for (const port of nodeOutputPorts(net, node)) {
    if (!port.isPrincipal) {
      const placeholderPort = addPlaceholderInputPortForPort(net, mod, port)
      connect(net, port, placeholderPort)
    }
  }
}
