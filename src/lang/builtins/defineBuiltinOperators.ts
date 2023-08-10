import { Mod } from "../mod"
import * as Type from "./Type"
import * as connect from "./connect"
import { defineOperatorPrivate } from "./defineOperatorPrivate"
import * as inspect from "./inspect"
import * as rot from "./rot"
import * as run from "./run"
import * as swap from "./swap"

export function defineBuiltinOperators(mod: Mod): void {
  defineOperatorPrivate(mod, "swap", swap)
  defineOperatorPrivate(mod, "rot", rot)
  defineOperatorPrivate(mod, "connect", connect)
  defineOperatorPrivate(mod, "inspect", inspect)
  defineOperatorPrivate(mod, "run", run)
  defineOperatorPrivate(mod, "Type", Type)
}
