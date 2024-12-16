import { type Mod } from "../mod/index.ts"
import { type Span } from "../span/index.ts"

export interface Stmt {
  span: Span
  execute(mod: Mod): Promise<void>
}
