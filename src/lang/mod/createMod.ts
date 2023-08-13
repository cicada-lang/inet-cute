import { Loader } from "../../loader"
import { defineBuiltinOperators } from "../builtins/defineBuiltinOperators"
import { createEnv } from "../env/createEnv.js"
import { Stmt } from "../stmt/Stmt.js"
import { Mod } from "./Mod"

export function createMod(options: {
  url: URL
  text: string
  stmts: Array<Stmt>
  loader: Loader
}): Mod {
  const mod = {
    loader: options.loader,
    url: options.url,
    text: options.text,
    stmts: options.stmts,
    definitions: new Map(),
    rules: new Map(),
    requiredMods: new Map(),
  } as Mod

  mod.env = createEnv(mod)

  defineBuiltinOperators(mod)

  return mod
}
