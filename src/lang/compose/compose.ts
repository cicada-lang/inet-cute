import { Node } from "../graph"
import { Mod } from "../mod"
import { Net } from "../net"
import { Word } from "../word"

export interface ComposeOptions {
  current?: { start: Node; end: Node }
}

export function compose(
  mod: Mod,
  net: Net,
  word: Word,
  options?: ComposeOptions,
): void {
  //
}
