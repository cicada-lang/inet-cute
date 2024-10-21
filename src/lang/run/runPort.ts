import { type Mod } from "../mod/index.js"
import { createNet } from "../net/createNet.js"
import { type Net } from "../net/index.js"
import { moveConnectedComponent } from "../net/moveConnectedComponent.js"
import { type Port } from "../port/index.js"
import { closeAllFreePorts } from "./closeAllFreePorts.js"
import { closePort } from "./closePort.js"
import { collectConnectedPort } from "./collectConnectedPort.js"
import { releaseCapPorts } from "./releaseCapPorts.js"
import { runNet } from "./runNet.js"

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
