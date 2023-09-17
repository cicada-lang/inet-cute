import { ComposeOptions } from "../compose/compose"
import { composeNode } from "../compose/composeNode"
import { Env } from "../env"
import { formatValue } from "../value"

export function compose(env: Env, options: ComposeOptions): void {
  const value = env.stack.pop()
  if (value === undefined) {
    throw new Error(`[@apply] I expect a value on the stack.`)
  }

  if (value["@kind"] !== "Node") {
    throw new Error(
      [
        `[@apply] I expect the value on top of the stack to be a Node.`,
        ``,
        `  node: ${formatValue(env, value)}`,
      ].join("\n"),
    )
  }

  composeNode(env, value, options)
}
