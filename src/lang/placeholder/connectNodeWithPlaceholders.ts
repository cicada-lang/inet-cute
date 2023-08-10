import { connect } from "../connect/connect"
import { Env } from "../env"
import { Mod } from "../mod"
import { Node } from "../node"
import { createInputPlaceholderPort } from "./createInputPlaceholderPort"
import { createOutputPlaceholderPort } from "./createOutputPlaceholderPort"

export function connectNodeWithPlaceholders(
  mod: Mod,
  env: Env,
  node: Node,
): void {
  for (const port of node.input) {
    if (!port.isPrincipal) {
      const placeholderPort = createOutputPlaceholderPort(mod, port)
      connect(env, port, placeholderPort)
    }
  }

  for (const port of node.output) {
    if (!port.isPrincipal) {
      const placeholderPort = createInputPlaceholderPort(mod, port)
      connect(env, port, placeholderPort)
    }
  }
}
