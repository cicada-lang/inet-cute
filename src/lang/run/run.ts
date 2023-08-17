import { createEnv } from "../env/createEnv"
import { interact } from "../interact"
import { Mod } from "../mod"
import { Net } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { findPortEntry } from "../net/findPortEntry"
import { connectPlaceholderInputPort } from "../placeholder/connectPlaceholderInputPort"
import { connectPlaceholderOutputPort } from "../placeholder/connectPlaceholderOutputPort"
import { Port } from "../port"
import { formatValue } from "../value/formatValue"
import { closeFreePorts } from "./closeFreePorts"

export function run(mod: Mod, net: Net, port: Port): Port {
  const placeholderPort =
    port.sign === 1
      ? connectPlaceholderInputPort(mod, net, port)
      : connectPlaceholderOutputPort(mod, net, port)

  const placeholderPorts = closeFreePorts(mod, net)

  const env = createEnv(mod, { net })

  while (net.activeEdges.length > 0) {
    const activeEdge = net.activeEdges.pop()
    if (activeEdge !== undefined) {
      interact(env, activeEdge, {})
    }
  }

  const placeholderPortEntry = findPortEntry(net, placeholderPort)
  if (placeholderPortEntry?.connection === undefined) {
    throw new Error(
      [
        `[run] I expect the placeholderPort to be connected.`,
        ``,
        `  placeholderPort: ${formatValue(placeholderPort)}`,
      ].join("\n"),
    )
  }

  for (const placeholderPort of placeholderPorts) {
    disconnectPort(net, placeholderPort)
    deleteNodeEntry(net, placeholderPort.node)
  }

  const resultPort = placeholderPortEntry.connection.port

  disconnectPort(net, placeholderPort)
  deleteNodeEntry(net, placeholderPort.node)

  return resultPort
}
