import { capInputPort } from "../cap/capInputPort"
import { capOutputPort } from "../cap/capOutputPort"
import { Mod } from "../mod"
import { Net } from "../net"
import { Port } from "../port"

export function closePort(mod: Mod, component: Net, port: Port): Port {
  return port.sign === 1
    ? capOutputPort(mod, component, port)
    : capInputPort(mod, component, port)
}
