import { Loader } from "../../loader"
import { Definition } from "../definition"
import { Env } from "../env/Env.js"
import { Rule } from "../rule"
import { Stmt } from "../stmt/Stmt.js"

export type Mod = {
  loader: Loader
  env: Env
  url: URL
  text: string
  stmts: Array<Stmt>
  definitions: Map<string, Definition>
  rules: Map<string, Rule>
  requiredMods: Map<string, Mod>
}
