import { Mod } from "./Mod"
import { defineBuiltInOperators } from "./defineBuiltInOperators"

export function createMod(url: URL): Mod {
  const definitions = new Map()
  const rules = new Map()

  const mod = { url, definitions, rules }

  defineBuiltInOperators(mod)

  return mod
}
