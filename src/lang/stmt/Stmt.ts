import { Mod } from "../mod"
import { Span } from "../span"

export interface Stmt {
  span: Span
  execute(mod: Mod): Promise<void>
}
