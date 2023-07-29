import { Definition } from "../definition"
import { Mod } from "./Mod"
import { defineBuiltInOperators } from "./defineBuiltInOperators"

export function createMod(url: URL): Mod {
  const definitions: Map<string, Definition> = new Map()

  const mod = { url, definitions }

  defineBuiltInOperators(mod)

  return mod
}
