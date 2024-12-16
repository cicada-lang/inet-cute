import { type ComposeOptions } from "../compose/compose.ts"
import { type Env } from "../env/index.ts"
import { type Mod } from "../mod/index.ts"

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
