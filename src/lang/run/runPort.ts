import { Mod } from "../mod"
import { Net } from "../net"
import { createNet } from "../net/createNet"
import { moveConnectedComponent } from "../net/moveConnectedComponent"
import { Port } from "../port"
import { closeAllFreePorts } from "./closeAllFreePorts"
import { closePort } from "./closePort"
import { collectConnectedPort } from "./collectConnectedPort"
import { releaseCapPorts } from "./releaseCapPorts"
import { runNet } from "./runNet"

export function runPort(mod: Mod, net: Net, port: Port): Port {
  const component = createNet()

  moveConnectedComponent(net, component, port.node)

  const capPort = closePort(mod, component, port)
  const capForFreePorts = closeAllFreePorts(mod, component)

  runNet(mod, component)

  releaseCapPorts(component, capForFreePorts)
  const connectedPort = collectConnectedPort(component, capPort)

  moveConnectedComponent(component, net, connectedPort.node)

  return connectedPort
}
