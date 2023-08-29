import { connectCapInputPort } from "../cap/connectCapInputPort"
import { connectCapOutputPort } from "../cap/connectCapOutputPort"
import { Mod } from "../mod"
import { Net } from "../net"
import { Port } from "../port"

export function closePort(mod: Mod, component: Net, port: Port): Port {
  return port.sign === 1
    ? connectCapInputPort(mod, component, port)
    : connectCapOutputPort(mod, component, port)
}
