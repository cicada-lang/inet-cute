import { Loader } from "../../loader/index.js"
import { type Checking } from "../checking/index.js"
import { type Definition } from "../definition/index.js"
import { type Env } from "../env/Env.js"
import { type Stmt } from "../stmt/Stmt.js"
import { type RuleEntry } from "./RuleEntry.js"

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
