import { Loader } from "../../loader"
import { defineBuiltinOperators } from "../builtins/defineBuiltinOperators"
import { Mod } from "./Mod"

export function createMod(options: {
  url: URL
  text: string
  loader: Loader
}): Mod {
  const mod = {
    loader: options.loader,
    url: options.url,
    text: options.text,
    definitions: new Map(),
    rules: new Map(),
    requiredMods: new Map(),
  }

  defineBuiltinOperators(mod)

  return mod
}
