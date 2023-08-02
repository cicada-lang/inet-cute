import { Mod } from "../mod"
import { Net } from "../net"
import { cleanUpWires } from "../net/cleanUpWires"
import { Word } from "../word"
import { compose } from "./compose"

export function composeWords(mod: Mod, net: Net, words: Array<Word>): void {
  for (const word of words) {
    compose(mod, net, word)
  }

  cleanUpWires(net)
}
