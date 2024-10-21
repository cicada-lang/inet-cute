import { type ComposeOptions } from "../compose/compose.js"
import { type Env } from "../env/index.js"
import { type Mod } from "../mod/index.js"

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
