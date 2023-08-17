import { Env } from "../env"
import { interact } from "../interact"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { findPortEntry } from "../net/findPortEntry"
import { connectPlaceholderInputPort } from "../placeholder/connectPlaceholderInputPort"
import { connectPlaceholderOutputPort } from "../placeholder/connectPlaceholderOutputPort"
import { formatValue } from "../value/formatValue"
import { closeFreePorts } from "./closeFreePorts"

export function run(env: Env): void {
  const port = env.stack.pop()
  if (port === undefined) {
    throw new Error(`[run] I expect a top value on the stack.`)
  }

  if (port["@kind"] !== "Port") {
    throw new Error(
      [
        `[run] I expect the top value on the stack to be a Port.`,
        ``,
        `  value: ${formatValue(port)}`,
      ].join("\n"),
    )
  }

  const placeholderPort =
    port.sign === 1
      ? connectPlaceholderInputPort(env.mod, env.net, port)
      : connectPlaceholderOutputPort(env.mod, env.net, port)

  const placeholderPorts = closeFreePorts(env)

  while (env.net.activeEdges.length > 0) {
    step(env)
  }

  const placeholderPortEntry = findPortEntry(env.net, placeholderPort)
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
    disconnectPort(env.net, placeholderPort)
    deleteNodeEntry(env.net, placeholderPort.node)
  }

  env.stack.push(placeholderPortEntry.connection.port)

  disconnectPort(env.net, placeholderPort)
  deleteNodeEntry(env.net, placeholderPort.node)
}

function step(env: Env): void {
  const activeEdge = env.net.activeEdges.pop()
  if (activeEdge !== undefined) {
    interact(env, activeEdge, {})
  }
}
