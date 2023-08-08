import { Mod } from "../mod"
import { defineOperator } from "../mod/defineOperator"
import * as connect from "./connect"
import * as inspect from "./inspect"
import * as rot from "./rot"
import * as swap from "./swap"
import wire from "./wire"

export function defineBuiltinOperators(mod: Mod): void {
  defineOperator(mod, "swap", swap)
  defineOperator(mod, "rot", rot)
  defineOperator(mod, "connect", connect)
  defineOperator(mod, "wire", wire(mod))
  defineOperator(mod, "inspect", inspect)
}
