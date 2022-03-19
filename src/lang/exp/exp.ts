import { Mod } from "../mod"
import { Net } from "../net"
import { Span } from "../span"

export abstract class Exp {
  abstract span: Span
  abstract apply(mod: Mod, net: Net): void
}
