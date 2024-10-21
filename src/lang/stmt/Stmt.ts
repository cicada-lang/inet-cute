import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"

export interface Stmt {
  span: Span
  execute(mod: Mod): Promise<void>
}
