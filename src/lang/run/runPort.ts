import { type Mod } from "../mod/index.ts"
import { createNet } from "../net/createNet.ts"
import { type Net } from "../net/index.ts"
import { moveConnectedComponent } from "../net/moveConnectedComponent.ts"
import { type Port } from "../port/index.ts"
import { closeAllFreePorts } from "./closeAllFreePorts.ts"
import { closePort } from "./closePort.ts"
import { collectConnectedPort } from "./collectConnectedPort.ts"
import { releaseCapPorts } from "./releaseCapPorts.ts"
import { runNet } from "./runNet.ts"

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
