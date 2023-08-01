import { Mod } from "../mod"
import { Net } from "../net"
import { cleanUpWires } from "../run/cleanUpWires"
import { Word } from "../word"

export function composeWords(mod: Mod, net: Net, words: Array<Word>): void {
  for (const word of words) {
    word.compose(mod, net)
  }

  cleanUpWires(net)
}
