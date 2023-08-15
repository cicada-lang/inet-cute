import { connect } from "../connect/connect"
import { Env } from "../env"
import { refreshNode } from "../freshen/refreshNode"
import { Node } from "../node"
import { unifyTypes } from "../unify/unifyTypes"
import { ComposeOptions } from "./compose"
import { rearrangeNodePorts } from "./rearrangeNodePorts"

export function composeNode(
  env: Env,
  node: Node,
  options: ComposeOptions,
  rearrangement: {
    input: Array<string>
    output: Array<string>
  } = {
    input: [],
    output: [],
  },
): Node {
  if (options.checking) {
    refreshNode(options.checking.typeVarCounters, node)
  }

  const { input, output } = rearrangeNodePorts(node, rearrangement)

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
