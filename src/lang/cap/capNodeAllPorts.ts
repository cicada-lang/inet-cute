import { Mod } from "../mod"
import { Net } from "../net"
import { findInputPorts } from "../net/findInputPorts"
import { findOutputPorts } from "../net/findOutputPorts"
import { Node } from "../node"
import { capInputPort } from "./capInputPort"
import { capOutputPort } from "./capOutputPort"

export function capNodeAllPorts(mod: Mod, net: Net, node: Node): void {
  for (const port of findInputPorts(net, node)) {
    capInputPort(mod, net, port)
  }

  for (const port of findOutputPorts(net, node)) {
    capOutputPort(mod, net, port)
  }
}
