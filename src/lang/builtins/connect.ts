import { ComposeOptions } from "../compose/compose"
import { connect } from "../connect/connect"
import { Env } from "../env"
import { unifyTypes } from "../unify/unifyTypes"
import { formatValue } from "../value/formatValue"

export function compose(env: Env, options: ComposeOptions): void {
  const first = env.stack.pop()

  if (first === undefined) {
    throw new Error(
      [`[@connect] I expect first value on the stack.`].join("\n"),
    )
  }

  if (first["@kind"] !== "Port") {
    throw new Error(
      [
        `[@connect] I expect the first value on the stack to be a Port.`,
        ``,
        `  first: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  const second = env.stack.pop()

  if (second === undefined) {
    throw new Error(
      [
        `[@connect] I expect a second value on the stack.`,
        ``,
        `  first: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  if (second["@kind"] !== "Port") {
    throw new Error(
      [
        `[@connect] I expect the second value on the stack to be a Port.`,
        ``,
        `  first: ${formatValue(env, first)}`,
        `  second: ${formatValue(env, first)}`,
      ].join("\n"),
    )
  }

  connect(env.net, first, second)
  if (options.checking) {
    unifyTypes(env, options.checking.substitution, first.t, second.t)
  }
}
