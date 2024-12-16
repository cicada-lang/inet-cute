import { type Mod } from "../mod/index.ts"
import { findInputPorts } from "../net/findInputPorts.ts"
import { findOutputPorts } from "../net/findOutputPorts.ts"
import { type Net } from "../net/index.ts"
import { type Node } from "../node/index.ts"
import { capInputPort } from "./capInputPort.ts"
import { capOutputPort } from "./capOutputPort.ts"

export function capNodeNonPrinciplePorts(mod: Mod, net: Net, node: Node): void {
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
