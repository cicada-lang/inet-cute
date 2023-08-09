import { ComposeOptions } from "../compose/compose"
import { Env } from "../env"
import { Mod } from "./Mod"
import { define } from "./define"

export function defineOperator(
  mod: Mod,
  name: string,
  options: {
    compose: (env: Env, options: ComposeOptions) => void
  },
): void {
  define(mod, name, {
    "@type": "Definition",
    "@kind": "OperatorDefinition",
    mod,
    name,
    compose: options.compose,
  })
}
