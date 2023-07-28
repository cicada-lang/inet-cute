import { Net } from "../graph"
import { Mod } from "../mod"
import { Span } from "../span"

export abstract class Word {
  abstract span: Span
  abstract apply(mod: Mod, net: Net): void
}
