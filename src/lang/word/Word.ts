import { ActiveEdge } from "../graph"
import { Mod } from "../mod"
import { Net } from "../net"
import { Span } from "../span"

export interface WordOptions {
  activeEdge?: ActiveEdge
}

export interface Word {
  span: Span
  compose(mod: Mod, net: Net, options?: WordOptions): void
}
