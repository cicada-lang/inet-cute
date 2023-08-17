import { Mod } from "../mod"
import { Net } from "../net"
import { connectPlaceholderInputPort } from "../placeholder/connectPlaceholderInputPort"
import { connectPlaceholderOutputPort } from "../placeholder/connectPlaceholderOutputPort"
import { Port } from "../port"

export function closePort(mod: Mod, component: Net, port: Port): Port {
  return port.sign === 1
    ? connectPlaceholderInputPort(mod, component, port)
    : connectPlaceholderOutputPort(mod, component, port)
}
