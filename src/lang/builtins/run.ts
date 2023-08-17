import { Env } from "../env"
import { runPort } from "../run/runPort"
import { formatValue } from "../value/formatValue"

export function compose(env: Env): void {
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

  env.stack.push(runPort(env.mod, env.net, port))
}
