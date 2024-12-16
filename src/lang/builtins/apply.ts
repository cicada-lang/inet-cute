import { type ComposeOptions } from "../compose/compose.ts"
import { composeNode } from "../compose/composeNode.ts"
import { type Env } from "../env/index.ts"
import { formatValue } from "../value/index.ts"

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
        `  node: ${formatValue(value)}`,
      ].join("\n"),
    )
  }

  composeNode(env, value, options)
}
