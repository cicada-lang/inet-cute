import { type ComposeOptions } from "../compose/compose.ts"
import { type Env } from "../env/index.ts"
import { findInputPorts } from "../net/findInputPorts.ts"
import { findOutputPorts } from "../net/findOutputPorts.ts"
import { formatValue } from "../value/index.ts"

export function compose(env: Env, options: ComposeOptions): void {
  const value = env.stack.pop()
  if (value === undefined) {
    throw new Error(`[@spread] I expect a value on the stack.`)
  }

  if (value["@kind"] !== "Node") {
    throw new Error(
      [
        `[@spread] I expect the value on top of the stack to be a Node.`,
        ``,
        `  node: ${formatValue(value)}`,
      ].join("\n"),
    )
  }

  const ports = [
    ...findInputPorts(env.net, value),
    ...findOutputPorts(env.net, value),
  ]

  for (const port of ports.reverse()) {
    env.stack.push(port)
  }
}
