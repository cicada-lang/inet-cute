import { cleanUpWires } from "../graph/cleanUpWires"
import { Mod } from "../mod"
import { Word } from "../word"
import { Net } from "./Net"

export function applyWords(mod: Mod, net: Net, words: Array<Word>): void {
  for (const word of words) {
    word.apply(mod, net)
  }

  cleanUpWires(net)
}
