import { capInputPort } from "../cap/capInputPort.ts"
import { capOutputPort } from "../cap/capOutputPort.ts"
import { type Mod } from "../mod/index.ts"
import { type Net } from "../net/index.ts"
import { type Port } from "../port/index.ts"

export function closePort(mod: Mod, component: Net, port: Port): Port {
  return port.sign === 1
    ? capOutputPort(mod, component, port)
    : capInputPort(mod, component, port)
}
