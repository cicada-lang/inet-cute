import { Mod } from "../mod"
import { Net } from "../net"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node } from "../node"
import { capInputPort } from "./capInputPort"
import { capOutputPort } from "./capOutputPort"

export function capNode(mod: Mod, net: Net, node: Node): void {
  for (const port of findInputPorts(net, node)) {
    if (!port.isPrincipal) {
      capInputPort(mod, net, port)
    }
  }

  for (const port of findOutputPorts(net, node)) {
    if (!port.isPrincipal) {
      capOutputPort(mod, net, port)
    }
  }
}
