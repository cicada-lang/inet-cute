import { connect } from "../connect/connect"
import { Env } from "../env"
import { Mod } from "../mod"
import { Node } from "../node"
import { createPlaceholderInputPortForPort } from "./createPlaceholderInputPortForPort"
import { createPlaceholderOutputPortForPort } from "./createPlaceholderOutputPortForPort"

export function connectNodeWithPlaceholderPorts(
  mod: Mod,
  env: Env,
  node: Node,
): void {
  for (const port of node.input) {
    if (!port.isPrincipal) {
      const placeholderPort = createPlaceholderOutputPortForPort(mod, port)
      connect(env, port, placeholderPort)
    }
  }

  for (const port of node.output) {
    if (!port.isPrincipal) {
      const placeholderPort = createPlaceholderInputPortForPort(mod, port)
      connect(env, port, placeholderPort)
    }
  }
}
