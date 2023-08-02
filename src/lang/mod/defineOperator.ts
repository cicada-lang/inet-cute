import { Ctx } from "../ctx"
import * as Definitions from "../definition"
import { Net } from "../net"
import { Mod } from "./Mod"
import { define } from "./define"

export function defineOperator(
  mod: Mod,
  name: string,
  options: {
    compose: (net: Net) => void
    cut: (ctx: Ctx) => void
  },
): void {
  define(
    mod,
    name,
    Definitions.OperatorDefinition(mod, name, options.compose, options.cut),
  )
}
