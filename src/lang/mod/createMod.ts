import { Mod } from "./Mod"
import { defineBuiltInOperators } from "./defineBuiltInOperators"

export function createMod(url: URL): Mod {
  const definitions = new Map()
  const rules = new Map()
  const nodeCounter = 0

  const mod = {
    url,
    definitions,
    rules,
    nodeCounter,
  }

  defineBuiltInOperators(mod)

  return mod
}
