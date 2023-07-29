import { Definition } from "../definition"
import { Mod } from "./Mod"
import { defineBuiltInOperators } from "./defineBuiltInOperators"

export function createMod(url: URL): Mod {
  const definitions: Map<string, Definition> = new Map()
  const rules = new Map()

  const mod = { url, definitions, rules }

  defineBuiltInOperators(mod)

  return mod
}
