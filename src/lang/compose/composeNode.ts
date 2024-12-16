import { connect } from "../connect/connect.ts"
import { type Env } from "../env/index.ts"
import { refreshNode } from "../freshen/refreshNode.ts"
import { findInputPorts } from "../net/findInputPorts.ts"
import { findOutputPorts } from "../net/findOutputPorts.ts"
import { type Node } from "../node/index.ts"
import { unifyTypes } from "../unify/unifyTypes.ts"
import { type ComposeOptions } from "./compose.ts"

export function composeNode(
  env: Env,
  node: Node,
  options: ComposeOptions,
): Node {
  if (options.checking) {
    refreshNode(env.net, options.checking.typeVarCounters, node)
  }

  const input = findInputPorts(env.net, node)
  const output = findOutputPorts(env.net, node)

  // Be careful about the order:
  // The first input port connects
  // with the port on the top of the stack.

  for (const port of input) {
    const value = env.stack.pop()
    if (value === undefined) {
      throw new Error(`[composeNode] I expect a value on top of the stack.`)
    }

    if (value["@kind"] !== "Port") {
      throw new Error(
        [
          `[composeNode] I expect the top value on the stack to be a Port.`,
          ``,
          `  value['@kind']: ${value["@kind"]}`,
        ].join("\n"),
      )
    }

    connect(env.net, value, port)
    if (options.checking) {
      unifyTypes(options.checking.substitution, value.t, port.t)
    }
  }

  for (const port of output) {
    env.stack.push(port)
  }

  return node
}
