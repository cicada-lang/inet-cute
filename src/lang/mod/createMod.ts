import { Loader } from "../../loader"
import { defineBuiltinOperators } from "../builtins/defineBuiltinOperators"
import { Mod } from "./Mod"

export function createMod(options: {
  url: URL
  text: string
  loader: Loader
}): Mod {
  const { url, text, loader } = options

  const definitions = new Map()
  const rules = new Map()

  const mod = {
    loader,
    url,
    text,
    definitions,
    rules,
    nodeCounters: new Map(),
  }

  defineBuiltinOperators(mod)

  return mod
}
