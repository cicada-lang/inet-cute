import { defineBuiltinOperators } from "../builtins/defineBuiltinOperators"
import { Mod } from "./Mod"

export function createMod(url: URL): Mod {
  const definitions = new Map()
  const rules = new Map()

  const mod = {
    url,
    definitions,
    rules,
    nodeCounters: new Map(),
  }

  defineBuiltinOperators(mod)

  return mod
}
