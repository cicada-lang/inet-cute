import { type Mod } from "../mod/index.js"
import { findInputPorts } from "../net/findInputPorts.js"
import { findOutputPorts } from "../net/findOutputPorts.js"
import { type Net } from "../net/index.js"
import { type Node } from "../node/index.js"
import { capInputPort } from "./capInputPort.js"
import { capOutputPort } from "./capOutputPort.js"

export function capNodeAllPorts(mod: Mod, net: Net, node: Node): void {
  for (const port of findInputPorts(net, node)) {
    capInputPort(mod, net, port)
  }

  for (const port of findOutputPorts(net, node)) {
    capOutputPort(mod, net, port)
  }
}
