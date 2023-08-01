import { Mod } from "../mod"
import { cleanUpWires } from "../run/cleanUpWires"
import { Word } from "../word"
import { Net } from "./Net"

export function composeWords(mod: Mod, net: Net, words: Array<Word>): void {
  for (const word of words) {
    word.compose(mod, net)
  }

  cleanUpWires(net)
}
