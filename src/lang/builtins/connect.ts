import { ComposeOptions } from "../compose/compose"
import { connect } from "../connect/connect"
import { Env } from "../env"
import { unifyTypes } from "../unify/unifyTypes"
import { formatValue } from "../value/formatValue"

export function compose(env: Env, options: ComposeOptions): void {
  const first = env.stack.pop()

  if (first === undefined) {
    throw new Error(
      [`[connect (builtin)] I expect first value on the stack.`].join("\n"),
    )
  }

  if (first["@kind"] !== "Port") {
    throw new Error(
      [
        `[connect (builtin)] I expect the first value on the stack to be a Port.`,
        ``,
        `  first: ${formatValue(first)}`,
      ].join("\n"),
    )
  }

  const second = env.stack.pop()

  if (second === undefined) {
    throw new Error(
      [
        `[connect (builtin)] I expect a second value on the stack.`,
        ``,
        `  first: ${formatValue(first)}`,
      ].join("\n"),
    )
  }

  if (second["@kind"] !== "Port") {
    throw new Error(
      [
        `[connect (builtin)] I expect the second value on the stack to be a Port.`,
        ``,
        `  first: ${formatValue(first)}`,
        `  second: ${formatValue(first)}`,
      ].join("\n"),
    )
  }

  connect(env, first, second)
  if (options.checking) {
    unifyTypes(options.checking.substitution, first.t, second.t)
  }
}
