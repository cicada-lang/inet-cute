import { Mod } from "../mod"
import { Net } from "../net"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node } from "../node"
import { connectCapInputPort } from "./connectCapInputPort"
import { connectCapOutputPort } from "./connectCapOutputPort"

export function connectCapPorts(mod: Mod, net: Net, node: Node): void {
  for (const port of findInputPorts(net, node)) {
    if (!port.isPrincipal) {
      connectCapOutputPort(mod, net, port)
    }
  }

  for (const port of findOutputPorts(net, node)) {
    if (!port.isPrincipal) {
      connectCapInputPort(mod, net, port)
    }
  }
}
