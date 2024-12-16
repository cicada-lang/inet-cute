import { Loader } from "../../loader/index.ts"
import { type Checking } from "../checking/index.ts"
import { type Definition } from "../definition/index.ts"
import { type Env } from "../env/Env.ts"
import { type Stmt } from "../stmt/Stmt.ts"
import { type RuleEntry } from "./RuleEntry.ts"

export type Mod = {
  loader: Loader
  env: Env
  checking: Checking
  url: URL
  text: string
  stmts: Array<Stmt>
  definitions: Map<string, Definition>
  builtins: Map<string, Definition>
  ruleEntries: Map<string, RuleEntry>
  requiredMods: Map<string, Mod>
}
