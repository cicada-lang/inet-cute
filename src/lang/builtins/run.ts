import { type Env } from "../env/index.ts"
import { runPort } from "../run/runPort.ts"
import { formatValue } from "../value/formatValue.ts"

export function compose(env: Env): void {
  const port = env.stack.pop()
  if (port === undefined) {
    throw new Error(`[@run] I expect a top value on the stack.`)
  }

  if (port["@kind"] !== "Port") {
    throw new Error(
      [
        `[@run] I expect the top value on the stack to be a Port.`,
        ``,
        `  value: ${formatValue(port)}`,
      ].join("\n"),
    )
  }

  env.stack.push(runPort(env.mod, env.net, port))
}
