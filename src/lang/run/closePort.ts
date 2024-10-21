import { capInputPort } from "../cap/capInputPort.js"
import { capOutputPort } from "../cap/capOutputPort.js"
import { type Mod } from "../mod/index.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"

export function closePort(mod: Mod, component: Net, port: Port): Port {
  return port.sign === 1
    ? capOutputPort(mod, component, port)
    : capInputPort(mod, component, port)
}
