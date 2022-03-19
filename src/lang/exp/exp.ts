import { Span } from "@cicada-lang/sexp/lib/span"
import { Mod } from "../mod"
import { Net } from "../net"

export abstract class Exp {
  abstract span: Span
  abstract apply(mod: Mod, net: Net): void
}
