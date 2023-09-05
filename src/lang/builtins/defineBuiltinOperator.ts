import { ComposeOptions } from "../compose/compose"
import { Env } from "../env"
import { Mod } from "../mod"

export function defineBuiltinOperator(
  mod: Mod,
  name: string,
  options: {
    compose: (env: Env, options: ComposeOptions) => void
  },
): void {
  mod.builtins.set(name, {
    "@type": "Definition",
    "@kind": "OperatorDefinition",
    mod,
    name,
    compose: options.compose,
  })
}
