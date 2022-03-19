import { Span } from "@cicada-lang/sexp/lib/span"
import { Mod } from "../mod"

export abstract class Stmt {
  abstract span: Span
  abstract execute(mod: Mod): Promise<void>
}
