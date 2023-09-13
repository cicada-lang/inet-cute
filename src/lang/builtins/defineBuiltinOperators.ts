import { Mod } from "../mod"
import * as Type from "./Type"
import * as apply from "./apply"
import * as connect from "./connect"
import { defineBuiltinOperator } from "./defineBuiltinOperator"
import * as inspect from "./inspect"
import * as rot from "./rot"
import * as run from "./run"
import * as spread from "./spread"
import * as swap from "./swap"

export function defineBuiltinOperators(mod: Mod): void {
  defineBuiltinOperator(mod, "swap", swap)
  defineBuiltinOperator(mod, "rot", rot)
  defineBuiltinOperator(mod, "connect", connect)
  defineBuiltinOperator(mod, "inspect", inspect)
  defineBuiltinOperator(mod, "run", run)
  defineBuiltinOperator(mod, "apply", apply)
  defineBuiltinOperator(mod, "spread", spread)
  defineBuiltinOperator(mod, "Type", Type)
}
