import { Mod } from "../mod"
import { Net } from "../net"
import { cleanUpWires } from "../net/cleanUpWires"
import { Word } from "../word"
import { ComposeOptions, compose } from "./compose"

export function composeWords(
  mod: Mod,
  net: Net,
  words: Array<Word>,
  options: ComposeOptions,
): void {
  for (const word of words) {
    compose(mod, net, word, options)
  }

  cleanUpWires(net)
}
