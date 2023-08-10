import { ComposeOptions } from "../compose/compose"
import { Env } from "../env"
import { Mod } from "../mod"
import { define } from "../mod/define"

export function defineOperatorPrivate(
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
    isPrivate: true,
  })
}
