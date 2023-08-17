import { Mod } from "../mod"
import { Net } from "../net"
import { createNet } from "../net/createNet"
import { moveConnectedComponent } from "../net/moveConnectedComponent"
import { Port } from "../port"
import { closeFreePorts as closeAllFreePorts } from "./closeAllFreePorts"
import { closePort } from "./closePort"
import { collectResultPort as collectConnectedPort } from "./collectConnectedPort"
import { releaseFreePorts as releasePlaceholderPorts } from "./releasePlaceholderPorts"
import { runNet } from "./runNet"

export function runPort(mod: Mod, net: Net, port: Port): Port {
  const component = createNet()

  moveConnectedComponent(net, component, port.node)

  const placeholderPort = closePort(mod, component, port)
  const placeholderForFreePorts = closeAllFreePorts(mod, component)

  runNet(mod, component)

  releasePlaceholderPorts(component, placeholderForFreePorts)
  const connectedPort = collectConnectedPort(component, placeholderPort)

  moveConnectedComponent(component, net, connectedPort.node)

  return connectedPort
}
