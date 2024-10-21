import { type Mod } from "../mod/index.js"
import * as Type from "./Type.js"
import * as apply from "./apply.js"
import * as connect from "./connect.js"
import { defineBuiltinOperator } from "./defineBuiltinOperator.js"
import * as inspect from "./inspect.js"
import * as rot from "./rot.js"
import * as run from "./run.js"
import * as spread from "./spread.js"
import * as swap from "./swap.js"

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
