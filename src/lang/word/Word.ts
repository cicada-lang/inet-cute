import { Net } from "../graph"
import { Mod } from "../mod"
import { Span } from "../span"

export interface Word {
  span: Span
  apply(mod: Mod, net: Net): void
}
