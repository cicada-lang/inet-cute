import { Loader } from "../../loader/index.ts"
import { defineBuiltinOperators } from "../builtins/defineBuiltinOperators.ts"
import { createChecking } from "../checking/createChecking.ts"
import { createEnv } from "../env/createEnv.ts"
import { type Stmt } from "../stmt/Stmt.ts"
import { type Mod } from "./Mod.ts"

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
    builtins: new Map(),
    ruleEntries: new Map(),
    requiredMods: new Map(),
  } as Mod

  mod.env = createEnv(mod)
  mod.checking = createChecking()

  defineBuiltinOperators(mod)

  return mod
}
