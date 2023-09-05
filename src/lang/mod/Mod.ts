import { Loader } from "../../loader"
import { Checking } from "../checking"
import { Definition } from "../definition"
import { Env } from "../env/Env.js"
import { Stmt } from "../stmt/Stmt.js"
import { RuleEntry } from "./RuleEntry"

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
