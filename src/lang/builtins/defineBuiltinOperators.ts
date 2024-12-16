import { type Mod } from "../mod/index.ts"
import * as Type from "./Type.ts"
import * as apply from "./apply.ts"
import * as connect from "./connect.ts"
import { defineBuiltinOperator } from "./defineBuiltinOperator.ts"
import * as inspect from "./inspect.ts"
import * as rot from "./rot.ts"
import * as run from "./run.ts"
import * as spread from "./spread.ts"
import * as swap from "./swap.ts"

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
