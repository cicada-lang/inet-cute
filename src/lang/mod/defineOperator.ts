import { Ctx } from "../ctx"
import { Env } from "../env"
import { Mod } from "./Mod"
import { define } from "./define"

export function defineOperator(
  mod: Mod,
  name: string,
  options: {
    compose: (env: Env) => void
    cut: (ctx: Ctx) => void
  },
): void {
  define(mod, name, {
    "@kind": "OperatorDefinition",
    mod,
    name,
    compose: options.compose,
    cut: options.cut,
  })
}
